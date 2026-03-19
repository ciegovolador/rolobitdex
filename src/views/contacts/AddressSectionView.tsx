import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Card } from "../../components/Card";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { SectionHeader } from "../shared/SectionHeader";
import { colors, spacing } from "../../constants/theme";
import type { SilentPaymentAddress } from "../../models/contact";
import { styles } from "./AddressSectionView.styles";

type AddressSectionViewProps = {
  addresses: SilentPaymentAddress[];
  showForm: boolean;
  addrValue: string;
  addrLabel: string;
  onAddrChange: (v: string) => void;
  onLabelChange: (v: string) => void;
  onOpenForm: () => void;
  onCloseForm: () => void;
  onAdd: () => void;
  onDelete: (id: string) => void;
};

export function AddressSectionView({
  addresses,
  showForm,
  addrValue,
  addrLabel,
  onAddrChange,
  onLabelChange,
  onOpenForm,
  onCloseForm,
  onAdd,
  onDelete,
}: AddressSectionViewProps) {
  return (
    <>
      <SectionHeader title="Silent Payment Addresses" onAdd={onOpenForm} />
      {addresses.map((a) => (
        <Card key={a.id} style={styles.addressSection__card}>
          <View style={styles.addressSection__row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.addressSection__sub} numberOfLines={1} ellipsizeMode="middle">{a.address}</Text>
              {a.label && <Text style={styles.addressSection__label}>{a.label}</Text>}
            </View>
            <TouchableOpacity
              onPress={() => onDelete(a.id)}
              accessibilityRole="button"
              accessibilityLabel="Delete address"
              accessibilityHint="Double tap to delete this silent payment address"
              testID={`contact-addr-delete-${a.id}`}
            >
              <Ionicons name="trash-outline" size={20} color={colors.error} />
            </TouchableOpacity>
          </View>
        </Card>
      ))}
      {showForm && (
        <Card style={styles.addressSection__card}>
          <Input label="Silent Payment Address" value={addrValue} onChangeText={onAddrChange} placeholder="sp1..." />
          <Input label="Label (optional)" value={addrLabel} onChangeText={onLabelChange} placeholder="e.g. main" />
          <View style={{ flexDirection: "row", gap: spacing.sm }}>
            <Button title="Add" onPress={onAdd} disabled={!addrValue.trim()} style={{ flex: 1 }} />
            <Button title="Cancel" variant="secondary" onPress={onCloseForm} style={{ flex: 1 }} />
          </View>
        </Card>
      )}
      {addresses.length === 0 && !showForm && (
        <Text style={styles.addressSection__empty}>No silent payment addresses</Text>
      )}
    </>
  );
}
