import { useState, useEffect, useCallback } from "react";
import {
  View, Text, StyleSheet, ScrollView, ActivityIndicator,
  RefreshControl, Pressable, Alert, TextInput, AppState,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, usePathname } from "expo-router";
import { AppBottomNav } from "@/src/features/navigation/components/app-bottom-nav";
import { colors, radii, spacing } from "@/src/theme/tokens";
import BottomSheetModal from "../components/BottomSheetModal";
import CheckIcon from "../components/icons/CheckIcon";
import PlusIcon from "../components/icons/PlusIcon";
import { useTranslation } from "react-i18next";
import { useShoppingStore } from "../store";
import { sc } from "../utils/deviceScale";

const CARD_PALETTES = [
  { bg: "#0D1A0C", border: "#1A2C18", text: "#F3F5F8", progress: "#B6FF00", progressBg: "#1A2C18" },
  { bg: "#0D1524", border: "#152240", text: "#F3F5F8", progress: "#6AB0F0", progressBg: "#152240" },
  { bg: "#160D27", border: "#241545", text: "#F3F5F8", progress: "#A090E0", progressBg: "#241545" },
  { bg: "#271506", border: "#3D2200", text: "#F3F5F8", progress: "#E08040", progressBg: "#3D2200" },
  { bg: "#270A0A", border: "#3D1010", text: "#F3F5F8", progress: "#E06060", progressBg: "#3D1010" },
  { bg: "#091F1A", border: "#0F3028", text: "#F3F5F8", progress: "#40C0A0", progressBg: "#0F3028" },
];

const ShoppingListCard = ({ list, index, onPress, onLongPress, isSelecting, isSelected, onSelect }) => {
  const { t } = useTranslation("shopping");
  const itemCount = list.itemCount || 0;
  const checkedCount = list.checkedCount || 0;
  const progress = itemCount > 0 ? checkedCount / itemCount : 0;
  const isComplete = itemCount > 0 && checkedCount === itemCount;
  const p = CARD_PALETTES[index % CARD_PALETTES.length];

  return (
    <Pressable
      style={[styles.listCard, { backgroundColor: p.bg, borderColor: p.border },
        isSelected && styles.listCardSelected]}
      onPress={() => isSelecting ? onSelect(list.id) : onPress()}
      onLongPress={() => !isSelecting && onLongPress()}
    >
      {isSelecting && (
        <View style={[styles.selectCheckbox, isSelected && styles.selectCheckboxChecked]}>
          {isSelected && <CheckIcon width={sc(12)} height={sc(12)} color="#ffffff" />}
        </View>
      )}
      <View style={styles.listInfo}>
        <Text style={[styles.listName, { color: p.text }]} numberOfLines={1}>{list.name}</Text>
        <Text style={[styles.listCount, { color: p.text, opacity: 0.6 }]}>
          {t("detail.checked", { count: itemCount, checked: checkedCount, total: itemCount })}
        </Text>
        {itemCount > 0 && (
          <View style={[styles.progressBar, { backgroundColor: p.progressBg }]}>
            <View style={[styles.progressFill, { width: `${progress * 100}%`, backgroundColor: p.progress }]} />
          </View>
        )}
      </View>
      <View style={styles.listStatus}>
        {isComplete ? (
          <View style={[styles.completeBadge, { backgroundColor: p.border }]}>
            <CheckIcon width={sc(14)} height={sc(14)} color={colors.accent} />
          </View>
        ) : itemCount > 0 ? (
          <Text style={[styles.progressText, { color: p.text }]}>{checkedCount}/{itemCount}</Text>
        ) : null}
      </View>
    </Pressable>
  );
};

