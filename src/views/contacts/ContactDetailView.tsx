import { View } from "react-native";
import { Button } from "../../components/Button";
import { ConfirmModal } from "../../components/ConfirmModal";
import { ContactHeaderView } from "./ContactHeaderView";
import { AliasSectionView } from "./AliasSectionView";
import { AddressSectionView } from "./AddressSectionView";
import { NoteSectionView } from "./NoteSectionView";
import { TradeHistoryView } from "./TradeHistoryView";
import { spacing } from "../../constants/theme";
import type { useContactDetail } from "../../controllers/useContactDetail";

type ContactDetailViewProps = {
  controller: ReturnType<typeof useContactDetail>;
  contactId: string;
  onSelectTrade: (id: string) => void;
  onNewTrade: () => void;
};

export function ContactDetailView({
  controller: c,
  contactId,
  onSelectTrade,
  onNewTrade,
}: ContactDetailViewProps) {
  if (!c.contact) return null;

  return (
    <View>
      <ContactHeaderView
        initials={c.initials}
        name={c.contact.name}
        editingName={c.editingName}
        nameValue={c.nameValue}
        onNameChange={c.setNameValue}
        onStartEdit={c.startEditName}
        onSaveName={c.saveName}
        onCancelEdit={c.cancelEditName}
      />

      <AliasSectionView
        aliases={c.aliases}
        showForm={c.showAliasForm}
        bank={c.aliasBank}
        account={c.aliasAccount}
        label={c.aliasLabel}
        onBankChange={c.setAliasBank}
        onAccountChange={c.setAliasAccount}
        onLabelChange={c.setAliasLabel}
        onOpenForm={c.openAliasForm}
        onCloseForm={c.closeAliasForm}
        onAdd={c.addAlias}
        onDelete={c.removeAlias}
      />

      <AddressSectionView
        addresses={c.addresses}
        showForm={c.showAddrForm}
        addrValue={c.addrValue}
        addrLabel={c.addrLabel}
        onAddrChange={c.setAddrValue}
        onLabelChange={c.setAddrLabel}
        onOpenForm={c.openAddrForm}
        onCloseForm={c.closeAddrForm}
        onAdd={c.addAddress}
        onDelete={c.removeAddress}
      />

      <NoteSectionView
        notes={c.notes}
        showForm={c.showNoteForm}
        noteValue={c.noteValue}
        onNoteChange={c.setNoteValue}
        onOpenForm={c.openNoteForm}
        onCloseForm={c.closeNoteForm}
        onAdd={c.addNote}
        onDelete={c.removeNote}
      />

      <TradeHistoryView
        trades={c.trades}
        contactId={contactId}
        onSelectTrade={onSelectTrade}
        onNewTrade={onNewTrade}
      />

      <Button
        title="Delete Contact"
        variant="danger"
        onPress={c.confirmDelete}
        style={{ marginTop: spacing.xl }}
        testID="contact-detail-delete-btn"
      />

      <ConfirmModal
        visible={c.showDelete}
        title="Delete Contact"
        message={`Delete "${c.contact.name}" and all associated data? This cannot be undone.`}
        confirmLabel="Delete"
        variant="danger"
        onConfirm={c.handleDelete}
        onCancel={c.cancelDelete}
        testID="contact-detail-delete-modal"
      />
    </View>
  );
}
