import { View, Text, TouchableOpacity } from "react-native";
import { Card } from "../../components/Card";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { spacing } from "../../constants/theme";
import type { Contact } from "../../models/contact";
import { styles } from "./NewTradeView.styles";

type NewTradeViewProps = {
  contacts: Contact[];
  selectedContact: string;
  onSelectContact: (id: string) => void;
  type: "buy" | "sell";
  onTypeChange: (t: "buy" | "sell") => void;
  sats: string;
  onSatsChange: (v: string) => void;
  fiatCurrency: string;
  onFiatCurrencyChange: (v: string) => void;
  fiatAmount: string;
  onFiatAmountChange: (v: string) => void;
  onCreate: () => void;
  loading: boolean;
};

export function NewTradeView({
  contacts,
  selectedContact,
  onSelectContact,
  type,
  onTypeChange,
  sats,
  onSatsChange,
  fiatCurrency,
  onFiatCurrencyChange,
  fiatAmount,
  onFiatAmountChange,
  onCreate,
  loading,
}: NewTradeViewProps) {
  return (
    <View style={styles.newTrade}>
      <Text style={styles.newTrade__sectionLabel}>Trade Type</Text>
      <View style={styles.newTrade__typeRow}>
        {(["buy", "sell"] as const).map((t) => (
          <TouchableOpacity
            key={t}
            style={[styles.newTrade__typeBtn, type === t && styles.newTrade__typeBtn_active]}
            onPress={() => onTypeChange(t)}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityState={{ selected: type === t }}
            accessibilityLabel={t === "buy" ? "Buy Bitcoin" : "Sell Bitcoin"}
            testID={`trade-new-type-${t}`}
          >
            <Text style={[styles.newTrade__typeText, type === t && styles.newTrade__typeText_active]}>
              {t === "buy" ? "BUY BTC" : "SELL BTC"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.newTrade__sectionLabel}>Counterparty</Text>
      <Card>
        <View style={styles.newTrade__contactList}>
          {contacts.map((c) => {
            const isSelected = selectedContact === c.id;
            return (
              <TouchableOpacity
                key={c.id}
                style={[styles.newTrade__contactChip, isSelected && styles.newTrade__contactChip_active]}
                onPress={() => onSelectContact(c.id)}
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityState={{ selected: isSelected }}
                accessibilityLabel={`${c.name}${isSelected ? ", selected" : ""}`}
                testID={`trade-new-contact-${c.id}`}
              >
                <Text style={[styles.newTrade__contactText, isSelected && styles.newTrade__contactText_active]}>
                  {c.name}
                </Text>
              </TouchableOpacity>
            );
          })}
          {contacts.length === 0 && (
            <Text style={styles.newTrade__emptyText}>No contacts. Add a contact first.</Text>
          )}
        </View>
      </Card>

      <Text style={styles.newTrade__sectionLabel}>Trade Details</Text>
      <Input label="Sats Amount" value={sats} onChangeText={onSatsChange} placeholder="100000" keyboardType="numeric" testID="trade-new-sats-input" />
      <Input label="Fiat Currency" value={fiatCurrency} onChangeText={onFiatCurrencyChange} placeholder="MXN" testID="trade-new-currency-input" />
      <Input label="Fiat Amount" value={fiatAmount} onChangeText={onFiatAmountChange} placeholder="500" keyboardType="numeric" testID="trade-new-fiat-input" />

      <Button
        title="Create Trade"
        onPress={onCreate}
        loading={loading}
        disabled={!selectedContact || !sats || !fiatAmount}
        style={{ marginTop: spacing.sm }}
        testID="trade-new-create-btn"
      />
    </View>
  );
}
