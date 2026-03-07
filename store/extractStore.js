import { create } from "zustand";
import { extractRecipeFromUrl, extractRecipeFromImage, getJobStatus, getRecipe, isTerminalStatus } from "../services/extract";
import { useJobsStore } from "./jobsStore";
import i18n from "../i18n";

const MAX_POLL_TIME = 300000; // 5 minutes
const INITIAL_POLL_INTERVAL = 1000; // 1 second
const MAX_POLL_INTERVAL = 5000; // 5 seconds
const MAX_POLL_RETRIES = 3; // retries per poll failure

// Cancellation token — incremented on each new extraction or reset
let currentExtractionId = 0;

function friendlyError(raw) {
  const msg = (raw || "").toLowerCase();
  if (msg.includes("network request failed") || msg.includes("failed to fetch"))
    return i18n.t("errors:extract.noInternet");
  if (msg.includes("quota_exceeded") || msg.includes("monthly extraction limit") || msg.includes("monthly scan limit"))
    return "QUOTA_EXCEEDED";
  if (msg.includes("download") || msg.includes("yt-dlp") || msg.includes("ytdl"))
    return i18n.t("errors:extract.videoDownload");
  if (msg.includes("instagram"))
    return i18n.t("errors:extract.instagram");
  if (msg.includes("tiktok"))
    return i18n.t("errors:extract.tiktok");
  if (msg.includes("timeout") || msg.includes("timed out"))
    return i18n.t("errors:extract.timeout");
  if (msg.includes("rate") || msg.includes("limit") || msg.includes("429"))
    return i18n.t("errors:extract.rateLimit");
  if (msg.includes("not found") || msg.includes("404"))
    return i18n.t("errors:extract.notFound");
  if (msg.includes("no recipe") || msg.includes("couldn't extract") || msg.includes("could not extract"))
    return i18n.t("errors:extract.noRecipe");
  if (raw && raw.length > 120)
    return i18n.t("errors:extract.longError");
  return raw || i18n.t("errors:generic");
}

const initialState = {
  url: "",
  jobId: null,
  status: null,
  progress: 0,
  message: "",
  error: "",
  recipe: null,
  isRunning: false,
};

async function pollJob({ jobId, getToken, set, extractionId }) {
  const startTime = Date.now();
  let consecutiveFailures = 0;
  let pollCount = 0;

  while (Date.now() - startTime < MAX_POLL_TIME) {
    // Check cancellation before each poll
    if (extractionId !== currentExtractionId) return;

    // Progressive backoff: 1s for first 10 polls, then ramp up to 5s
    const interval = pollCount < 10
      ? INITIAL_POLL_INTERVAL
      : Math.min(INITIAL_POLL_INTERVAL + (pollCount - 10) * 500, MAX_POLL_INTERVAL);
    await new Promise((r) => setTimeout(r, interval));
    pollCount++;

    // Check cancellation after sleep
    if (extractionId !== currentExtractionId) return;

    let jobStatus;
    try {
      jobStatus = await getJobStatus({ jobId, getToken });
      consecutiveFailures = 0;
    } catch (err) {
      consecutiveFailures++;
      if (consecutiveFailures >= MAX_POLL_RETRIES) {
        set({
          error: i18n.t("errors:extract.connectionLost"),
          isRunning: false,
        });
        return;
      }
      // Wait a bit longer before retrying
      await new Promise((r) => setTimeout(r, MAX_POLL_INTERVAL));
      continue;
    }

    if (extractionId !== currentExtractionId) return;

    const nextStatus = jobStatus.status;
    const nextMessage = jobStatus.message || "Working on it…";
    const nextProgress = typeof jobStatus.progress === "number" ? jobStatus.progress : 0;

    set({
      status: nextStatus,
      message: nextMessage,
      progress: nextProgress,
    });

    if (isTerminalStatus(nextStatus)) {
      if (nextStatus === "completed") {
        let recipe = jobStatus.recipe || null;
        if (!recipe && jobStatus.recipeId) {
          try {
            recipe = await getRecipe({ recipeId: jobStatus.recipeId, getToken });
          } catch {
            // Fall through to "couldn't find" error below
          }
        }
        if (extractionId !== currentExtractionId) return;
        if (recipe) {
          set({ recipe, isRunning: false });
        } else {
          set({ error: i18n.t("errors:extract.recipeNotFound"), isRunning: false });
        }
      } else {
        const rawMsg = jobStatus?.error?.message || jobStatus.message || "";
        const errMsg = friendlyError(rawMsg);
        set({ error: errMsg, isRunning: false });
      }
      return;
    }
  }

  if (extractionId !== currentExtractionId) return;
  set({
    error: i18n.t("errors:extract.tooLong"),
    isRunning: false,
  });
}

export const useExtractStore = create((set, get) => ({
  ...initialState,
  setUrl: (url) => set({ url }),
  reset: () => {
    currentExtractionId++; // Cancel any running poll loop
    set({ ...initialState });
  },

  startExtraction: async ({ getToken, txSignature } = {}) => {
    const url = get().url.trim();
    if (!url) {
      set({ error: i18n.t("errors:extract.pasteLink") });
      return;
    }

    currentExtractionId++; // Cancel any previous poll
    const extractionId = currentExtractionId;

    set({
      isRunning: true,
      error: "",
      message: i18n.t("errors:extract.gettingReady"),
      status: "pending",
      progress: 0,
      recipe: null,
    });

    try {
      const job = await extractRecipeFromUrl({ url, getToken, txSignature });
      if (extractionId !== currentExtractionId) return;
      const jobId = job.jobId || job.jobID || job.id;

      if (!jobId) {
        throw new Error("Something went wrong. Please try again.");
      }

      set({ jobId, status: job.status || "pending", message: job.message || "On it!" });
      useJobsStore.getState().addActiveJob({ id: jobId, status: "pending", jobType: "url_extraction" });
      await pollJob({ jobId, getToken, set, extractionId });
    } catch (err) {
      if (extractionId !== currentExtractionId) return;
      set({
        error: friendlyError(err?.message),
        isRunning: false,
      });
    }
  },

  startImageExtraction: async ({ images, getToken, txSignature } = {}) => {
    if (!images || images.length === 0) {
      set({ error: i18n.t("errors:extract.noPhoto") });
      return;
    }

    currentExtractionId++; // Cancel any previous poll
    const extractionId = currentExtractionId;

    set({
      isRunning: true,
      error: "",
      message: i18n.t("errors:extract.readingRecipe"),
      status: "pending",
      progress: 0,
      recipe: null,
    });

    try {
      const job = await extractRecipeFromImage({ images, getToken, txSignature });
      if (extractionId !== currentExtractionId) return;
      const jobId = job.jobId || job.jobID || job.id;

      if (!jobId) {
        throw new Error("Something went wrong. Please try again.");
      }

      set({ jobId, status: job.status || "pending", message: job.message || "On it!" });
      useJobsStore.getState().addActiveJob({ id: jobId, status: "pending", jobType: "image_extraction" });
      await pollJob({ jobId, getToken, set, extractionId });
    } catch (err) {
      if (extractionId !== currentExtractionId) return;
      set({
        error: friendlyError(err?.message),
        isRunning: false,
      });
    }
  },
}));
