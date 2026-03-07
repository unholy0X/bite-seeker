import { authFetch } from "./api";

export async function fetchCurrentPlan({ getToken }) {
  return authFetch("/meal-plans/current");
}

export async function fetchPlanByWeek({ getToken, date }) {
  return authFetch(`/meal-plans/week/${date}`);
}

export async function updatePlanTitle({ getToken, planId, title }) {
  return authFetch(`/meal-plans/${planId}`, {
    method: "PUT",
    body: JSON.stringify({ title }),
  });
}

export async function addPlanEntry({ getToken, planId, recipeId, dayIndex, mealType }) {
  return authFetch(`/meal-plans/${planId}/entries`, {
    method: "POST",
    body: JSON.stringify({ recipeId, dayIndex, mealType }),
  });
}

export async function removePlanEntry({ getToken, planId, entryId }) {
  return authFetch(`/meal-plans/${planId}/entries/${entryId}`, {
    method: "DELETE",
  });
}

export async function generateShoppingList({ getToken, planId, name }) {
  return authFetch(`/meal-plans/${planId}/generate-list`, {
    method: "POST",
    body: name ? JSON.stringify({ name }) : undefined,
  });
}
