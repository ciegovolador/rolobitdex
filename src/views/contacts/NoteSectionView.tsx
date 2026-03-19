import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Card } from "../../components/Card";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { SectionHeader } from "../shared/SectionHeader";
import { colors, spacing } from "../../constants/theme";
import type { TrustNote } from "../../models/contact";
import { styles } from "./NoteSectionView.styles";

type NoteSectionViewProps = {
  notes: TrustNote[];
  showForm: boolean;
  noteValue: string;
  onNoteChange: (v: string) => void;
  onOpenForm: () => void;
  onCloseForm: () => void;
  onAdd: () => void;
  onDelete: (id: string) => void;
};

export function NoteSectionView({
  notes,
  showForm,
  noteValue,
  onNoteChange,
  onOpenForm,
  onCloseForm,
  onAdd,
  onDelete,
}: NoteSectionViewProps) {
  return (
    <>
      <SectionHeader title="Trust Notes" onAdd={onOpenForm} />
      {notes.map((n) => (
        <Card key={n.id} style={styles.noteSection__card}>
          <View style={styles.noteSection__row}>
            <Text style={[styles.noteSection__text, { flex: 1 }]}>{n.note}</Text>
            <TouchableOpacity
              onPress={() => onDelete(n.id)}
              accessibilityRole="button"
              accessibilityLabel="Delete note"
              accessibilityHint="Double tap to delete this trust note"
              testID={`contact-note-delete-${n.id}`}
            >
              <Ionicons name="trash-outline" size={20} color={colors.error} />
            </TouchableOpacity>
          </View>
        </Card>
      ))}
      {showForm && (
        <Card style={styles.noteSection__card}>
          <Input label="Note" value={noteValue} onChangeText={onNoteChange} placeholder="e.g. Reliable, always pays fast" multiline />
          <View style={{ flexDirection: "row", gap: spacing.sm }}>
            <Button title="Add" onPress={onAdd} disabled={!noteValue.trim()} style={{ flex: 1 }} />
            <Button title="Cancel" variant="secondary" onPress={onCloseForm} style={{ flex: 1 }} />
          </View>
        </Card>
      )}
      {notes.length === 0 && !showForm && (
        <Text style={styles.noteSection__empty}>No trust notes</Text>
      )}
    </>
  );
}
