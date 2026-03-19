## Context

Rolobitdex is a React Native (Expo) P2P Bitcoin contact manager. The codebase has a clean data layer (`src/db/`) but screens in `app/` directly call database functions, own form state, handle mutations, and render UI — all in one file. The heaviest example is `app/contact/[id].tsx` at 337 lines with 7 inline sub-forms.

The refactor introduces a Model–View–Controller separation using only built-in React patterns (custom hooks, pure components). No new dependencies are added.

## Goals / Non-Goals

**Goals:**
- Separate data logic (models), state orchestration (controller hooks), and rendering (views) into distinct layers
- Make every view component a pure presentational function — zero side effects, zero imports from `src/db/`
- Apply BEM-inspired naming to all StyleSheet objects via co-located `*.styles.ts` files
- Make database write operations idempotent where possible
- Preserve all 75 Jest tests and 24 Playwright E2E tests with zero regressions

**Non-Goals:**
- Introducing SCSS, CSS modules, or any CSS-based tooling (React Native uses `StyleSheet.create`)
- Adding a state management library (Redux, Zustand, MobX) — hooks are sufficient at this scale
- Changing the database schema or migration strategy
- Modifying the Expo Router file-based routing structure (`app/` directory stays as-is)
- Adding new features or UI changes — this is a pure structural refactor

## Decisions

### 1. Directory structure: `src/models/`, `src/controllers/`, `src/views/`, `src/styles/`

```
src/
├── models/              # Business logic + typed interfaces
│   ├── contact.ts       # Contact type, validation, derived data
│   ├── trade.ts         # Trade type, status machine, validation
│   ├── address.ts       # Silent Payment address logic
│   └── settings.ts      # Biometric/backup config
│
├── controllers/         # Custom hooks bridging models ↔ views
│   ├── useContacts.ts   # Contact list loading, search, CRUD
│   ├── useContactDetail.ts  # Single contact with aliases/addresses/notes/trades
│   ├── useTrades.ts     # Trade list loading, filtering
│   ├── useTradeDetail.ts    # Single trade with status advancement
│   ├── useAddress.ts    # Silent Payment address generation
│   └── useSettings.ts   # Biometric toggle, backup export
│
├── views/               # Pure presentational components
│   ├── contacts/        # Contact-related views
│   │   ├── ContactListView.tsx
│   │   ├── ContactListView.styles.ts
│   │   ├── ContactRowView.tsx
│   │   ├── ContactRowView.styles.ts
│   │   └── EmptyStateView.tsx
│   ├── trades/          # Trade-related views
│   │   ├── TradeListView.tsx
│   │   ├── TradeRowView.tsx
│   │   ├── TradeFilterBar.tsx
│   │   ├── TradeDetailView.tsx
│   │   └── TradeProgressView.tsx
│   ├── address/
│   │   └── AddressView.tsx
│   ├── settings/
│   │   └── SettingsView.tsx
│   └── shared/
│       ├── EmptyState.tsx
│       ├── SectionHeader.tsx
│       └── FAB.tsx
│
├── styles/              # Shared style utilities
│   ├── mixins.ts        # Composable style functions (row, card, form group)
│   └── naming.ts        # BEM naming helper (optional)
│
├── components/          # (unchanged) Generic UI primitives
├── constants/           # (unchanged) Theme tokens
├── db/                  # (unchanged) SQLite operations
└── lib/                 # (unchanged) Utilities
```

**Why this over a feature-folder approach?** The app has only 4 main screens and 4 detail screens. Feature folders make sense at 20+ features. At this scale, layer-based grouping is more discoverable and makes the MVC pattern explicit.

### 2. Model layer wraps DB, doesn't replace it

Models import from `src/db/` and add:
- TypeScript interfaces (re-exported from db, but models are the public API)
- Validation functions (`isValidContactName`, `isValidTradeAmount`)
- Derived data (`getContactInitials`, `getTradeDescription`)
- Idempotent wrappers (`createContactIdempotent` — returns existing if name matches)

**Why wrap instead of merge?** The DB layer is tested by 75 existing tests. Wrapping preserves those tests untouched while adding a higher-level API.

### 3. Controller hooks return a stable API object

Each controller hook returns a typed object:

```typescript
// src/controllers/useContacts.ts
export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  // stable references via useCallback
  const search = useCallback((q: string) => { ... }, []);
  const create = useCallback(async (name: string) => { ... }, []);

  useFocusEffect(useCallback(() => { loadContacts(); }, [query]));

  return { contacts, query, search, create, loading } as const;
}
```

