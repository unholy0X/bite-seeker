import { authFetch } from "./api";
import { useLanguageStore } from "../store/languageStore";

function getCurrentLanguage() {
  return useLanguageStore.getState().language || "en";
}

export async function extractRecipeFromUrl({ url, getToken, txSignature }) {
  return authFetch("/recipes/extract", {
    method: "POST",
    body: JSON.stringify({
      url,
      saveAuto: true,
      detailLevel: "detailed",
      language: getCurrentLanguage(),
      ...(txSignature ? { txSignature } : {}),
    }),
  });
}

export async function extractRecipeFromImage({ images, getToken, txSignature }) {
  const lang = getCurrentLanguage();
  const payload = {
    type: "image",
    images: images.map((img) => ({
      base64: img.base64,
      mimeType: img.mimeType || "image/jpeg",
    })),
    imageBase64: images[0]?.base64,
    mimeType: images[0]?.mimeType || "image/jpeg",
    saveAuto: true,
    detailLevel: "detailed",
    language: lang,
    ...(txSignature ? { txSignature } : {}),
  };
  return authFetch("/recipes/extract", {
    method: "POST",
    body: JSON.stringify(payload),
    timeout: 120000,
  });
}

export async function getJobStatus({ jobId, getToken }) {
  return authFetch(`/jobs/${jobId}`);
}

export async function getRecipe({ recipeId, getToken }) {
  return authFetch(`/recipes/${recipeId}`);
}

export function isTerminalStatus(status) {
  return (
    status === "completed" ||
    status === "failed" ||
    status === "cancelled"
  );
}
