import { useDemoStore } from "../store/demoStore";
import i18n from "../i18n";

const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL || "http://207.180.202.57:8080/api/v1";

const DEFAULT_TIMEOUT = 30000; // 30 seconds

export async function apiFetch(path, { token, timeout = DEFAULT_TIMEOUT, ...options } = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {}),
      },
    });

    if (!res.ok) {
      if (res.status === 401) {
        throw new Error(i18n.t("errors:session"));
      }

      let message = `Request failed (${res.status})`;
      try {
        const body = await res.json();
        message = body?.error?.message || body?.message || message;
      } catch {
        // ignore JSON parse errors
      }
      throw new Error(message);
    }

    if (res.status === 204) return undefined;
    return res.json();
  } catch (err) {
    if (err.name === "AbortError") {
      throw new Error(i18n.t("errors:connection"));
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Authenticated fetch — reads JWT from authStore automatically.
 * In demo mode the static demo token is used instead.
 *
 * Old signature: authFetch(path, getToken, options)
 * New signature: authFetch(path, options)
 *
 * Both forms are supported for backwards-compatibility during migration.
 */
export async function authFetch(path, optionsOrGetToken = {}, legacyOptions = {}) {
  // Resolve options from either call signature:
  // Old: authFetch(path, getTokenFn, options)     → use legacyOptions
  // Old: authFetch(path, undefined, options)       → use legacyOptions (getToken unavailable)
  // New: authFetch(path, options)                  → use optionsOrGetToken
  const opts =
    typeof optionsOrGetToken === "function" || Object.keys(legacyOptions).length > 0
      ? legacyOptions
      : optionsOrGetToken;

  // Demo mode — bypass JWT entirely
  const demoState = useDemoStore.getState();
  if (demoState.isDemoMode) {
    return apiFetch(path, { token: demoState.getToken(), ...opts });
  }

  // Read token from authStore (lazy import to avoid circular dependency)
  const { useAuthStore } = require("../store/authStore");
  const token = useAuthStore.getState().token;

  if (!token) {
    throw new Error(i18n.t("errors:session"));
  }

  return apiFetch(path, { token, ...opts });
}

export async function requestNonce(wallet) {
  return apiFetch('/auth/nonce', {
    method: 'POST',
    body: JSON.stringify({ wallet }),
  });
}

export async function verifyWallet(wallet, signature, message) {
  return apiFetch('/auth/wallet', {
    method: 'POST',
    body: JSON.stringify({ wallet, signature, message }),
  });
}

export function getApiBaseUrl() {
  return API_BASE_URL;
}
