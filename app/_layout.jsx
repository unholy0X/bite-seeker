import "../utils/polyfills";
import i18n from "../i18n"; // initialize i18next before any component renders
import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, AppState, I18nManager } from "react-native";
import * as Notifications from "expo-notifications";
import { Stack, useRouter, useSegments, Redirect } from "expo-router";
import * as Sentry from "@sentry/react-native";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserSync from "../components/UserSync";
import ErrorBoundary from "../components/ErrorBoundary";
import OfflineBanner from "../components/OfflineBanner";
import NotificationPermissionSheet from "../components/NotificationPermissionSheet";
import { useSubscriptionStore } from "../store";
import { useDemoStore } from "../store/demoStore";
import { useLanguageStore } from "../store/languageStore";
import { useAuthStore } from "../store/authStore";
import { useArabicFonts } from "../utils/fonts";

const SENTRY_DSN = process.env.EXPO_PUBLIC_SENTRY_DSN;
if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
    tracesSampleRate: 0.2,
    sendDefaultPii: false,
  });
}

const queryClient = new QueryClient();

function AuthGate() {
  const router = useRouter();
  const segments = useSegments();
  const token = useAuthStore((s) => s.token);
  const isAuthLoading = useAuthStore((s) => s.isLoading);
  const isDemoMode = useDemoStore((s) => s.isDemoMode);
  const [demoHydrated, setDemoHydrated] = useState(false);

  // Hydrate demo store before running the auth gate
  useEffect(() => {
    useDemoStore.getState().hydrate().then(() => setDemoHydrated(true));
  }, []);

  useEffect(() => {
    if (isAuthLoading || !demoHydrated) return;
    const path = `/${segments.join("/")}`;
    const isAuthRoute = path === "/" || path === "/sign-up";
    const isAuthenticated = !!token || isDemoMode;

    if (!isAuthenticated && !isAuthRoute) {
      router.replace("/");
    } else if (isAuthenticated && isAuthRoute) {
      router.replace("/home");
    }
  }, [token, isAuthLoading, isDemoMode, demoHydrated, segments, router]);

  // Hydrate cached subscription state immediately
  useEffect(() => {
    useSubscriptionStore.getState().hydrate();
  }, []);

  // Demo mode — hardcode Pro subscription
  useEffect(() => {
    if (!isDemoMode) return;
    useSubscriptionStore.setState({ entitlement: "pro", isActive: true });
  }, [isDemoMode]);

  // Load subscription when authenticated (real users only)
  useEffect(() => {
    if (!token || isDemoMode) return;
    useSubscriptionStore.getState().loadSubscription().catch(() => {});
  }, [token, isDemoMode]);

  // Keep a stable ref to router
  const routerRef = useRef(router);
  useEffect(() => { routerRef.current = router; });

  // Handle taps on delivered notifications
  useEffect(() => {
    if (!token) return;
    const sub = Notifications.addNotificationResponseReceivedListener((response) => {
      const { recipeId } = response.notification.request.content.data ?? {};
      if (recipeId) {
        routerRef.current.push(`/recipe/${recipeId}`);
      } else {
        routerRef.current.replace("/home");
      }
    });
    return () => sub.remove();
  }, [token]);

  // Reload subscription when app returns to foreground
  const appState = useRef(AppState.currentState);
  useEffect(() => {
    if (!token || isDemoMode) return;

    const sub = AppState.addEventListener("change", (nextState) => {
      if (appState.current.match(/inactive|background/) && nextState === "active") {
        useSubscriptionStore.getState().loadSubscription().catch(() => {});
      }
      appState.current = nextState;
    });

    return () => sub.remove();
  }, [token, isDemoMode]);

  return (
    <>
      <NotificationPermissionSheet />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "ios_from_right",
          gestureEnabled: true,
        }}
      >
        <Stack.Screen name="index" options={{ gestureEnabled: false, animation: "none" }} />
        <Stack.Screen name="home" options={{ gestureEnabled: false, animation: "fade", animationDuration: 100 }} />
        <Stack.Screen name="recipies" options={{ gestureEnabled: false, animation: "fade", animationDuration: 100 }} />
        <Stack.Screen name="pantry" options={{ gestureEnabled: false, animation: "fade", animationDuration: 100 }} />
        <Stack.Screen name="shopping" options={{ gestureEnabled: false, animation: "fade", animationDuration: 100 }} />
        <Stack.Screen name="mealPlan" options={{ animation: "ios_from_right" }} />
        <Stack.Screen name="shoppingList" options={{ animation: "ios_from_right" }} />
        <Stack.Screen name="recipe/[id]" options={{ animation: "ios_from_right" }} />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });
  const { arabicFontsLoaded, arabicFontsError } = useArabicFonts();
  const [langHydrated, setLangHydrated] = useState(false);

  // Load stored JWT on cold start
  useEffect(() => {
    useAuthStore.getState().load();
  }, []);

  // Hydrate language preference and apply RTL before first render
  useEffect(() => {
    useLanguageStore.getState().hydrate().then(() => {
      const { isRTL } = useLanguageStore.getState();
      if (I18nManager.isRTL !== isRTL) {
        I18nManager.allowRTL(isRTL);
        I18nManager.forceRTL(isRTL);
      }
      setLangHydrated(true);
    });
  }, []);

  const interReady = fontsLoaded || !!fontError;
  const arabicReady = arabicFontsLoaded || !!arabicFontsError;
  if (!interReady || !arabicReady || !langHydrated) {
    return null;
  }

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <UserSync />
        <AuthGate />
        <OfflineBanner />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

const missingKeyStyles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 40 },
  title: { fontSize: 18, fontWeight: "600", color: "#cc3b3b", marginBottom: 12 },
  message: { fontSize: 14, color: "#666", textAlign: "center" },
});
