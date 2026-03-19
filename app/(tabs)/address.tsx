import { View, Text, StyleSheet } from "react-native";
import { AddressView } from "../../src/views/address/AddressView";
import { useAddress } from "../../src/controllers/useAddress";
import { colors, typography } from "../../src/constants/theme";

export default function AddressScreen() {
  const { address, copied, handleCopy, handleShare } = useAddress();

  if (!address) {
    return (
      <View style={s.container}>
        <Text style={s.loading}>Generating address...</Text>
      </View>
    );
  }

  return (
    <View style={s.container}>
      <AddressView address={address} copied={copied} onCopy={handleCopy} onShare={handleShare} />
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  loading: { color: colors.textSecondary, textAlign: "center", marginTop: 40 },
});
