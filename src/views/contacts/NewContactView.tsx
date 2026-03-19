import { View } from "react-native";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { styles } from "./NewContactView.styles";

type NewContactViewProps = {
  name: string;
  onNameChange: (v: string) => void;
  onSave: () => void;
  loading: boolean;
};

export function NewContactView({ name, onNameChange, onSave, loading }: NewContactViewProps) {
  return (
    <View style={styles.newContact}>
      <Input label="Name" placeholder="Contact name" value={name} onChangeText={onNameChange} autoFocus testID="contact-new-name-input" />
      <Button title="Save" onPress={onSave} loading={loading} disabled={!name.trim()} testID="contact-new-save-btn" />
    </View>
  );
}
