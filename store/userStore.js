import { create } from "zustand";
import { Alert } from "react-native";
import * as SecureStore from "expo-secure-store";
import { updatePreferences as updatePrefsApi } from "../services/user";
import i18n from "../i18n";

const USERNAME_KEY = "biteseeker_username";

export const useUserStore = create((set, get) => ({
  walletAddress: null,
  preferredUnitSystem: "metric",
  username: null,

  setWalletAddress: (walletAddress) => set({ walletAddress }),

  setPreferredUnitSystem: (preferredUnitSystem) => set({ preferredUnitSystem }),

  // Restore persisted username on cold start
  hydrateUsername: async () => {
    try {
      const stored = await SecureStore.getItemAsync(USERNAME_KEY);
      if (stored) set({ username: stored });
    } catch {
      // Non-fatal
    }
  },

  // Save username locally (non-fatal if secure store fails)
  setUsername: async (name) => {
    const trimmed = (name || "").trim();
    set({ username: trimmed || null });
    try {
      if (trimmed) {
        await SecureStore.setItemAsync(USERNAME_KEY, trimmed);
      } else {
        await SecureStore.deleteItemAsync(USERNAME_KEY);
      }
    } catch {
      // Non-fatal
    }
  },

  updatePreferences: async ({ preferredUnitSystem }) => {
    const previous = get().preferredUnitSystem;
    set({ preferredUnitSystem });
    try {
      await updatePrefsApi({ preferredUnitSystem });
    } catch (err) {
      set({ preferredUnitSystem: previous });
      Alert.alert(i18n.t("errors:errorTitle"), err?.message || i18n.t("errors:prefs.saveFailed"));
    }
  },

  clearUser: () => set({ walletAddress: null, preferredUnitSystem: "metric", username: null }),
}));
