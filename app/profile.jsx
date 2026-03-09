import { useState, useEffect, useCallback } from "react";
import {
  View, Text, StyleSheet, Pressable, Alert, ScrollView,
  TextInput, ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { AppBottomNav } from "@/src/features/navigation/components/app-bottom-nav";
import { colors, radii, spacing } from "@/src/theme/tokens";
import { useAuthStore } from "../store/authStore";
import { useUserStore } from "../store/userStore";
import { useLanguageStore } from "../store/languageStore";
import { useSubscriptionStore } from "../store";
import { useSeekerBalance } from "../utils/useSeekerBalance";
import SolbiteGateSheet from "../components/paywall/SolbiteGateSheet";

function hashStr(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = s.charCodeAt(i) + ((h << 5) - h);
  return Math.abs(h);
}

const AVATAR_COLORS = ["#7B5B4B", "#4B6B7B", "#5B7B4B", "#7B4B6B", "#4B5B7B", "#7B6B4B"];

function Avatar({ seed, size = 72 }) {
  const color = AVATAR_COLORS[hashStr(seed || "chef") % AVATAR_COLORS.length];
  const label = (seed || "C")[0].toUpperCase();
  return (
    <View style={[styles.avatar, { width: size, height: size, borderRadius: size / 2, backgroundColor: color }]}>
      <Text style={[styles.avatarLabel, { fontSize: size * 0.42 }]}>{label}</Text>
    </View>
  );
}

function SectionLabel({ children }) {
  return <Text style={styles.sectionLabel}>{children}</Text>;
}

/** A card-style row with icon + label stacked above an optional control */
function SettingCard({ icon, label, hint, children, onPress }) {
  const Wrapper = onPress ? Pressable : View;
  return (
    <Wrapper
      style={({ pressed } = {}) => [styles.settingCard, onPress && pressed && { opacity: 0.75 }]}
      onPress={onPress}
    >
      <View style={styles.settingCardTop}>
        <View style={styles.settingIcon}>
          <Feather name={icon} size={17} color={colors.textSecondary} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.settingLabel}>{label}</Text>
          {hint ? <Text style={styles.settingHint}>{hint}</Text> : null}
        </View>
        {!children && onPress ? (
          <Feather name="chevron-right" size={16} color={colors.textMuted} />
        ) : null}
      </View>
      {children ? <View style={styles.settingCardBottom}>{children}</View> : null}
    </Wrapper>
  );
}

