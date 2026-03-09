import React, { useRef, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  Dimensions,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Svg, { Path, Circle, Rect, Line, Polyline, G } from "react-native-svg";
import { useBiteSeekerAuth } from "../utils/useBiteSeekerAuth";
import { colors, radii, spacing } from "@/src/theme/tokens";

const { width: SCREEN_W } = Dimensions.get("window");
export const ONBOARDING_KEY = "onboarding_done";

// ─── Illustrations ────────────────────────────────────────────────────────────

function IllustrationExtract() {
  return (
    <Svg width={120} height={120} viewBox="0 0 120 120" fill="none">
      {/* Glow circle */}
      <Circle cx="60" cy="60" r="52" fill="rgba(182,255,0,0.08)" />
      <Circle cx="60" cy="60" r="38" fill="rgba(182,255,0,0.06)" />
      {/* Browser frame */}
      <Rect x="22" y="34" width="76" height="52" rx="8" fill="#1B202C" stroke="rgba(182,255,0,0.35)" strokeWidth="1.5" />
      <Rect x="22" y="34" width="76" height="14" rx="8" fill="#242C3D" />
      {/* Browser dots */}
      <Circle cx="33" cy="41" r="2.5" fill="rgba(255,255,255,0.25)" />
      <Circle cx="42" cy="41" r="2.5" fill="rgba(255,255,255,0.25)" />
      <Circle cx="51" cy="41" r="2.5" fill="rgba(255,255,255,0.25)" />
      {/* URL bar */}
      <Rect x="57" y="37" width="35" height="8" rx="4" fill="rgba(182,255,0,0.12)" />
      {/* Content lines */}
      <Rect x="30" y="55" width="60" height="4" rx="2" fill="rgba(255,255,255,0.12)" />
      <Rect x="30" y="64" width="44" height="4" rx="2" fill="rgba(255,255,255,0.08)" />
      <Rect x="30" y="73" width="52" height="4" rx="2" fill="rgba(255,255,255,0.06)" />
      {/* Arrow down accent */}
      <Circle cx="88" cy="82" r="10" fill="#B6FF00" />
      <Path d="M88 77v10M84 83l4 4 4-4" stroke="#0B0E14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function IllustrationPantry() {
  return (
    <Svg width={120} height={120} viewBox="0 0 120 120" fill="none">
      <Circle cx="60" cy="60" r="52" fill="rgba(182,255,0,0.08)" />
      {/* Shelf unit */}
      <Rect x="24" y="28" width="72" height="68" rx="8" fill="#1B202C" stroke="rgba(182,255,0,0.25)" strokeWidth="1.5" />
      {/* Shelves */}
      <Rect x="24" y="52" width="72" height="2" rx="1" fill="rgba(255,255,255,0.1)" />
      <Rect x="24" y="74" width="72" height="2" rx="1" fill="rgba(255,255,255,0.1)" />
      {/* Top shelf items */}
      <Rect x="33" y="37" width="12" height="14" rx="4" fill="#B6FF00" opacity="0.8" />
      <Rect x="50" y="40" width="10" height="11" rx="3" fill="rgba(182,255,0,0.4)" />
      <Rect x="65" y="36" width="8" height="15" rx="3" fill="rgba(182,255,0,0.55)" />
      <Rect x="77" y="39" width="11" height="12" rx="3" fill="rgba(182,255,0,0.3)" />
      {/* Mid shelf items */}
      <Circle cx="37" cy="65" r="7" fill="rgba(182,255,0,0.45)" />
      <Rect x="48" y="58" width="10" height="14" rx="3" fill="rgba(182,255,0,0.3)" />
      <Circle cx="68" cy="64" r="6" fill="rgba(182,255,0,0.6)" />
      <Rect x="77" y="59" width="13" height="13" rx="3" fill="rgba(182,255,0,0.25)" />
      {/* Bottom — checkmark badge */}
      <Circle cx="42" cy="85" r="8" fill="#B6FF00" />
      <Path d="M38 85l3 3 6-6" stroke="#0B0E14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Cart icon */}
      <Path d="M58 81h18l-3 8H61l-3-8z" fill="rgba(182,255,0,0.2)" stroke="rgba(182,255,0,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <Circle cx="63" cy="91" r="1.5" fill="rgba(182,255,0,0.7)" />
      <Circle cx="73" cy="91" r="1.5" fill="rgba(182,255,0,0.7)" />
    </Svg>
  );
}

function IllustrationSKR() {
  return (
    <Svg width={120} height={120} viewBox="0 0 120 120" fill="none">
      {/* Outer glow rings */}
      <Circle cx="60" cy="60" r="52" fill="rgba(182,255,0,0.06)" />
      <Circle cx="60" cy="60" r="40" fill="rgba(182,255,0,0.09)" />
      <Circle cx="60" cy="60" r="28" fill="rgba(182,255,0,0.12)" />
      {/* Wallet card */}
      <Rect x="26" y="38" width="68" height="44" rx="10" fill="#1B202C" stroke="rgba(182,255,0,0.4)" strokeWidth="1.5" />
      <Rect x="26" y="38" width="68" height="16" rx="10" fill="#242C3D" />
      {/* Card chip */}
      <Rect x="34" y="44" width="14" height="10" rx="3" fill="rgba(182,255,0,0.35)" />
      {/* Balance label */}
      <Rect x="36" y="62" width="24" height="4" rx="2" fill="rgba(255,255,255,0.12)" />
      <Rect x="36" y="70" width="34" height="5" rx="2.5" fill="#B6FF00" opacity="0.85" />
      {/* Zap icon top-right */}
      <Circle cx="86" cy="44" r="10" fill="#B6FF00" />
      <Path d="M89 39l-5 7h4l-4 7" stroke="#0B0E14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function IllustrationWelcome() {
  return (
    <Svg width={120} height={120} viewBox="0 0 120 120" fill="none">
      <Circle cx="60" cy="60" r="52" fill="rgba(182,255,0,0.07)" />
      <Circle cx="60" cy="60" r="38" fill="rgba(182,255,0,0.05)" />
      {/* Plate */}
      <Circle cx="60" cy="62" r="28" fill="#1B202C" stroke="rgba(182,255,0,0.3)" strokeWidth="1.5" />
      <Circle cx="60" cy="62" r="21" fill="#242C3D" />
      {/* Fork */}
      <Path d="M47 42v10M47 52c0 3 3 4 3 8v8" stroke="#B6FF00" strokeWidth="2" strokeLinecap="round" />
      <Path d="M44 42v6M50 42v6" stroke="rgba(182,255,0,0.5)" strokeWidth="1.5" strokeLinecap="round" />
      {/* Knife */}
      <Path d="M73 42c0 0 3 3 3 8v10" stroke="#B6FF00" strokeWidth="2" strokeLinecap="round" />
      <Path d="M73 42c3 0 5 3 5 6" stroke="rgba(182,255,0,0.5)" strokeWidth="1.5" strokeLinecap="round" />
      {/* Food on plate */}
      <Circle cx="60" cy="62" r="10" fill="rgba(182,255,0,0.15)" />
      <Circle cx="57" cy="60" r="4" fill="rgba(182,255,0,0.4)" />
      <Circle cx="63" cy="65" r="3" fill="rgba(182,255,0,0.3)" />
      <Circle cx="62" cy="58" r="2.5" fill="rgba(182,255,0,0.5)" />
      {/* Stars */}
      <Circle cx="88" cy="36" r="2" fill="#B6FF00" opacity="0.7" />
      <Circle cx="32" cy="42" r="1.5" fill="#B6FF00" opacity="0.5" />
      <Circle cx="90" cy="80" r="1.5" fill="#B6FF00" opacity="0.4" />
    </Svg>
  );
}

// ─── Slide data ───────────────────────────────────────────────────────────────

const SLIDES = [
  {
    key: "welcome",
    Illustration: IllustrationWelcome,
    tag: "WELCOME",
    title: "Every recipe,\neverywhere.",
    subtitle:
      "Bite Seeker turns any URL, YouTube video, or cookbook photo into a structured recipe — instantly.",
  },
  {
    key: "extract",
    Illustration: IllustrationExtract,
    tag: "EXTRACT",
    title: "Grab any recipe\nin seconds.",
    subtitle:
      "Paste a link, snap a cookbook page, or share from YouTube. AI parses the full recipe for you.",
  },
  {
    key: "pantry",
    Illustration: IllustrationPantry,
    tag: "PLAN",
    title: "Pantry. Meal plan.\nShopping list.",
    subtitle:
      "Track what you have, discover what you can cook, and auto-generate your grocery list in one tap.",
  },
  {
    key: "skr",
    Illustration: IllustrationSKR,
    tag: "POWERED BY SKR",
    title: "Your wallet is your\nsubscription.",
    subtitle:
      "Pay 10 SKR per extraction. Hold 1,000 SKR and get unlimited free extractions — forever. No billing. No middleman.",
    isFinal: true,
  },
];

// ─── Dot indicator ────────────────────────────────────────────────────────────

function Dots({ count, active }) {
  return (
    <View style={styles.dots}>
      {Array.from({ length: count }).map((_, i) => (
        <View
          key={i}
          style={[
            styles.dot,
            i === active ? styles.dotActive : styles.dotInactive,
          ]}
        />
      ))}
    </View>
  );
}

// ─── Single slide ─────────────────────────────────────────────────────────────

function Slide({ item }) {
  const { Illustration } = item;
  return (
    <View style={styles.slide}>
      <View style={styles.illustrationWrap}>
        <Illustration />
      </View>

      <View style={styles.textBlock}>
        <View style={styles.tagPill}>
          <Text style={styles.tagText}>{item.tag}</Text>
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
      </View>
    </View>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function OnboardingScreen() {
  const router = useRouter();
  const flatListRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { signIn, isSigningIn } = useBiteSeekerAuth();
  const [authError, setAuthError] = useState("");

  const markDone = useCallback(async () => {
    await AsyncStorage.setItem(ONBOARDING_KEY, "1");
  }, []);

  const handleSkip = useCallback(async () => {
    await markDone();
    router.replace("/");
  }, [markDone, router]);

  const handleNext = useCallback(() => {
    const next = activeIndex + 1;
    if (next < SLIDES.length) {
      flatListRef.current?.scrollToIndex({ index: next, animated: true });
      setActiveIndex(next);
    }
  }, [activeIndex]);

  const handleConnect = useCallback(async () => {
    setAuthError("");
    await markDone();
    try {
      await signIn();
    } catch (err) {
      const msg = err?.message ?? "";
      const cancelled =
        msg.includes("cancelled") ||
        msg.includes("canceled") ||
        msg.includes("User rejected") ||
        msg.includes("declined") ||
        msg.includes("dismissed") ||
        err?.name === "UserDeclinedAuthorizationError";
      if (!cancelled) {
        setAuthError(msg || "Wallet connection failed. Try again.");
      }
    }
  }, [markDone, signIn]);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index ?? 0);
    }
  }).current;

  const isFinal = activeIndex === SLIDES.length - 1;

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />

      {/* Skip button */}
      {!isFinal && (
        <SafeAreaView style={styles.skipArea} edges={["top"]}>
          <Pressable onPress={handleSkip} hitSlop={12} style={styles.skipBtn}>
            <Text style={styles.skipText}>Skip</Text>
          </Pressable>
        </SafeAreaView>
      )}

      {/* Slides */}
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => <Slide item={item} />}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        scrollEventThrottle={16}
        style={styles.list}
      />

      {/* Bottom controls */}
      <SafeAreaView edges={["bottom"]} style={styles.bottomArea}>
        <Dots count={SLIDES.length} active={activeIndex} />

        {authError ? (
          <View style={styles.errorRow}>
            <Text style={styles.errorText}>{authError}</Text>
          </View>
        ) : null}

        {isFinal ? (
          <Pressable
            onPress={handleConnect}
            disabled={isSigningIn}
            style={({ pressed }) => [
              styles.ctaBtn,
              pressed && styles.ctaBtnPressed,
              isSigningIn && styles.ctaBtnDisabled,
            ]}
          >
            {isSigningIn ? (
              <ActivityIndicator color={colors.accentText} size="small" />
            ) : (
              <Text style={styles.ctaBtnText}>Connect Wallet</Text>
            )}
          </Pressable>
        ) : (
          <Pressable
            onPress={handleNext}
            style={({ pressed }) => [styles.nextBtn, pressed && styles.nextBtnPressed]}
          >
            <Text style={styles.nextBtnText}>Next</Text>
          </Pressable>
        )}

        {isFinal && (
          <Pressable onPress={handleSkip} hitSlop={10} style={styles.laterBtn}>
            <Text style={styles.laterText}>I'll connect later</Text>
          </Pressable>
        )}
      </SafeAreaView>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  skipArea: {
    position: "absolute",
    top: 0,
    right: spacing.lg,
    zIndex: 10,
  },
  skipBtn: {
    paddingVertical: spacing.sm,
    paddingHorizontal: 4,
  },
  skipText: {
    color: colors.textMuted,
    fontSize: 15,
    fontWeight: "500",
  },

  list: {
    flex: 1,
  },
  slide: {
    width: SCREEN_W,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.xl,
    paddingTop: 80,
    paddingBottom: spacing.xl,
  },
  illustrationWrap: {
    width: 180,
    height: 180,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.xl,
    backgroundColor: "rgba(182,255,0,0.04)",
    borderRadius: 90,
    borderWidth: 1,
    borderColor: "rgba(182,255,0,0.1)",
  },
  textBlock: {
    alignItems: "center",
    gap: spacing.sm,
  },
  tagPill: {
    backgroundColor: "rgba(182,255,0,0.12)",
    borderRadius: radii.full,
    paddingHorizontal: spacing.md,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "rgba(182,255,0,0.2)",
    marginBottom: spacing.xs,
  },
  tagText: {
    color: colors.accent,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.2,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 30,
    fontWeight: "800",
    textAlign: "center",
    letterSpacing: -0.8,
    lineHeight: 36,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 15,
    fontWeight: "400",
    textAlign: "center",
    lineHeight: 23,
    marginTop: spacing.xs,
    maxWidth: 300,
  },

  bottomArea: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    alignItems: "center",
    gap: spacing.md,
  },
  dots: {
    flexDirection: "row",
    gap: 7,
    marginBottom: spacing.xs,
  },
  dot: {
    height: 6,
    borderRadius: 3,
  },
  dotActive: {
    width: 24,
    backgroundColor: colors.accent,
  },
  dotInactive: {
    width: 6,
    backgroundColor: "rgba(255,255,255,0.2)",
  },

  errorRow: {
    backgroundColor: "rgba(255,107,107,0.12)",
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  errorText: {
    color: "#FF6B6B",
    fontSize: 13,
    textAlign: "center",
  },

  ctaBtn: {
    width: "100%",
    backgroundColor: colors.accent,
    borderRadius: radii.full,
    height: 54,
    alignItems: "center",
    justifyContent: "center",
  },
  ctaBtnPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  ctaBtnDisabled: {
    opacity: 0.6,
  },
  ctaBtnText: {
    color: colors.accentText,
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: -0.2,
  },

  nextBtn: {
    width: "100%",
    backgroundColor: colors.surface,
    borderRadius: radii.full,
    height: 54,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  nextBtnPressed: {
    opacity: 0.75,
  },
  nextBtnText: {
    color: colors.textPrimary,
    fontSize: 17,
    fontWeight: "600",
  },

  laterBtn: {
    paddingVertical: spacing.xs,
  },
  laterText: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: "500",
  },
});
