import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing, fontSize, borderRadius } from "../constants/theme";

type Tab = {
  name: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
};

const TABS: Tab[] = [
  { name: "index", title: "Contacts", icon: "people" },
  { name: "trades", title: "Trades", icon: "swap-horizontal" },
  { name: "address", title: "My Address", icon: "qr-code" },
  { name: "settings", title: "Settings", icon: "settings" },
];

type SidebarProps = {
  activeTab: string;
  onTabPress: (name: string) => void;
};

export function Sidebar({ activeTab, onTabPress }: SidebarProps) {
  return (
    <View style={styles.sidebar}>
      <Text style={styles.logo}>Rolobitdex</Text>
      {TABS.map((tab) => {
        const isActive = activeTab === tab.name;
        return (
          <TouchableOpacity
            key={tab.name}
            style={[styles.navItem, isActive && styles.navItemActive]}
            onPress={() => onTabPress(tab.name)}
          >
            <Ionicons
              name={tab.icon}
              size={22}
              color={isActive ? colors.primary : colors.textSecondary}
            />
            <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>
              {tab.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    width: 220,
    backgroundColor: colors.surface,
    paddingTop: spacing.xl,
    paddingHorizontal: spacing.sm,
    borderRightWidth: 1,
    borderRightColor: colors.border,
  },
  logo: {
    color: colors.primary,
    fontSize: fontSize.xl,
    fontWeight: "700",
    paddingHorizontal: spacing.md,
    marginBottom: spacing.xl,
  },
  navItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.sm + 4,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.sm,
    marginBottom: spacing.xs,
  },
  navItemActive: {
    backgroundColor: colors.surfaceLight,
  },
  navLabel: {
    color: colors.textSecondary,
    fontSize: fontSize.md,
    marginLeft: spacing.md,
  },
  navLabelActive: {
    color: colors.primary,
    fontWeight: "600",
  },
});
