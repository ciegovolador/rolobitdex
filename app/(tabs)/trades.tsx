import { useWindowDimensions } from "react-native";
import { router } from "expo-router";
import { AnimatedScreen } from "../../src/components/AnimatedScreen";
import { TradeListView } from "../../src/views/trades/TradeListView";
import { FAB } from "../../src/views/shared/FAB";
import { useTrades, STATUS_FILTERS } from "../../src/controllers/useTrades";
import { breakpoints } from "../../src/constants/theme";

export default function TradesScreen() {
  const { width } = useWindowDimensions();
  const numColumns = width >= breakpoints.tablet ? 2 : 1;
  const { trades, filter, setFilter } = useTrades();

  return (
    <AnimatedScreen>
      <TradeListView
        trades={trades}
        filter={filter}
        onFilterChange={setFilter}
        onSelect={(id) => router.push(`/trade/${id}`)}
        numColumns={numColumns}
        filters={STATUS_FILTERS}
      />
      <FAB
        onPress={() => router.push("/trade/new")}
        label="Add new trade"
        testID="trades-fab"
      />
    </AnimatedScreen>
  );
}
