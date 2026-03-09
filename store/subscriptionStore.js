import { create } from "zustand";
import * as SecureStore from "expo-secure-store";
import { getSubscription } from "../services/subscription";

const STORAGE_KEY = "biteseeker_subscription";

async function persistState(state) {
  try {
    await SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify({
      entitlement: state.entitlement,
      isActive: state.isActive,
      limits: state.limits,
    }));
  } catch {
    // Non-fatal
  }
}

export const useSubscriptionStore = create((set) => ({
  entitlement: "free",
  isActive: false,
  limits: null,
  isLoading: false,

  // Hydrate from SecureStore on cold start (before network call)
  hydrate: async () => {
    try {
      const raw = await SecureStore.getItemAsync(STORAGE_KEY);
      if (raw) {
        const cached = JSON.parse(raw);
        set({
          entitlement: cached.entitlement || "free",
          isActive: cached.isActive || false,
          limits: cached.limits || null,
        });
      }
    } catch {
      // Corrupted cache — ignore
    }
  },

  // Check SKR balance via backend GET /subscription
  loadSubscription: async () => {
    set({ isLoading: true });
    try {
      const data = await getSubscription();
      const newState = {
        entitlement: data.entitlement || "free",
        isActive: data.isActive !== false,
        limits: data.limits || null,
        isLoading: false,
      };
      set(newState);
      persistState(newState);
    } catch {
      // Keep existing entitlement — never downgrade on transient network error
      set({ isLoading: false });
    }
  },
}));
