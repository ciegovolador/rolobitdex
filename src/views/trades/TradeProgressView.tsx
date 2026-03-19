import { View, Text } from "react-native";
import Animated, { FadeIn, ZoomIn } from "react-native-reanimated";
import { colors, statusColors, animation } from "../../constants/theme";
import type { TradeStatus } from "../../models/trade";
import { STATUS_STEPS } from "../../controllers/useTradeDetail";
import { styles } from "./TradeProgressView.styles";

type TradeProgressViewProps = {
  status: TradeStatus;
  currentIdx: number;
};

export function TradeProgressView({ status, currentIdx }: TradeProgressViewProps) {
  const isCancelled = status === "cancelled";

  return (
    <View
      style={styles.tradeProgress}
      accessibilityLabel={`Trade progress: step ${currentIdx + 1} of ${STATUS_STEPS.length}, currently ${status.replace("_", " ")}`}
      testID="trade-detail-progress"
    >
      {STATUS_STEPS.map((step, i) => {
        const done = !isCancelled && i <= currentIdx;
        const isCurrent = !isCancelled && i === currentIdx;
        const dotColor = done ? statusColors[step] || colors.primary : colors.surfaceLight;
        return (
          <View
            key={step}
            style={styles.tradeProgress__step}
            accessibilityLabel={`${step.replace("_", " ")}${isCurrent ? ", current step" : done ? ", completed" : ", upcoming"}`}
          >
            <Animated.View
              entering={isCurrent ? ZoomIn.duration(animation.normal) : FadeIn.duration(animation.fast)}
              style={[
                styles.tradeProgress__dot,
                { backgroundColor: dotColor },
                isCurrent && styles.tradeProgress__dot_current,
              ]}
            />
            {i < STATUS_STEPS.length - 1 && (
              <View
                style={[
                  styles.tradeProgress__connector,
                  done && i < currentIdx && { backgroundColor: statusColors[step] || colors.primary },
                ]}
              />
            )}
            <Text style={[styles.tradeProgress__label, done && styles.tradeProgress__label_done]}>
              {step.replace("_", "\n")}
            </Text>
          </View>
        );
      })}
    </View>
  );
}
