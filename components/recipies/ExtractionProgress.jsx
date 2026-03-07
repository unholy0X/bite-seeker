import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Easing } from "react-native";
import { useTranslation } from "react-i18next";

const C = {
  bg: "#0E131D",
  surface: "#1B202C",
  border: "rgba(255,255,255,0.06)",
  accent: "#B6FF00",
  accentGlow: "rgba(182,255,0,0.20)",
  accentText: "#0B0E14",
  text: "#F3F5F8",
  muted: "#7A808F",
  divider: "rgba(255,255,255,0.08)",
};

function getActiveIndex(progress, steps) {
  let idx = 0;
  for (let i = steps.length - 1; i >= 0; i--) {
    if (progress >= steps[i].threshold) { idx = i; break; }
  }
  return idx;
}

function PulsingDot() {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(scale, { toValue: 2.2, duration: 900, easing: Easing.out(Easing.ease), useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 0, duration: 900, easing: Easing.out(Easing.ease), useNativeDriver: true }),
        ]),
        Animated.parallel([
          Animated.timing(scale, { toValue: 1, duration: 0, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 0.5, duration: 0, useNativeDriver: true }),
        ]),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, []);

  return (
    <Animated.View style={[styles.pulseRing, { transform: [{ scale }], opacity }]} />
  );
}

function StepRow({ label, state, isLast }) {
  const fadeAnim = useRef(new Animated.Value(state === "pending" ? 0.3 : 1)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: state === "pending" ? 0.3 : 1, duration: 400, useNativeDriver: true }).start();
  }, [state]);

  return (
    <Animated.View style={[styles.stepRow, { opacity: fadeAnim }]}>
      <View style={styles.stepIndicatorCol}>
        <View style={styles.dotWrap}>
          {state === "active" && <PulsingDot />}
          <View style={[styles.dot, state === "done" && styles.dotDone, state === "active" && styles.dotActive]}>
            {state === "done" && <Text style={styles.checkmark}>✓</Text>}
          </View>
        </View>
        {!isLast && <View style={[styles.line, state === "done" && styles.lineDone]} />}
      </View>
      <View style={styles.stepContent}>
        <Text style={[styles.stepLabel, state === "active" && styles.stepLabelActive, state === "done" && styles.stepLabelDone]}>
          {label}{state === "active" ? "…" : ""}
        </Text>
      </View>
    </Animated.View>
  );
}

export default function ExtractionProgress({ progress = 0 }) {
  const { t } = useTranslation("recipe");
  const STEPS = [
    { label: t("extraction.step1"), threshold: 0 },
    { label: t("extraction.step2"), threshold: 15 },
    { label: t("extraction.step3"), threshold: 30 },
    { label: t("extraction.step4"), threshold: 50 },
    { label: t("extraction.step5"), threshold: 70 },
    { label: t("extraction.step6"), threshold: 90 },
  ];

  const activeIndex = getActiveIndex(progress, STEPS);
  const barWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(barWidth, { toValue: Math.min(progress, 100), duration: 500, easing: Easing.out(Easing.ease), useNativeDriver: false }).start();
  }, [progress]);

  return (
    <View style={styles.container}>
      <View style={styles.heroWrap}>
        <Text style={styles.heroEmoji}>{activeIndex < 3 ? "👨‍🍳" : "🍳"}</Text>
      </View>
      <Text style={styles.title}>{t("extraction.title")}</Text>
      <Text style={styles.subtitle}>{t("extraction.subtitle")}</Text>

      <View style={styles.progressBarTrack}>
        <Animated.View
          style={[styles.progressBarFill, { width: barWidth.interpolate({ inputRange: [0, 100], outputRange: ["0%", "100%"] }) }]}
        />
      </View>

      <View style={styles.timeline}>
        {STEPS.map((step, i) => {
          let state = "pending";
          if (i < activeIndex) state = "done";
          else if (i === activeIndex) state = "active";
          return <StepRow key={i} label={step.label} state={state} isLast={i === STEPS.length - 1} />;
        })}
      </View>
    </View>
  );
}

const DOT_SIZE = 24;
const LINE_WIDTH = 2;

const styles = StyleSheet.create({
  container: { alignItems: "center", paddingTop: 10 },
  heroWrap: { width: 72, height: 72, borderRadius: 36, backgroundColor: C.surface, borderWidth: 1, borderColor: C.border, alignItems: "center", justifyContent: "center", marginBottom: 16 },
  heroEmoji: { fontSize: 34 },
  title: { fontSize: 22, fontWeight: "600", color: C.text, letterSpacing: -0.3 },
  subtitle: { marginTop: 6, fontSize: 14, color: C.muted, letterSpacing: -0.05 },
  progressBarTrack: { width: "100%", height: 4, backgroundColor: C.surface, borderRadius: 2, marginTop: 24, marginBottom: 28, overflow: "hidden" },
  progressBarFill: { height: "100%", backgroundColor: C.accent, borderRadius: 2 },
  timeline: { alignSelf: "stretch" },
  stepRow: { flexDirection: "row", minHeight: 48 },
  stepIndicatorCol: { width: DOT_SIZE, alignItems: "center" },
  dotWrap: { width: DOT_SIZE, height: DOT_SIZE, alignItems: "center", justifyContent: "center" },
  dot: { width: DOT_SIZE, height: DOT_SIZE, borderRadius: DOT_SIZE / 2, backgroundColor: C.surface, alignItems: "center", justifyContent: "center" },
  dotActive: { backgroundColor: C.accent },
  dotDone: { backgroundColor: C.accentGlow, borderWidth: 1, borderColor: C.accent },
  pulseRing: { position: "absolute", width: DOT_SIZE, height: DOT_SIZE, borderRadius: DOT_SIZE / 2, backgroundColor: C.accentGlow },
  checkmark: { fontSize: 13, fontWeight: "bold", color: C.accent, marginTop: -1 },
  line: { flex: 1, width: LINE_WIDTH, backgroundColor: C.divider, minHeight: 24 },
  lineDone: { backgroundColor: C.accent, opacity: 0.4 },
  stepContent: { flex: 1, marginLeft: 14, justifyContent: "center", paddingBottom: 24 },
  stepLabel: { fontSize: 15, color: C.muted, letterSpacing: -0.1 },
  stepLabelActive: { color: C.text, fontWeight: "600" },
  stepLabelDone: { color: C.accent, fontWeight: "500" },
});
