import { authFetch } from "./api";

export async function getMe() {
  return authFetch("/users/me");
}

export async function updatePreferences({ preferredUnitSystem, preferredLanguage }) {
  const body = {};
  if (preferredUnitSystem !== undefined) body.preferredUnitSystem = preferredUnitSystem;
  if (preferredLanguage !== undefined) body.preferredLanguage = preferredLanguage;
  return authFetch("/users/me/preferences", {
    method: "PATCH",
    body: JSON.stringify(body),
  });
}

export async function deleteAccount() {
  return authFetch("/users/me", { method: "DELETE" });
}