**Why hooks over classes/services?** React hooks integrate naturally with component lifecycle, focus effects, and navigation. No additional binding or DI framework needed.

### 4. Views are pure: props in, JSX out

```typescript
// src/views/contacts/ContactListView.tsx
type ContactListViewProps = {
  contacts: Contact[];
  onSelect: (id: string) => void;
  onSearch: (query: string) => void;
  query: string;
  numColumns: number;
};

export function ContactListView({ contacts, onSelect, onSearch, query, numColumns }: ContactListViewProps) {
  // Zero hooks, zero side effects, zero imports from db/
  return ( ... );
}
```

**Why dumb views?** They're trivially testable with mock props, reusable across different data sources, and make the data flow explicit.

### 5. Screens become thin wiring

```typescript
// app/(tabs)/index.tsx (after refactor)
export default function ContactsScreen() {
  const { width } = useWindowDimensions();
  const numColumns = width >= breakpoints.tablet ? 2 : 1;
  const { contacts, query, search, create } = useContacts();

  return (
    <AnimatedScreen>
      <ContactListView
        contacts={contacts}
        onSelect={(id) => router.push(`/contact/${id}`)}
        onSearch={search}
        query={query}
        numColumns={numColumns}
      />
      <FAB onPress={() => router.push("/contact/new")} label="Add new contact" />
    </AnimatedScreen>
  );
}
```

### 6. BEM-inspired style naming in co-located files

```typescript
// src/views/contacts/ContactRowView.styles.ts
import { StyleSheet } from "react-native";
import { colors, spacing, borderRadius, typography } from "../../constants/theme";

export const styles = StyleSheet.create({
  contactRow: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: colors.surface, padding: spacing.md,
    borderRadius: borderRadius.lg, borderWidth: 1, borderColor: colors.border,
  },
  contactRow__avatar: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: colors.primary, alignItems: "center", justifyContent: "center",
    marginRight: spacing.md,
  },
  contactRow__info: { flex: 1 },
  contactRow__name: { color: colors.text, ...typography.lg },
  contactRow__hint: { color: colors.textMuted, ...typography.xs, marginTop: 2 },
});
```

**Naming convention:** `block__element` uses double underscore. Modifiers use `block__element_modifier` (single underscore) since JS keys can't contain `--`.

**Why not keep inline styles?** Co-located files make styles discoverable, reusable, and diffable. BEM naming makes the relationship between styles and DOM structure explicit without CSS classes.

### 7. Idempotent database operations

```typescript
// src/models/contact.ts
export async function createContactIdempotent(name: string): Promise<string> {
  const existing = await searchContacts(name.trim());
  const exact = existing.find(c => c.name.toLowerCase() === name.trim().toLowerCase());
  if (exact) return exact.id;
  return createContact(name.trim());
}

// src/models/trade.ts
export async function advanceTradeIdempotent(id: string, targetStatus: TradeStatus): Promise<void> {
  const trade = await getTrade(id);
  if (!trade) throw new Error("Trade not found");
  if (trade.status === targetStatus) return; // already there — no-op
  if (!canTransition(trade.status, targetStatus)) {
    throw new Error(`Cannot transition from ${trade.status} to ${targetStatus}`);
  }
  await updateTradeStatus(id, targetStatus);
}
```

### 8. Style mixins for common patterns

```typescript
// src/styles/mixins.ts
import { ViewStyle } from "react-native";
import { colors, spacing, borderRadius } from "../constants/theme";

export const rowLayout = (gap = spacing.md): ViewStyle => ({
  flexDirection: "row", alignItems: "center", gap,
});

export const cardBase = (): ViewStyle => ({
  backgroundColor: colors.surface, borderRadius: borderRadius.lg,
  padding: spacing.md, borderWidth: 1, borderColor: colors.border,
});
```

## Risks / Trade-offs

- **File count increases significantly** (~40 new files) → Mitigated by clear naming and directory structure. Each file is small and single-purpose.
- **Import paths get longer** → Use `src/` path alias (already configured in `tsconfig.json` via Expo).
- **Existing tests reference `src/db/` directly** → Models wrap DB functions; existing tests continue to test the DB layer. New tests can target models and controllers.
- **Refactoring 8 screens at once is high blast radius** → Mitigate by doing one screen at a time, running E2E tests after each. Start with simplest screen (`contact/new.tsx`) and end with most complex (`contact/[id].tsx`).
- **BEM naming adds verbosity to style keys** → Trade-off accepted: discoverability and self-documentation outweigh terseness.
