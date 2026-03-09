import React, { useState, useCallback, useRef } from "react";
import { View, Text, StyleSheet, Image, Pressable, TextInput, ActivityIndicator } from "react-native";
import { sc } from "../../utils/deviceScale";
import ArrowLeftIcon from "../icons/ArrowLeftIcon";
import LinkIcon from "../icons/LinkIcon";
import SparkleBadgeIcon from "../icons/SparkleBadgeIcon";
import ExtractionProgress from "./ExtractionProgress";
import ImageCapture from "../ImageCapture";
import { useRouter } from "expo-router";
import { useExtractStore, useSubscriptionStore } from "../../store";
import SolbiteGateSheet from "../paywall/SolbiteGateSheet";
import { useTranslation } from "react-i18next";
import { useSeekerPayment } from "../../utils/useSeekerPayment";

const C = {
  bg: "#0E131D",
  surface: "#121722",
  surfaceStrong: "#1B202C",
  border: "rgba(255,255,255,0.06)",
  accent: "#B6FF00",
  accentText: "#0B0E14",
  text: "#F3F5F8",
  secondary: "#9AA0AE",
  muted: "#7A808F",
  divider: "rgba(255,255,255,0.08)",
  error: "#FF6B6B",
};

export default function AddRecipeSheetContent({ onPressBack }) {
  const router = useRouter();
  const { url, setUrl, startExtraction, startImageExtraction, reset, status, progress, error, isRunning, recipe } = useExtractStore();
  const [capturedImages, setCapturedImages] = useState([]);
  const [paywallVisible, setPaywallVisible] = useState(false);
  const { t } = useTranslation("recipe");
  const entitlement = useSubscriptionStore((s) => s.entitlement);
  const isPro = entitlement === "pro" || entitlement === "admin";
  const { payForExtraction, isPaying } = useSeekerPayment();
  const pendingExtraction = useRef(null);

  const handleBack = () => { setCapturedImages([]); reset(); onPressBack(); };
  const handleTryAnother = () => { setCapturedImages([]); reset(); };

  const runExtractFromPhotos = useCallback(async (txSignature) => {
    startImageExtraction({ images: capturedImages.map((img) => ({ base64: img.base64, mimeType: img.mimeType })), txSignature });
  }, [capturedImages, startImageExtraction]);

  const runExtractFromUrl = useCallback(async (txSignature) => {
    startExtraction({ txSignature });
  }, [startExtraction]);

  const withPaymentGate = useCallback(async (extractFn) => {
    pendingExtraction.current = extractFn;
    try {
      const txSig = await payForExtraction(isPro);
      pendingExtraction.current = null;
      extractFn(txSig);
    } catch {
      pendingExtraction.current = null;
    }
  }, [isPro, payForExtraction]);

  const handleExtractFromPhotos = useCallback(() => {
    if (capturedImages.length === 0) return;
    withPaymentGate(runExtractFromPhotos);
  }, [capturedImages, withPaymentGate, runExtractFromPhotos]);

  const BackButton = ({ label }) => (
    <Pressable onPress={handleBack} style={styles.backPill}>
      <ArrowLeftIcon width={9} height={8} color={C.secondary} />
      <Text style={styles.backText}>{label}</Text>
    </Pressable>
  );

  // Quota exceeded
  if (error === "QUOTA_EXCEEDED") {
    return (
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <BackButton label={t("add.back", "Back")} />
          <Text style={styles.headerTitle}>{t("add.title", "Add a recipe")}</Text>
          <View style={styles.headerSpacer} />
        </View>
        <View style={styles.quotaIconWrap}>
          <Text style={styles.quotaIcon}>🔒</Text>
        </View>
        <Text style={styles.quotaTitle}>{t("add.monthlyLimit", "Monthly limit reached")}</Text>
        <Text style={styles.quotaSubtitle}>{t("add.monthlyLimitSubtitle", "You've used all your free extractions this month.")}</Text>
        <Pressable style={styles.primaryButton} onPress={() => setPaywallVisible(true)}>
          <Text style={styles.primaryText}>{t("add.upgradePro", "Upgrade to Pro")}</Text>
        </Pressable>
        <Text style={styles.quotaHint}>{t("add.quotaHint", "No limits on extractions, pantry scans & more")}</Text>
        <Text style={styles.quotaReset}>{t("add.quotaReset", "Resets next month")}</Text>
        <SolbiteGateSheet visible={paywallVisible} onClose={() => setPaywallVisible(false)} featureName="extraction_limit" />
      </View>
    );
  }

  // Success
  if (recipe && status === "completed") {
    const totalTime = (recipe.prepTime || 0) + (recipe.cookTime || 0);
    const ingredientCount = recipe.ingredients?.length || 0;
    const instructionCount = recipe.instructions?.length || recipe.steps?.length || 0;
    return (
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <BackButton label={t("add.back", "Back")} />
          <Text style={styles.headerTitle}>{t("add.recipeReady", "Recipe ready!")}</Text>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.successIconWrap}>
          <Text style={styles.successIcon}>✓</Text>
        </View>
        <Text style={styles.recipeTitle}>{recipe.title}</Text>
        {recipe.description ? (
          <Text style={styles.recipeDescription} numberOfLines={3}>{recipe.description}</Text>
        ) : null}

        <View style={styles.metaRow}>
          {totalTime > 0 && <View style={styles.metaPill}><Text style={styles.metaPillText}>{totalTime} {t("add.min", "min")}</Text></View>}
          {recipe.servings ? <View style={styles.metaPill}><Text style={styles.metaPillText}>{recipe.servings} {t("add.servings", "servings")}</Text></View> : null}
          {recipe.difficulty ? <View style={styles.metaPill}><Text style={styles.metaPillText}>{recipe.difficulty}</Text></View> : null}
          {recipe.cuisine ? <View style={[styles.metaPill, styles.metaPillAccent]}><Text style={[styles.metaPillText, styles.metaPillTextAccent]}>{recipe.cuisine}</Text></View> : null}
        </View>

        <View style={styles.countsCard}>
          <View style={styles.countRow}>
            <Text style={styles.countLabel}>{t("add.ingredients", "Ingredients")}</Text>
            <Text style={styles.countValue}>{ingredientCount} {t("add.items", "items")}</Text>
          </View>
          <View style={styles.countDivider} />
          <View style={styles.countRow}>
            <Text style={styles.countLabel}>{t("add.instructions", "Instructions")}</Text>
            <Text style={styles.countValue}>{instructionCount} {t("add.steps", "steps")}</Text>
          </View>
        </View>

        {ingredientCount > 0 && (
          <View style={styles.ingredientPreview}>
            {recipe.ingredients.slice(0, 4).map((ing, idx) => (
              <View key={idx} style={styles.ingredientRow}>
                <View style={styles.ingredientDot} />
                <Text style={styles.ingredientText} numberOfLines={1}>
                  {ing.quantity && ing.unit ? `${ing.quantity} ${ing.unit} ` : ""}{ing.name}
                </Text>
              </View>
            ))}
            {ingredientCount > 4 && <Text style={styles.moreText}>+{ingredientCount - 4} {t("add.more", "more")}</Text>}
          </View>
        )}

        <Text style={styles.savedConfirmation}>{t("add.savedToBox", "✓ Saved to your recipe box")}</Text>
        <Pressable
          style={({ pressed }) => [styles.primaryButton, pressed && { opacity: 0.85 }]}
          onPress={() => { onPressBack(); router.push(`/recipe/${recipe.id}`); }}
        >
          <Text style={styles.primaryText}>{t("add.viewRecipe", "View Recipe")}</Text>
        </Pressable>
        <Pressable style={styles.secondaryButton} onPress={handleTryAnother}>
          <Text style={styles.secondaryText}>{t("add.addAnother", "Add another recipe")}</Text>
        </Pressable>
      </View>
    );
  }

  // Progress
  if (isRunning) {
    return (
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <BackButton label={t("add.cancel", "Cancel")} />
          <Text style={styles.headerTitle}>{t("add.cookingTitle", "Cooking it up")}</Text>
          <View style={styles.headerSpacer} />
        </View>
        <ExtractionProgress progress={progress} />
      </View>
    );
  }

  // Default: input form
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <BackButton label={t("add.back", "Back")} />
        <Text style={styles.headerTitle}>{t("add.title", "Add a recipe")}</Text>
        <View style={styles.headerSpacer} />
      </View>

      <Image source={require("../../assets/AddRecipie.png")} style={styles.heroImage} resizeMode="contain" />
      <Text style={styles.title}>{t("add.addNew", "Add a new recipe")}</Text>
      <Text style={styles.subtitle}>
        {t("add.subtitle", "Paste a link from YouTube or any recipe website and we'll do the rest")}
      </Text>

      <View style={styles.inputWrap}>
        <LinkIcon width={20} height={20} color={url ? C.accent : C.muted} />
        <TextInput
          placeholder={t("add.urlPlaceholder", "https://youtube.com/watch?v=...")}
          placeholderTextColor={C.muted}
          style={styles.input}
          value={url}
          onChangeText={(text) => { setUrl(text); if (error) useExtractStore.setState({ error: "" }); }}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="url"
        />
      </View>

      {isPaying && (
        <View style={styles.payingRow}>
          <ActivityIndicator size="small" color={C.accent} />
          <Text style={styles.payingText}>Confirm in wallet…</Text>
        </View>
      )}

      <Pressable
        style={[styles.primaryButton, (!url.trim() || isRunning || isPaying) && styles.primaryButtonDisabled]}
        onPress={() => withPaymentGate(runExtractFromUrl)}
        disabled={!url.trim() || isRunning || isPaying}
      >
        <SparkleBadgeIcon width={22} height={22} />
        <Text style={styles.primaryText}>{isPro ? t("add.grabRecipe", "Grab recipe") : `Grab recipe · ${isPaying ? "…" : "10 SKR"}`}</Text>
      </Pressable>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <View style={styles.dividerRow}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>{t("add.or", "Or")}</Text>
        <View style={styles.divider} />
      </View>

      <ImageCapture
        images={capturedImages}
        onImagesChange={setCapturedImages}
        maxImages={3}
        quality={0.6}
        disabled={isRunning}
        label={t("add.snapTitle", "Snap a cookbook")}
        sublabel={t("add.snapSubtitle", "Take a photo of any recipe page (up to 3)")}
      />

      {capturedImages.length > 0 && !isRunning && (
        <Pressable style={styles.primaryButton} onPress={handleExtractFromPhotos}>
          <SparkleBadgeIcon width={22} height={22} />
          <Text style={styles.primaryText}>{t("add.extractPhotos", { count: capturedImages.length })}</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingBottom: 20 },
  headerRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  backPill: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: C.surfaceStrong, borderWidth: 1, borderColor: C.border,
    borderRadius: 999, paddingHorizontal: 14, paddingVertical: 8,
  },
  backText: { marginStart: 8, fontSize: sc(12), color: C.secondary },
  headerTitle: { fontSize: sc(16), fontWeight: "600", color: C.text, letterSpacing: -0.2 },
  headerSpacer: { width: 56 },

  heroImage: { width: "100%", height: 130, marginTop: 44 },
  title: { marginTop: 10, fontSize: sc(26), fontWeight: "700", color: C.text, textAlign: "center", letterSpacing: -0.4 },
  subtitle: { marginTop: 8, fontSize: sc(14), color: C.muted, textAlign: "center", lineHeight: sc(20), paddingHorizontal: 20 },

  inputWrap: {
    marginTop: 16, flexDirection: "row", alignItems: "center",
    backgroundColor: C.surfaceStrong, borderWidth: 1, borderColor: C.border,
    borderRadius: 999, paddingHorizontal: 14, paddingVertical: 6,
  },
  input: { marginStart: 10, flex: 1, color: C.text, fontSize: sc(14) },

  primaryButton: {
    marginTop: 12, flexDirection: "row", alignItems: "center", justifyContent: "center",
    backgroundColor: C.accent, borderRadius: 999, paddingVertical: 14,
  },
  primaryButtonDisabled: { backgroundColor: C.surfaceStrong, opacity: 0.6 },
  primaryText: { marginStart: 8, fontSize: sc(15), fontWeight: "700", color: C.accentText, letterSpacing: -0.2 },

  secondaryButton: {
    marginTop: 10, borderRadius: 999, paddingVertical: 13, alignItems: "center",
    backgroundColor: C.surfaceStrong, borderWidth: 1, borderColor: C.border,
  },
  secondaryText: { fontSize: sc(14), fontWeight: "500", color: C.secondary },

  errorText: { marginTop: 8, fontSize: sc(12), color: C.error, textAlign: "center" },
  payingRow: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 10, marginBottom: 2 },
  payingText: { fontSize: sc(13), color: C.accent, fontWeight: "500" },

  dividerRow: { flexDirection: "row", alignItems: "center", marginVertical: 16 },
  divider: { flex: 1, height: 1, backgroundColor: C.divider },
  dividerText: { marginHorizontal: 10, fontSize: sc(12), color: C.muted },

  // Success
  successIconWrap: {
    alignSelf: "center", marginTop: 20, width: 56, height: 56, borderRadius: 28,
    backgroundColor: C.surfaceStrong, borderWidth: 1, borderColor: C.accent,
    alignItems: "center", justifyContent: "center", marginBottom: 12,
  },
  successIcon: { fontSize: 24, color: C.accent, fontWeight: "bold" },
  recipeTitle: { fontSize: sc(22), fontWeight: "600", color: C.text, textAlign: "center", letterSpacing: -0.3 },
  recipeDescription: { marginTop: 8, fontSize: sc(14), color: C.secondary, textAlign: "center", lineHeight: sc(20), paddingHorizontal: 10 },

  metaRow: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: 8, marginTop: 14 },
  metaPill: { backgroundColor: C.surfaceStrong, borderRadius: 999, paddingHorizontal: 12, paddingVertical: 5 },
  metaPillAccent: { backgroundColor: C.accent, opacity: 0.15 },
  metaPillText: { fontSize: sc(12), color: C.secondary },
  metaPillTextAccent: { color: C.accent },

  countsCard: { marginTop: 16, backgroundColor: C.surfaceStrong, borderRadius: 16, padding: 14 },
  countRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 6 },
  countDivider: { height: 1, backgroundColor: C.divider, marginVertical: 4 },
  countLabel: { fontSize: sc(14), color: C.muted },
  countValue: { fontSize: sc(14), fontWeight: "600", color: C.text },

  ingredientPreview: { marginTop: 12, backgroundColor: C.surfaceStrong, borderRadius: 16, padding: 14 },
  ingredientRow: { flexDirection: "row", alignItems: "center", paddingVertical: 5 },
  ingredientDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: C.accent, marginEnd: 10 },
  ingredientText: { fontSize: sc(14), color: C.text, flex: 1 },
  moreText: { marginTop: 6, fontSize: sc(13), color: C.muted, textAlign: "center" },

  savedConfirmation: { marginTop: 16, fontSize: sc(13), color: C.accent, textAlign: "center", fontWeight: "500" },

  // Quota
  quotaIconWrap: { alignSelf: "center", marginTop: 40, marginBottom: 16 },
  quotaIcon: { fontSize: 48 },
  quotaTitle: { fontSize: 22, fontWeight: "600", color: C.text, textAlign: "center", letterSpacing: -0.2 },
  quotaSubtitle: { marginTop: 8, fontSize: 14, color: C.secondary, textAlign: "center", lineHeight: 20, paddingHorizontal: 20 },
  quotaHint: { marginTop: 12, fontSize: 13, color: C.muted, textAlign: "center" },
  quotaReset: { marginTop: 24, fontSize: 12, color: C.muted, textAlign: "center" },
});
