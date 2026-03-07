import { apiFetch, authFetch } from "./api";
import { useLanguageStore } from "../store/languageStore";

function getCurrentLanguage() {
  return useLanguageStore.getState().language || "en";
}

export async function fetchRecipes({ getToken, limit = 20, offset = 0 }) {
  const params = new URLSearchParams({ limit: String(limit), offset: String(offset) });
  return authFetch(`/recipes?${params}`);
}

export async function fetchRecipeById({ recipeId, getToken }) {
  return authFetch(`/recipes/${recipeId}`);
}

export async function deleteRecipe({ recipeId, getToken }) {
  return authFetch(`/recipes/${recipeId}`, { method: "DELETE" });
}

export async function deleteAllRecipes({ getToken }) {
  return authFetch("/recipes", { method: "DELETE" });
}

export async function fetchSuggested({ limit = 10, offset = 0 } = {}) {
  const params = new URLSearchParams({ limit: String(limit), offset: String(offset), lang: getCurrentLanguage() });
  return apiFetch(`/recipes/suggested?${params}`, {});
}

export async function fetchFeatured({ limit = 30, offset = 0 } = {}) {
  const params = new URLSearchParams({ limit: String(limit), offset: String(offset), lang: getCurrentLanguage() });
  return apiFetch(`/recipes/featured?${params}`, {});
}

export async function cloneRecipe({ recipeId, getToken }) {
  return authFetch(`/recipes/${recipeId}/save`, { method: "POST" });
}

export async function searchRecipes({ getToken, query, limit = 10 }) {
  const params = new URLSearchParams({ q: query, limit: String(limit) });
  return authFetch(`/recipes/search?${params}`);
}

export async function searchPublicRecipes({ query, limit = 15 }) {
  const params = new URLSearchParams({ q: query, limit: String(limit), lang: getCurrentLanguage() });
  return apiFetch(`/recipes/search/public?${params}`, {});
}

export async function toggleFavorite({ recipeId, isFavorite, getToken }) {
  return authFetch(`/recipes/${recipeId}/favorite`, {
    method: "POST",
    body: JSON.stringify({ isFavorite }),
  });
}

export async function exportToKitchen({ recipeId, getToken, force = false }) {
  const path = force
    ? `/recipes/${recipeId}/export/thermomix?force=true`
    : `/recipes/${recipeId}/export/thermomix`;
  return authFetch(path, { method: "POST", timeout: 90000 });
}

export async function fetchRecommendations({ getToken, filter, limit = 20 }) {
  const params = new URLSearchParams({ limit: String(limit), minMatch: "0" });
  if (filter === "high-protein") {
    params.set("minProtein", "20");
    params.set("mood", "healthy");
  } else if (filter === "quick-meals") {
    params.set("maxTime", "30");
    params.set("mood", "quick");
  }
  return authFetch(`/recommendations?${params}`);
}
