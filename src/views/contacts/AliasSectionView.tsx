import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Card } from "../../components/Card";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { SectionHeader } from "../shared/SectionHeader";
import { colors, spacing } from "../../constants/theme";
import type { BankingAlias } from "../../models/contact";
import { styles } from "./AliasSectionView.styles";

type AliasSectionViewProps = {
  aliases: BankingAlias[];
  showForm: boolean;
  bank: string;
  account: string;
  label: string;
  onBankChange: (v: string) => void;
  onAccountChange: (v: string) => void;
  onLabelChange: (v: string) => void;
  onOpenForm: () => void;
  onCloseForm: () => void;
  onAdd: () => void;
  onDelete: (id: string) => void;
};

export function AliasSectionView({
  aliases,
  showForm,
  bank,
  account,
  label,
  onBankChange,
  onAccountChange,
  onLabelChange,
  onOpenForm,
  onCloseForm,
  onAdd,
  onDelete,
}: AliasSectionViewProps) {
  return (
    <>
      <SectionHeader title="Banking Aliases" onAdd={onOpenForm} />
      {aliases.map((a) => (
        <Card key={a.id} style={styles.aliasSection__card}>
          <View style={styles.aliasSection__row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.aliasSection__title}>{a.bank_name}</Text>
              <Text style={styles.aliasSection__sub}>{a.account_identifier}</Text>
              {a.label && <Text style={styles.aliasSection__label}>{a.label}</Text>}
            </View>
            <TouchableOpacity
              onPress={() => onDelete(a.id)}
              accessibilityRole="button"
              accessibilityLabel={`Delete alias ${a.bank_name}`}
              accessibilityHint="Double tap to delete this banking alias"
              testID={`contact-alias-delete-${a.id}`}
            >
              <Ionicons name="trash-outline" size={20} color={colors.error} />
            </TouchableOpacity>
          </View>
        </Card>
      ))}
      {showForm && (
        <Card style={styles.aliasSection__card}>
          <Input label="Bank Name" value={bank} onChangeText={onBankChange} placeholder="e.g. BBVA" />
          <Input label="Account" value={account} onChangeText={onAccountChange} placeholder="e.g. CLABE" />
          <Input label="Label (optional)" value={label} onChangeText={onLabelChange} placeholder="e.g. personal" />
          <View style={{ flexDirection: "row", gap: spacing.sm }}>
            <Button title="Add" onPress={onAdd} disabled={!bank.trim() || !account.trim()} style={{ flex: 1 }} />
            <Button title="Cancel" variant="secondary" onPress={onCloseForm} style={{ flex: 1 }} />
          </View>
        </Card>
      )}
      {aliases.length === 0 && !showForm && (
        <Text style={styles.aliasSection__empty}>No banking aliases</Text>
      )}
    </>
  );
}
