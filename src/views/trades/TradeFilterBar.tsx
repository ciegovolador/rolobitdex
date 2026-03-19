import { View, Text, TouchableOpacity } from "react-native";
import { colors, statusColors } from "../../constants/theme";
import type { TradeStatus } from "../../models/trade";
import { styles } from "./TradeFilterBar.styles";

type TradeFilterBarProps = {
  filter: TradeStatus | "all";
  onFilterChange: (f: TradeStatus | "all") => void;
  filters: (TradeStatus | "all")[];
};

export function TradeFilterBar({ filter, onFilterChange, filters }: TradeFilterBarProps) {
  return (
    <View style={styles.tradeFilter}>
      {filters.map((f) => {
        const isActive = filter === f;
        const chipColor = f !== "all" ? statusColors[f] : undefined;
        return (
          <TouchableOpacity
            key={f}
            style={[
              styles.tradeFilter__chip,
              isActive && { backgroundColor: chipColor || colors.primary },
            ]}
            onPress={() => onFilterChange(f)}
            activeOpacity={0.7}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={`Filter: ${f === "all" ? "All" : f.replace("_", " ")}`}
            testID={`trades-filter-${f}`}
          >
            <Text style={[styles.tradeFilter__text, isActive && styles.tradeFilter__text_active]}>
              {f === "all" ? "All" : f.replace("_", " ")}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
