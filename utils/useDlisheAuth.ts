import { useCallback, useState } from 'react';
import { transact } from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';
import { Buffer } from 'buffer';
import { useAuthorization } from './useAuthorization';
import { useAuthStore } from '../store/authStore';
import { requestNonce, verifyWallet } from '../services/api';

/**
 * Orchestrates the full Dlishe wallet sign-in flow in a SINGLE MWA session:
 *   1. Authorize wallet (get public key + address)
 *   2. Fetch nonce from backend
 *   3. Sign nonce message with wallet
 *   4. Verify signature with backend → receive JWT
 *   5. Persist JWT in SecureStore via authStore
 */
export function useDlisheAuth() {
  const { authorizeSession } = useAuthorization();
  const setToken = useAuthStore((s) => s.setToken);
  const clearToken = useAuthStore((s) => s.clearToken);
  const [isSigningIn, setIsSigningIn] = useState(false);

  const signIn = useCallback(async () => {
    if (isSigningIn) return;
    setIsSigningIn(true);

    try {
      const token = await transact(async (wallet) => {
        // Step 1 — authorize wallet session
        const account = await authorizeSession(wallet);
        const walletAddress = account.publicKey.toBase58();

        // Step 2 — get nonce from backend (HTTP call is fine inside transact)
        const { message } = await requestNonce(walletAddress);

        // Step 3 — sign the nonce message
        const messageBytes = new TextEncoder().encode(message);
        const signedMessages = await wallet.signMessages({
          addresses: [account.address],
          payloads: [messageBytes],
        });
        const signatureBytes = signedMessages[0];

        // Step 4 — send signature to backend, get JWT
        const signatureBase64 = Buffer.from(signatureBytes).toString('base64');
        const authResponse = await verifyWallet(walletAddress, signatureBase64, message);
        return { token: authResponse.token, walletAddress };
      });

      // Step 5 — persist JWT + wallet address
      await setToken(token.token, token.walletAddress);
    } catch (err) {
      // Re-throw so callers (WelcomeScreen) can show an alert
      throw err;
    } finally {
      setIsSigningIn(false);
    }
  }, [authorizeSession, setToken, isSigningIn]);

  const signOut = useCallback(async () => {
    await clearToken();
  }, [clearToken]);

  return { signIn, signOut, isSigningIn };
}
