import { useCallback, useState } from "react";
import { PublicKey } from "@solana/web3.js";
import { buildPaymentInstructions } from "./buildPaymentInstructions";
import { useMobileWallet } from "./useMobileWallet";
import { useAuthStore } from "../store/authStore";
import {
  SEEKER_MINT_ADDRESS,
  SEEKER_TREASURY_WALLET,
  SEEKER_EXTRACTION_COST,
  SEEKER_DECIMALS,
  SEEKER_IS_TOKEN_2022,
} from "../constants/solana";

/**
 * Hook to pay SEEKER_EXTRACTION_COST (10 SKR) per extraction.
 * Pro users (hold 1000+ SKR) get free extractions — no wallet prompt.
 * Returns { payForExtraction, isPaying, payError }.
 * payForExtraction() resolves to a txSignature string, or null for Pro users.
 */
export function useSeekerPayment() {
  const wallet = useMobileWallet();
  const [isPaying, setIsPaying] = useState(false);
  const [payError, setPayError] = useState<string | null>(null);

  const payForExtraction = useCallback(async (isPro = false): Promise<string | null> => {
    // Pro users hold 1000+ SKR — extractions are free, no on-chain transaction needed
    if (isPro) return null;

    if (!SEEKER_MINT_ADDRESS || !SEEKER_TREASURY_WALLET) {
      throw new Error("Payment not configured — SEEKER_MINT_ADDRESS or SEEKER_TREASURY_WALLET missing");
    }

    setIsPaying(true);
    setPayError(null);
    try {
      const fromWallet = new PublicKey(
        useAuthStore.getState().walletAddress!
      );

      const instructions = await buildPaymentInstructions(fromWallet, {
        mintAddress: SEEKER_MINT_ADDRESS,
        decimals: SEEKER_DECIMALS,
        amount: SEEKER_EXTRACTION_COST,
        treasuryWallet: SEEKER_TREASURY_WALLET,
        isToken2022: SEEKER_IS_TOKEN_2022,
      });

      const txSig = await wallet.signAndSendTransaction(instructions);
      return txSig;
    } catch (err: any) {
      const msg = err?.message || "Payment failed";
      setPayError(msg);
      throw err;
    } finally {
      setIsPaying(false);
    }
  }, [wallet]);

  return { payForExtraction, isPaying, payError };
}
