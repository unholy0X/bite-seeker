import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Linking,
} from "react-native";
import { useTranslation } from "react-i18next";
import BottomSheetModal from "../BottomSheetModal";
import { useSubscriptionStore } from "../../store";
import { sc } from "../../utils/deviceScale";
import { SOLBITE_PUMP_URL } from "../../constants/solana";

const C = {
  bg: "#F4F5F7",
  card: "#ffffff",
  accent: "#2DD955",
  textPrimary: "#111111",
  textSecondary: "#6b6b6b",
  textMuted: "#B4B4B4",
  gold: "#F9A825",
};

export default function SolbiteGateSheet({ visible, onClose, featureName }) {
  const { t } = useTranslation("paywall");
  const entitlement = useSubscriptionStore((s) => s.entitlement);

  const handleGetSolbite = () => {
    Linking.openURL(SOLBITE_PUMP_URL).catch(() => {});
    onClose();
  };

  return (
    <BottomSheetModal visible={visible} onClose={onClose}>
      <View style={styles.container}>
        <View style={styles.badge}>
          <Text style={styles.badgeEmoji}>🪙</Text>
        </View>

        <Text style={styles.title}>{t("gate.title", "Pro Feature")}</Text>
        {featureName ? (
          <Text style={styles.subtitle}>
            {t("gate.featureRequires", { feature: featureName, defaultValue: `"${featureName}" requires Pro access.` })}
          </Text>
        ) : null}

        <View style={styles.infoCard}>
          <Text style={styles.infoHeading}>{t("gate.howToUnlock", "How to unlock Pro")}</Text>
          <Text style={styles.infoBody}>
            {t("gate.holdSolbite", "Hold 1,000+ SOLBITE tokens in your connected wallet. Pro status is checked automatically.")}
          </Text>
        </View>

        {entitlement !== "pro" && (
          <View style={styles.statusRow}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>
              {t("gate.currentStatus", "Current status: Free tier")}
            </Text>
          </View>
        )}

        <Pressable
          style={({ pressed }) => [styles.ctaButton, pressed && { opacity: 0.85 }]}
          onPress={handleGetSolbite}
        >
          <Text style={styles.ctaText}>
            {t("gate.getSolbite", "Get SOLBITE on pump.fun")}
          </Text>
        </Pressable>

        <Pressable style={styles.dismissRow} onPress={onClose}>
          <Text style={styles.dismissText}>{t("gate.maybeLater", "Maybe later")}</Text>
        </Pressable>
      </View>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: sc(20),
    paddingBottom: sc(8),
    alignItems: "center",
  },
  badge: {
    width: sc(64),
    height: sc(64),
    borderRadius: sc(32),
    backgroundColor: "rgba(249,168,37,0.12)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: sc(16),
  },
  badgeEmoji: {
    fontSize: sc(32),
  },
  title: {
    fontSize: sc(22),
    fontFamily: "Inter_600SemiBold",
    color: C.textPrimary,
    marginBottom: sc(8),
    textAlign: "center",
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: sc(14),
    fontFamily: "Inter_400Regular",
    color: C.textSecondary,
    textAlign: "center",
    lineHeight: sc(20),
    marginBottom: sc(20),
  },
  infoCard: {
    width: "100%",
    backgroundColor: C.card,
    borderRadius: 16,
    padding: sc(16),
    marginBottom: sc(16),
  },
  infoHeading: {
    fontSize: sc(14),
    fontFamily: "Inter_600SemiBold",
    color: C.textPrimary,
    marginBottom: sc(6),
  },
  infoBody: {
    fontSize: sc(13),
    fontFamily: "Inter_400Regular",
    color: C.textSecondary,
    lineHeight: sc(19),
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: sc(20),
    gap: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: C.textMuted,
  },
  statusText: {
    fontSize: sc(13),
    fontFamily: "Inter_400Regular",
    color: C.textMuted,
  },
  ctaButton: {
    width: "100%",
    backgroundColor: C.gold,
    borderRadius: 14,
    paddingVertical: sc(16),
    alignItems: "center",
    marginBottom: sc(12),
  },
  ctaText: {
    fontSize: sc(16),
    fontFamily: "Inter_600SemiBold",
    color: "#ffffff",
  },
  dismissRow: {
    paddingVertical: sc(10),
    alignItems: "center",
  },
  dismissText: {
    fontSize: sc(14),
    fontFamily: "Inter_400Regular",
    color: C.textMuted,
  },
});