const CreateListSheet = ({ onClose, onCreate }) => {
  const { t } = useTranslation("shopping");
  const [name, setName] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = async () => {
    if (!name.trim()) return;
    setIsCreating(true);
    try {
      await onCreate(name.trim());
      onClose();
    } catch {
      Alert.alert(t("errors:shopping.createFailed"), t("tryAgain", { ns: "common" }));
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <View style={styles.sheetContent}>
      <Text style={styles.sheetTitle}>{t("create.sheetTitle")}</Text>
      <Text style={styles.inputLabel}>{t("create.nameLabel")}</Text>
      <TextInput
        style={styles.textInput}
        placeholder={t("create.namePlaceholder")}
        placeholderTextColor={colors.textMuted}
        value={name}
        onChangeText={setName}
        autoFocus
      />
      <View style={styles.sheetButtons}>
        <Pressable style={styles.cancelBtn} onPress={onClose}>
          <Text style={styles.cancelBtnText}>{t("create.cancel")}</Text>
        </Pressable>
        <Pressable
          style={[styles.createBtn, (!name.trim() || isCreating) && styles.createBtnDisabled]}
          onPress={handleCreate}
          disabled={!name.trim() || isCreating}
        >
          {isCreating ? (
            <ActivityIndicator size="small" color={colors.accentText} />
          ) : (
            <Text style={styles.createBtnText}>{t("create.create")}</Text>
          )}
        </Pressable>
      </View>
    </View>
  );
};

export default function ShoppingRoute() {
  const router = useRouter();
  const pathname = usePathname();
  const { t, i18n } = useTranslation("shopping");
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  const { lists = [], isLoading, isMerging, error, loadLists, createList, deleteList, deleteLists, mergeLists } =
    useShoppingStore();

  useEffect(() => {
    loadLists({}).catch(() => {});
    const sub = AppState.addEventListener("change", (state) => {
      if (state === "active") loadLists({}).catch(() => {});
    });
    return () => sub.remove();
  }, []);

  useEffect(() => {
    if (pathname === "/shopping") loadLists({}).catch(() => {});
  }, [pathname]);

  const safeListsArray = Array.isArray(lists) ? lists : [];
  const isEmpty = !isLoading && safeListsArray.length === 0;

  const toggleSelect = (id) => setSelectedIds((prev) =>
    prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
  );
  const enterSelectMode = () => { setIsSelecting(true); setSelectedIds([]); };
  const exitSelectMode = () => { setIsSelecting(false); setSelectedIds([]); };

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) return;
    Alert.alert(t("delete.title", { count: selectedIds.length }), t("delete.message", { count: selectedIds.length }), [
      { text: t("buttons.cancel", { ns: "common" }), style: "cancel" },
      { text: t("buttons.delete", { ns: "common" }), style: "destructive",
        onPress: async () => {
          try { await deleteLists({ listIds: selectedIds }); exitSelectMode(); }
          catch (err) { Alert.alert(t("errors:shopping.deleteFailed"), err?.message || t("tryAgain", { ns: "common" })); }
        },
      },
    ]);
  };

  const handleMergeSelected = () => {
    if (selectedIds.length < 2) { Alert.alert(t("merge.selectMore"), t("merge.hint")); return; }
    const names = selectedIds.map((id) => safeListsArray.find((x) => x.id === id)?.name || "");
    Alert.alert(t("merge.title"), t("merge.confirm", { names: names.join(", ") }), [
      { text: t("buttons.cancel", { ns: "common" }), style: "cancel" },
      { text: t("merge.merge"), onPress: async () => {
        try {
          const dateStr = new Date().toLocaleDateString(i18n.language, { month: "short", day: "numeric" });
          await mergeLists({ sourceListIds: selectedIds, name: t("merge.generatedName", { date: dateStr }) });
          Alert.alert(t("merge.successTitle"), t("merge.successMessage"));
        } catch { Alert.alert(t("errors:shopping.mergeFailed"), t("tryAgain", { ns: "common" })); }
        exitSelectMode();
      }},
    ]);
  };

  const handleClearAll = useCallback(() => {
    setMenuOpen(false);
    Alert.alert(t("clearAll.title"), t("clearAll.message", { count: safeListsArray.length }), [
      { text: t("clearAll.keepLists"), style: "cancel" },
      { text: t("clearAll.clearAll"), style: "destructive", onPress: async () => {
        setIsClearing(true);
        try { await deleteLists({ listIds: safeListsArray.map((l) => l.id) }); }
        catch (err) { Alert.alert(t("errors:shopping.deleteFailed"), err?.message || t("tryAgain", { ns: "common" })); }
        finally { setIsClearing(false); }
      }},
    ]);
  }, [safeListsArray]);

  return (
    <View style={styles.screen}>
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>{t("header")}</Text>
            <Text style={styles.subtitle}>{t("listCount", { count: safeListsArray.length })}</Text>
          </View>
          <View style={styles.headerActions}>
            {isSelecting ? (
              <Pressable style={styles.cancelSelectBtn} onPress={exitSelectMode}>
                <Text style={styles.cancelSelectText}>{t("buttons.cancel", { ns: "common" })}</Text>
              </Pressable>
            ) : (
              <>
                <Pressable style={styles.iconButton} onPress={() => setMenuOpen(true)}>
                  <Text style={styles.dotsText}>•••</Text>
                </Pressable>
                <Pressable style={styles.addButton} onPress={() => setSheetOpen(true)}>
                  <PlusIcon width={sc(22)} height={sc(22)} color={colors.accentText} />
                </Pressable>
              </>
            )}
          </View>
        </View>

        {/* Content */}
        {isLoading && safeListsArray.length === 0 ? (
          <View style={styles.centered}>
            <ActivityIndicator color={colors.accent} size="large" />
          </View>
        ) : error ? (
          <View style={styles.centered}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : isEmpty ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>{t("empty.title")}</Text>
            <Text style={styles.emptySubtitle}>{t("empty.subtitle")}</Text>
            <Pressable style={styles.emptyBtn} onPress={() => setSheetOpen(true)}>
              <Text style={styles.emptyBtnText}>{t("empty.createButton")}</Text>
            </Pressable>
          </View>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            refreshControl={<RefreshControl refreshing={isLoading} onRefresh={() => loadLists({}).catch(() => {})} tintColor={colors.accent} />}
          >
            {safeListsArray.map((list, index) => (
              <ShoppingListCard
                key={list.id}
                list={list}
                index={index}
                onPress={() => router.push(`/shoppingList?id=${list.id}`)}
                onLongPress={() => Alert.alert(
                  t("delete.title", { count: 1 }),
                  t("delete.messageNamed", { name: list.name }),
                  [
                    { text: t("buttons.cancel", { ns: "common" }), style: "cancel" },
                    { text: t("buttons.delete", { ns: "common" }), style: "destructive",
                      onPress: () => deleteList({ listId: list.id }).catch((err) =>
                        Alert.alert(t("errors:shopping.deleteFailed"), err?.message || t("tryAgain", { ns: "common" }))
                      ),
                    },
                  ]
                )}
                isSelecting={isSelecting}
                isSelected={selectedIds.includes(list.id)}
                onSelect={toggleSelect}
              />
            ))}
          </ScrollView>
        )}

        {/* Selection action bar */}
        {isSelecting && selectedIds.length > 0 && (
          <View style={styles.selectionBar}>
            <Text style={styles.selectionCount}>{selectedIds.length} selected</Text>
            <View style={styles.selectionActions}>
              {selectedIds.length >= 2 && (
                <Pressable style={[styles.selectionBtn, styles.mergeBtn]} onPress={handleMergeSelected} disabled={isMerging}>
                  {isMerging ? <ActivityIndicator size="small" color="#28457A" /> : <Text style={styles.mergeBtnText}>{t("merge.merge")}</Text>}
                </Pressable>
              )}
              <Pressable style={[styles.selectionBtn, styles.deleteBtn]} onPress={handleDeleteSelected}>
                <Text style={styles.deleteBtnText}>{t("buttons.delete", { ns: "common" })}</Text>
              </Pressable>
            </View>
          </View>
        )}
      </SafeAreaView>

      {!isSelecting && <AppBottomNav />}

      {/* Create list sheet */}
      <BottomSheetModal visible={isSheetOpen} onClose={() => setSheetOpen(false)} sheetBackground="#0E131D">
        <CreateListSheet onClose={() => setSheetOpen(false)} onCreate={async (name) => { await createList({ name }); }} />
      </BottomSheetModal>

      {/* Menu sheet */}
      <BottomSheetModal visible={isMenuOpen} onClose={() => setMenuOpen(false)} sheetBackground="#0E131D">
        <View style={styles.menuSheet}>
          <Text style={styles.menuTitle}>{t("menu.title")}</Text>
          <Pressable style={styles.menuOptionNeutral} onPress={() => { setMenuOpen(false); enterSelectMode(); }}>
            <View style={styles.menuOptionNeutralIcon}>
              <CheckIcon width={sc(16)} height={sc(16)} color={colors.accent} />
            </View>
            <View>
              <Text style={styles.menuOptionNeutralLabel}>{t("menu.selectLists")}</Text>
              <Text style={styles.menuOptionDesc}>{t("menu.selectHint")}</Text>
            </View>
          </Pressable>
          <Pressable style={styles.menuOption} onPress={handleClearAll} disabled={safeListsArray.length === 0 || isClearing}>
            <View style={styles.menuOptionIcon}>
              {isClearing ? <ActivityIndicator size="small" color="#FF6B6B" /> : <Text style={styles.menuOptionIconText}>✕</Text>}
            </View>
            <View>
              <Text style={styles.menuOptionLabel}>{t("clearAll.title")}</Text>
              <Text style={styles.menuOptionDesc}>{t("menu.clearHint", { count: safeListsArray.length })}</Text>
            </View>
          </Pressable>
          <Pressable style={styles.menuDismiss} onPress={() => setMenuOpen(false)}>
            <Text style={styles.menuDismissText}>{t("buttons.cancel", { ns: "common" })}</Text>
          </Pressable>
        </View>
      </BottomSheetModal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  safeArea: { flex: 1, paddingTop: spacing.sm },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: spacing.lg, marginBottom: spacing.md },
  title: { fontSize: sc(24), fontWeight: "700", color: colors.textPrimary },
  subtitle: { marginTop: 3, fontSize: sc(13), color: colors.textMuted },
  headerActions: { flexDirection: "row", alignItems: "center", gap: spacing.xs },
  iconButton: { width: sc(44), height: sc(44), borderRadius: radii.full, backgroundColor: colors.surfaceStrong, alignItems: "center", justifyContent: "center" },
  dotsText: { color: colors.textSecondary, fontSize: 10, letterSpacing: 1 },
  addButton: { width: sc(48), height: sc(48), borderRadius: radii.full, backgroundColor: colors.accent, alignItems: "center", justifyContent: "center" },
  cancelSelectBtn: { borderRadius: radii.full, paddingHorizontal: 18, paddingVertical: 10, backgroundColor: colors.surfaceStrong },
  cancelSelectText: { fontSize: sc(14), fontWeight: "600", color: colors.textPrimary },
  scrollContent: { paddingHorizontal: spacing.lg, paddingBottom: 24, gap: spacing.sm },
  listCard: { flexDirection: "row", alignItems: "center", borderRadius: radii.lg, padding: spacing.md, borderWidth: 1 },
  listCardSelected: { borderColor: colors.accent, borderWidth: 2 },
  selectCheckbox: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: colors.surfaceBorder, alignItems: "center", justifyContent: "center", marginRight: spacing.sm },
  selectCheckboxChecked: { backgroundColor: colors.accent, borderColor: colors.accent },
  listInfo: { flex: 1 },
  listName: { fontSize: sc(16), fontWeight: "600" },
  listCount: { marginTop: 2, fontSize: sc(13) },
  progressBar: { marginTop: 8, height: 4, borderRadius: 2, overflow: "hidden" },
  progressFill: { height: "100%", borderRadius: 2 },
  listStatus: { marginLeft: spacing.sm },
  progressText: { fontSize: sc(13), fontWeight: "500" },
  completeBadge: { width: 28, height: 28, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  selectionBar: { position: "absolute", bottom: 0, left: 0, right: 0, flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: colors.surface, paddingHorizontal: spacing.lg, paddingVertical: spacing.md, paddingBottom: 40, borderTopLeftRadius: radii.xl, borderTopRightRadius: radii.xl, borderTopWidth: 1, borderTopColor: colors.divider },
  selectionCount: { fontSize: sc(15), fontWeight: "600", color: colors.textPrimary },
  selectionActions: { flexDirection: "row", gap: spacing.xs },
  selectionBtn: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: radii.full, alignItems: "center" },
  mergeBtn: { backgroundColor: "#152240" },
  mergeBtnText: { fontSize: sc(14), fontWeight: "600", color: "#6AB0F0" },
  deleteBtn: { backgroundColor: "#270A0A" },
  deleteBtnText: { fontSize: sc(14), fontWeight: "600", color: "#FF6B6B" },
  centered: { flex: 1, alignItems: "center", justifyContent: "center" },
  errorText: { fontSize: sc(14), color: "#FF6B6B" },
  emptyState: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 40 },
  emptyTitle: { fontSize: sc(20), fontWeight: "600", color: colors.textPrimary, marginBottom: 8 },
  emptySubtitle: { fontSize: sc(14), color: colors.textSecondary, textAlign: "center", lineHeight: 20 },
  emptyBtn: { marginTop: 24, backgroundColor: colors.accent, borderRadius: radii.full, paddingHorizontal: 24, paddingVertical: 14 },
  emptyBtnText: { fontSize: sc(15), fontWeight: "600", color: colors.accentText },
  sheetContent: { paddingBottom: 20 },
  sheetTitle: { fontSize: sc(20), fontWeight: "600", color: colors.textPrimary, marginBottom: 20 },
  inputLabel: { fontSize: sc(13), color: colors.textSecondary, marginBottom: 8, marginTop: 12 },
  textInput: { backgroundColor: colors.surfaceStrong, borderRadius: radii.md, paddingHorizontal: spacing.md, paddingVertical: 14, fontSize: sc(16), color: colors.textPrimary },
  sheetButtons: { flexDirection: "row", gap: 10, marginTop: 24 },
  cancelBtn: { flex: 1, paddingVertical: 14, borderRadius: radii.full, backgroundColor: colors.surfaceStrong, alignItems: "center" },
  cancelBtnText: { fontSize: sc(15), color: colors.textSecondary, fontWeight: "500" },
  createBtn: { flex: 1, paddingVertical: 14, borderRadius: radii.full, backgroundColor: colors.accent, alignItems: "center" },
  createBtnDisabled: { opacity: 0.5 },
  createBtnText: { fontSize: sc(15), color: colors.accentText, fontWeight: "600" },
  menuSheet: { paddingBottom: 20 },
  menuTitle: { fontSize: sc(18), fontWeight: "600", color: colors.textPrimary, marginBottom: spacing.md },
  menuOptionNeutral: { flexDirection: "row", alignItems: "center", backgroundColor: colors.surfaceMuted, borderRadius: radii.md, padding: spacing.md, marginBottom: spacing.sm, gap: spacing.sm },
  menuOptionNeutralIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.surfaceStrong, alignItems: "center", justifyContent: "center" },
  menuOptionNeutralLabel: { fontSize: sc(15), fontWeight: "600", color: colors.accent },
  menuOption: { flexDirection: "row", alignItems: "center", backgroundColor: colors.surfaceMuted, borderRadius: radii.md, padding: spacing.md, marginBottom: spacing.sm, gap: spacing.sm },
  menuOptionIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.surfaceStrong, alignItems: "center", justifyContent: "center" },
  menuOptionIconText: { fontSize: sc(16), color: "#FF6B6B", fontWeight: "600" },
  menuOptionLabel: { fontSize: sc(15), fontWeight: "600", color: "#FF6B6B" },
  menuOptionDesc: { fontSize: sc(13), color: colors.textMuted, marginTop: 2 },
  menuDismiss: { alignItems: "center", paddingVertical: 14, borderRadius: radii.full, backgroundColor: colors.surfaceStrong, marginTop: spacing.xs },
  menuDismissText: { fontSize: sc(15), fontWeight: "500", color: colors.textSecondary },
});
