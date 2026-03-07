import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Modal,
  StyleSheet,
  Platform,
} from "react-native";
import * as Notifications from "expo-notifications";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";
import { useAuthStore } from "../store/authStore";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { useDemoStore } from "../store/demoStore";
import { requestNotificationPermission } from "../services/notifications";
import Svg, { Path } from "react-native-svg";

const PROMPTED_KEY = "notif_prompted_v1";

function BellLargeIcon() {
  return (
    <Svg width={32} height={32} viewBox="0 0 24 24" fill="none">
      <Path
        d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
        stroke="#385225"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.73 21a2 2 0 0 1-3.46 0"
        stroke="#385225"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default function NotificationPermissionSheet() {
  const { t } = useTranslation("common");
  const token = useAuthStore((s) => s.token);
  const isAuthLoading = useAuthStore((s) => s.isLoading);
  const isDemoMode = useDemoStore((s) => s.isDemoMode);
  const insets = useSafeAreaInsets();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!token || isAuthLoading || isDemoMode) return;
    // Only available in production builds
    if (Constants.executionEnvironment === "storeClient") return;

    const check = async () => {
      try {
        // Already decided (granted or denied) — no need to show our sheet
        const { status } = await Notifications.getPermissionsAsync();
        if (status !== "undetermined") return;
        // Already shown our pre-prompt before
        const seen = await SecureStore.getItemAsync(PROMPTED_KEY);
        if (seen) return;
        setVisible(true);
      } catch {
        // Silently skip if permissions API unavailable
      }
    };

    // Small delay so the user lands on the home screen before the sheet appears
    const timer = setTimeout(check, 1500);
    return () => clearTimeout(timer);
  }, [token, isAuthLoading, isDemoMode]);

  const markSeen = async () => {
    await SecureStore.setItemAsync(PROMPTED_KEY, "1").catch(() => {});
  };

  const handleAllow = async () => {
    setVisible(false);
    await markSeen();
    await requestNotificationPermission();
  };

  const handleSkip = async () => {
    setVisible(false);
    await markSeen();
  };

  if (!visible) return null;

  return (
    <Modal transparent visible animationType="slide" onRequestClose={handleSkip}>
      <Pressable style={s.backdrop} onPress={handleSkip} />
      <View style={[s.sheet, { paddingBottom: insets.bottom + 24 }]}>
        <View style={s.grabber} />

        <View style={s.iconWrap}>
          <BellLargeIcon />
        </View>

        <Text style={s.title}>{t("notifications.permissionTitle")}</Text>
        <Text style={s.body}>{t("notifications.permissionBody")}</Text>

        <Pressable style={s.primaryBtn} onPress={handleAllow}>
          <Text style={s.primaryBtnText}>{t("notifications.allowBtn")}</Text>
        </Pressable>

        <Pressable style={s.secondaryBtn} onPress={handleSkip}>
          <Text style={s.secondaryBtnText}>{t("buttons.notNow")}</Text>
        </Pressable>
      </View>
    </Modal>
  );
}

const s = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  sheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 28,
    paddingTop: 12,
    alignItems: "center",
  },
  grabber: {
    width: 44,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#d9d9d9",
    marginBottom: 24,
  },
  iconWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#DFF7C4",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111",
    textAlign: "center",
    letterSpacing: -0.3,
    marginBottom: 12,
  },
  body: {
    fontSize: 15,
    color: "#6b6b6b",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 32,
  },
  primaryBtn: {
    width: "100%",
    backgroundColor: "#385225",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 12,
  },
  primaryBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: -0.2,
  },
  secondaryBtn: {
    paddingVertical: 10,
  },
  secondaryBtnText: {
    color: "#6b6b6b",
    fontSize: 15,
    fontWeight: "500",
  },
});