function PillToggle({ options, value, onChange }) {
  return (
    <View style={styles.pillGroup}>
      {options.map((opt) => (
        <Pressable
          key={opt.value}
          onPress={() => onChange(opt.value)}
          style={[styles.pill, value === opt.value && styles.pillActive]}
        >
          <Text style={[styles.pillText, value === opt.value && styles.pillTextActive]}>
            {opt.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

export default function ProfileRoute() {
  const router = useRouter();
  const walletAddress = useAuthStore((s) => s.walletAddress);
  const clearToken = useAuthStore((s) => s.clearToken);
  const username = useUserStore((s) => s.username);
  const setUsername = useUserStore((s) => s.setUsername);
  const preferredUnitSystem = useUserStore((s) => s.preferredUnitSystem);
  const updatePreferences = useUserStore((s) => s.updatePreferences);

  const language = useLanguageStore((s) => s.language);
  const setLanguage = useLanguageStore((s) => s.setLanguage);

  const entitlement = useSubscriptionStore((s) => s.entitlement);
  const isPro = entitlement === "pro" || entitlement === "admin";

  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(username || "");
  const [paywallVisible, setPaywallVisible] = useState(false);

  const { balance, isLoading: balanceLoading, fetchBalance } = useSeekerBalance(walletAddress);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  const handleSaveName = useCallback(async () => {
    await setUsername(nameInput);
    setEditingName(false);
  }, [nameInput, setUsername]);

  const handleSignOut = useCallback(() => {
    Alert.alert("Sign out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: async () => {
          await clearToken();
          router.replace("/");
        },
      },
    ]);
  }, [clearToken, router]);

  const seed = username || walletAddress || "chef";
  const shortWallet = walletAddress
    ? `${walletAddress.slice(0, 6)}…${walletAddress.slice(-4)}`
    : "Not connected";

  const formatBalance = (val) => {
    if (val === null || val === undefined) return "—";
    if (val >= 1_000_000) return `${(val / 1_000_000).toFixed(1)}M`;
    if (val >= 1_000) return `${(val / 1_000).toFixed(1)}K`;
    return val.toLocaleString(undefined, { maximumFractionDigits: 2 });
  };

  return (
    <View style={styles.screen}>
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}
        >
          {/* ── Hero header ── */}
          <View style={styles.hero}>
            <Avatar seed={seed} size={80} />

            {editingName ? (
              <View style={styles.nameEditRow}>
                <TextInput
                  style={styles.nameInput}
                  value={nameInput}
                  onChangeText={setNameInput}
                  autoFocus
                  placeholder="Your name"
                  placeholderTextColor={colors.textMuted}
                  maxLength={32}
                  returnKeyType="done"
                  onSubmitEditing={handleSaveName}
                />
                <Pressable onPress={handleSaveName} style={styles.saveBtn}>
                  <Feather name="check" size={16} color={colors.accentText} />
                </Pressable>
              </View>
            ) : (
              <Pressable
                style={styles.nameRow}
                onPress={() => { setNameInput(username || ""); setEditingName(true); }}
              >
                <Text style={styles.displayName}>{username || "Set your name"}</Text>
                <Feather name="edit-2" size={13} color={colors.textMuted} style={styles.editIcon} />
              </Pressable>
            )}

            <Text style={styles.walletShort}>{shortWallet}</Text>
          </View>

          {/* ── SKR balance card ── */}
          <View style={styles.balanceCard}>
            <View style={styles.balanceMeta}>
              <Text style={styles.balanceLabel}>SKR Balance</Text>
              <Pressable onPress={() => fetchBalance(true)} hitSlop={16} style={styles.refreshBtn}>
                {balanceLoading
                  ? <ActivityIndicator color={colors.accent} size="small" />
                  : <Feather name="refresh-cw" size={15} color={colors.textMuted} />}
              </Pressable>
            </View>
            <Text style={styles.balanceValue}>{formatBalance(balance)}</Text>
          </View>

          {/* ── Language ── */}
          <SectionLabel>Language</SectionLabel>
          <SettingCard icon="globe" label="App language">
            <PillToggle
              options={[
                { label: "English", value: "en" },
                { label: "Français", value: "fr" },
                { label: "العربية", value: "ar" },
              ]}
              value={language}
              onChange={setLanguage}
            />
          </SettingCard>

          {/* ── Measurements ── */}
          <SectionLabel>Measurements</SectionLabel>
          <SettingCard icon="sliders" label="Unit system">
            <PillToggle
              options={[
                { label: "Metric", value: "metric" },
                { label: "Imperial", value: "imperial" },
              ]}
              value={preferredUnitSystem}
              onChange={(v) => updatePreferences({ preferredUnitSystem: v })}
            />
          </SettingCard>

          {/* ── Subscription ── */}
          <SectionLabel>Subscription</SectionLabel>
          {isPro ? (
            <SettingCard icon="award" label="Bite Seeker Pro">
              <View style={styles.proBadgeRow}>
                <View style={styles.proBadge}>
                  <Text style={styles.proBadgeText}>Active</Text>
                </View>
              </View>
            </SettingCard>
          ) : (
            <Pressable
              onPress={() => setPaywallVisible(true)}
              style={({ pressed }) => [styles.upgradeCard, pressed && { opacity: 0.8 }]}
            >
              <View style={styles.upgradeIconWrap}>
                <Feather name="zap" size={18} color={colors.accent} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.upgradeTitle}>Upgrade to Pro</Text>
                <Text style={styles.upgradeHint}>Unlimited extractions, pantry scans & more</Text>
              </View>
              <Feather name="chevron-right" size={16} color={colors.accent} />
            </Pressable>
          )}

          {/* ── Account ── */}
          <SectionLabel>Account</SectionLabel>
          <Pressable
            style={({ pressed }) => [styles.signOutCard, pressed && { opacity: 0.8 }]}
            onPress={handleSignOut}
          >
            <View style={styles.signOutIconWrap}>
              <Feather name="log-out" size={17} color="#FF6B6B" />
            </View>
            <Text style={styles.signOutLabel}>Sign Out</Text>
          </Pressable>

        </ScrollView>
      </SafeAreaView>

      <AppBottomNav />
      <SolbiteGateSheet visible={paywallVisible} onClose={() => setPaywallVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  safeArea: { flex: 1 },
  scroll: { paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: 120 },

  // ── Hero ──
  hero: {
    alignItems: "center",
    paddingVertical: spacing.xl,
    gap: 8,
  },
  avatar: { alignItems: "center", justifyContent: "center" },
  avatarLabel: { color: "#fff", fontWeight: "700" },

  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 4,
  },
  displayName: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: "700",
    letterSpacing: -0.4,
  },
  editIcon: { marginTop: 2 },

  nameEditRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    marginTop: 4,
    width: "80%",
  },
  nameInput: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: "700",
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    paddingHorizontal: spacing.sm,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: colors.accent,
  },
  saveBtn: {
    width: 36, height: 36, borderRadius: radii.full,
    backgroundColor: colors.accent,
    alignItems: "center", justifyContent: "center",
  },

  walletShort: {
    color: colors.textMuted,
    fontSize: 13,
    letterSpacing: 0.3,
  },

  // ── Balance card ──
  balanceCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: "rgba(182,255,0,0.15)",
    marginBottom: spacing.lg,
  },
  balanceMeta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  balanceLabel: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  refreshBtn: { padding: 4 },
  balanceValue: {
    color: colors.accent,
    fontSize: 36,
    fontWeight: "800",
    letterSpacing: -1,
    lineHeight: 40,
  },

  // ── Section labels ──
  sectionLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginTop: spacing.lg,
    marginBottom: spacing.xs,
    paddingHorizontal: 4,
  },

  // ── Setting cards ──
  settingCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.md,
    marginBottom: spacing.xs,
  },
  settingCardTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  settingIcon: {
    width: 34, height: 34,
    borderRadius: radii.md,
    backgroundColor: colors.surfaceStrong,
    alignItems: "center", justifyContent: "center",
  },
  settingLabel: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: "600",
  },
  settingHint: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
  settingCardBottom: {
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.05)",
  },

  // ── Pills ──
  pillGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radii.full,
    backgroundColor: colors.surfaceStrong,
  },
  pillActive: { backgroundColor: colors.accent },
  pillText: { fontSize: 13, fontWeight: "600", color: colors.textMuted },
  pillTextActive: { color: colors.accentText },

  // ── Pro badge ──
  proBadgeRow: { flexDirection: "row" },
  proBadge: {
    backgroundColor: "rgba(182,255,0,0.12)",
    borderRadius: radii.full,
    paddingHorizontal: 12, paddingVertical: 6,
  },
  proBadgeText: { color: colors.accent, fontSize: 12, fontWeight: "700" },

  // ── Upgrade card ──
  upgradeCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.md,
    marginBottom: spacing.xs,
    borderWidth: 1,
    borderColor: "rgba(182,255,0,0.18)",
  },
  upgradeIconWrap: {
    width: 34, height: 34,
    borderRadius: radii.md,
    backgroundColor: "rgba(182,255,0,0.1)",
    alignItems: "center", justifyContent: "center",
  },
  upgradeTitle: {
    color: colors.accent,
    fontSize: 15,
    fontWeight: "700",
  },
  upgradeHint: { color: colors.textMuted, fontSize: 12, marginTop: 2 },

  // ── Sign out ──
  signOutCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.md,
    marginBottom: spacing.xs,
  },
  signOutIconWrap: {
    width: 34, height: 34,
    borderRadius: radii.md,
    backgroundColor: "rgba(255,107,107,0.1)",
    alignItems: "center", justifyContent: "center",
  },
  signOutLabel: { color: "#FF6B6B", fontSize: 15, fontWeight: "600" },


});
