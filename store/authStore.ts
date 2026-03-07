import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const JWT_KEY = 'biteseeker.jwt';
const WALLET_KEY = 'biteseeker.wallet';

type AuthState = {
  token: string | null;
  walletAddress: string | null;
  isLoading: boolean;
  load: () => Promise<void>;
  setToken: (token: string, walletAddress: string) => Promise<void>;
  clearToken: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  walletAddress: null,
  isLoading: true,

  load: async () => {
    try {
      const [token, walletAddress] = await Promise.all([
        SecureStore.getItemAsync(JWT_KEY),
        SecureStore.getItemAsync(WALLET_KEY),
      ]);
      set({ token: token ?? null, walletAddress: walletAddress ?? null, isLoading: false });
    } catch {
      set({ token: null, walletAddress: null, isLoading: false });
    }
  },

  setToken: async (token, walletAddress) => {
    await Promise.all([
      SecureStore.setItemAsync(JWT_KEY, token),
      SecureStore.setItemAsync(WALLET_KEY, walletAddress),
    ]);
    set({ token, walletAddress });
  },

  clearToken: async () => {
    await Promise.all([
      SecureStore.deleteItemAsync(JWT_KEY).catch(() => {}),
      SecureStore.deleteItemAsync(WALLET_KEY).catch(() => {}),
      // Clear the MWA auth_token so the wallet chooser appears on next sign-in.
      // Without this, the cached Phantom auth_token routes all future sessions
      // directly to Phantom, bypassing SeedVault and other wallet options.
      AsyncStorage.removeItem('biteseeker:mwa:authorization').catch(() => {}),
    ]);
    set({ token: null, walletAddress: null });
  },
}));
