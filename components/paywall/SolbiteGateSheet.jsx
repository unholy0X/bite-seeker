import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Linking,
} from "react-native";
import BottomSheetModal from "../BottomSheetModal";
import { useSubscriptionStore } from "../../store";
import { sc } from "../../utils/deviceScale";
import { SEEKER_BUY_URL, SEEKER_PRO_THRESHOLD, SEEKER_DECIMALS } from "../../constants/solana";

const PRO_DISPLAY_AMOUNT = (SEEKER_PRO_THRESHOLD / Math.pow(10, SEEKER_DECIMALS)).toLocaleString();

const C = {
  bg: "#F4F5F7",
  card: "#ffffff",
  accent: "#B6FF00",
  accentDark: "#1A2400",
  textPrimary: "#111111",
  textSecondary: "#6b6b6b",
  textMuted: "#B4B4B4",
  skrGreen: "#00C853",
};

export default function SolbiteGateSheet({ visible, onClose, featureName }) {
  const entitlement = useSubscriptionStore((s) => s.entitlement);

  const handleGetSeeker = () => {
    Linking.openURL(SEEKER_BUY_URL).catch(() => {});
    onClose();
  };

  return (
    <BottomSheetModal visible={visible} onClose={onClose}>
      <View style={styles.container}>
        <View style={styles.badge}>
          <Text style={styles.badgeEmoji}>🪬</Text>
        </View>

        <Text style={styles.title}>Seeker Pro</Text>
        {featureName ? (
          <Text style={styles.subtitle}>
            This feature requires Pro access.
          </Text>
        ) : null}

        <View style={styles.infoCard}>
          <Text style={styles.infoHeading}>How to unlock Pro</Text>
          <Text style={styles.infoBody}>
            Hold {PRO_DISPLAY_AMOUNT}+ SKR tokens in your connected wallet to unlock unlimited extractions and all Pro features.
          </Text>
        </View>

        <View style={styles.costCard}>
          <View style={styles.costRow}>
            <Text style={styles.costLabel}>Extraction fee</Text>
            <Text style={styles.costValue}>10 SKR</Text>
          </View>
          <View style={styles.costDivider} />
          <View style={styles.costRow}>
            <Text style={styles.costLabel}>Pro threshold</Text>
            <Text style={[styles.costValue, { color: C.skrGreen }]}>{PRO_DISPLAY_AMOUNT} SKR → free</Text>
          </View>
        </View>

        {entitlement !== "pro" && (
          <View style={styles.statusRow}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Current status: Free tier</Text>
          </View>
        )}

        <View style={styles.burnNote}>
          <Text style={styles.burnNoteText}>🔥 50% of all extraction fees are burned — reducing SKR supply and giving back to every holder in the Seeker community.</Text>
        </View>

        <Pressable
          style={({ pressed }) => [styles.ctaButton, pressed && { opacity: 0.85 }]}
          onPress={handleGetSeeker}
        >
          <Text style={styles.ctaText}>Get SKR on Jupiter</Text>
        </Pressable>

        <Pressable style={styles.dismissRow} onPress={onClose}>
          <Text style={styles.dismissText}>Maybe later</Text>
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
    backgroundColor: "rgba(0,200,83,0.12)",
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
    marginBottom: sc(10),
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
  costCard: {
    width: "100%",
    backgroundColor: C.card,
    borderRadius: 16,
    padding: sc(16),
    marginBottom: sc(16),
  },
  costRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: sc(4),
  },
  costDivider: {
    height: 1,
    backgroundColor: "#F0F0F0",
    marginVertical: sc(6),
  },
  costLabel: {
    fontSize: sc(13),
    fontFamily: "Inter_400Regular",
    color: C.textSecondary,
  },
  costValue: {
    fontSize: sc(13),
    fontFamily: "Inter_600SemiBold",
    color: C.textPrimary,
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
    backgroundColor: C.skrGreen,
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
  burnNote: {
    width: "100%",
    backgroundColor: "rgba(0,200,83,0.08)",
    borderRadius: 12,
    padding: sc(12),
    marginBottom: sc(14),
    borderWidth: 1,
    borderColor: "rgba(0,200,83,0.15)",
  },
  burnNoteText: {
    fontSize: sc(12),
    fontFamily: "Inter_400Regular",
    color: C.textSecondary,
    lineHeight: sc(18),
    textAlign: "center",
  },
});
