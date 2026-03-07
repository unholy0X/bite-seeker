import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import i18n from "../i18n";

// Show alerts even when app is foregrounded (like WhatsApp)
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

/**
 * Ask the user for notification permission once.
 * Called after sign-in. Safe to call multiple times — only prompts once.
 * Returns true if granted.
 */
export async function requestNotificationPermission() {
  // Skip in Expo Go: permission prompts are non-persistent and push-token
  // registration is meaningless there. Production builds (standalone/bare)
  // proceed normally. Constants.appOwnership is deprecated since SDK 50.
  if (Constants.executionEnvironment === "storeClient") return false;
  try {
    const { status: existing } = await Notifications.getPermissionsAsync();
    if (existing === "granted") return true;
    const { status } = await Notifications.requestPermissionsAsync();
    return status === "granted";
  } catch {
    return false;
  }
}

/**
 * Fire an immediate local notification when a job completes.
 * Silent fail — never block the UI on notification errors.
 */
export async function scheduleJobCompleteNotification({ job, recipeName }) {
  if (Constants.executionEnvironment === "storeClient") return; // Expo Go
  if (!job) return;
  try {
    const isKitchen = job.jobType === "thermomix_export";
    const title = isKitchen
      ? i18n.t("common:notif.push.kitchenReadyTitle")
      : i18n.t("common:notif.push.recipeSavedTitle");
    const body = recipeName
      ? i18n.t(isKitchen ? "common:notif.push.kitchenReadyBody" : "common:notif.push.recipeSavedBody", { name: recipeName })
      : i18n.t(isKitchen ? "common:notif.push.kitchenReadyBodyFallback" : "common:notif.push.recipeSavedBodyFallback");

    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data: {
          jobId: job.id ?? job.jobId,
          recipeId: job.recipeId ?? job.recipe?.id ?? null,
          jobType: job.jobType ?? null,
        },
      },
      trigger: null, // fire immediately
    });
  } catch {
    // silent
  }
}

/**
 * Fire an immediate local notification when a job fails.
 */
export async function scheduleJobFailedNotification({ job, recipeName }) {
  if (Constants.executionEnvironment === "storeClient") return; // Expo Go
  if (!job) return;
  try {
    const isKitchen = job.jobType === "thermomix_export";
    const title = isKitchen
      ? i18n.t("common:notif.push.kitchenFailedTitle")
      : i18n.t("common:notif.push.recipeFailedTitle");
    const body = recipeName
      ? i18n.t(isKitchen ? "common:notif.push.kitchenFailedBody" : "common:notif.push.recipeFailedBody", { name: recipeName })
      : i18n.t(isKitchen ? "common:notif.push.kitchenFailedBodyFallback" : "common:notif.push.recipeFailedBodyFallback");

    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data: {
          jobId: job.id ?? job.jobId,
          recipeId: job.recipeId ?? job.recipe?.id ?? null,
          jobType: job.jobType ?? null,
        },
      },
      trigger: null,
    });
  } catch {
    // silent
  }
}
