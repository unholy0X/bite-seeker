import { create } from "zustand";
import { Alert } from "react-native";
import { updatePreferences as updatePrefsApi } from "../services/user";
import i18n from "../i18n";

export const useUserStore = create((set, get) => ({
  walletAddress: null,
  preferredUnitSystem: "metric",

  setWalletAddress: (walletAddress) => set({ walletAddress }),

  setPreferredUnitSystem: (preferredUnitSystem) =>
    set({ preferredUnitSystem }),

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

  clearUser: () =>
    set({ walletAddress: null, preferredUnitSystem: "metric" }),
}));
