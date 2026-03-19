import { View, FlatList } from "react-native";
import { EmptyState } from "../shared/EmptyState";
import { AnimatedListItem } from "../../components/AnimatedListItem";
import { TradeFilterBar } from "./TradeFilterBar";
import { TradeRowView } from "./TradeRowView";
import { spacing } from "../../constants/theme";
import type { TradeWithContact, TradeStatus } from "../../models/trade";
import { styles } from "./TradeListView.styles";

type TradeListViewProps = {
  trades: TradeWithContact[];
  filter: TradeStatus | "all";
  onFilterChange: (f: TradeStatus | "all") => void;
  onSelect: (id: string) => void;
  numColumns: number;
  filters: (TradeStatus | "all")[];
};

export function TradeListView({
  trades,
  filter,
  onFilterChange,
  onSelect,
  numColumns,
  filters,
}: TradeListViewProps) {
  return (
    <>
      <TradeFilterBar
        filter={filter}
        onFilterChange={onFilterChange}
        filters={filters}
      />
      {trades.length === 0 ? (
        <EmptyState icon="swap-horizontal-outline" message="No trades" testID="trades-empty-state" />
      ) : (
        <FlatList
          key={numColumns}
          data={trades}
          keyExtractor={(item) => item.id}
          numColumns={numColumns}
          contentContainerStyle={styles.tradeList__list}
          columnWrapperStyle={numColumns > 1 ? { gap: spacing.sm } : undefined}
          ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
          renderItem={({ item, index }) => (
            <AnimatedListItem index={index}>
              <TradeRowView
                trade={item}
                onPress={() => onSelect(item.id)}
              />
            </AnimatedListItem>
          )}
        />
      )}
    </>
  );
}
