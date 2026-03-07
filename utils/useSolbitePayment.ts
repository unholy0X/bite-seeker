import { useCallback, useState } from "react";
import { PublicKey } from "@solana/web3.js";
import { buildPaymentInstructions } from "./buildPaymentInstructions";
import { useMobileWallet } from "./useMobileWallet";
import { useAuthStore } from "../store/authStore";
import {
  SOLBITE_MINT_ADDRESS,
  SOLBITE_TREASURY_WALLET,
  SOLBITE_EXTRACTION_COST,
  SOLBITE_DECIMALS,
  SOLBITE_IS_TOKEN_2022,
} from "../constants/solana";

/**
 * Hook to pay SOLBITE_EXTRACTION_COST per extraction.
 * Returns { payForExtraction, isPaying, payError }.
 * payForExtraction() resolves to a txSignature string on success.
 */
export function useSolbitePayment() {
  const wallet = useMobileWallet();
  const [isPaying, setIsPaying] = useState(false);
  const [payError, setPayError] = useState<string | null>(null);

  const payForExtraction = useCallback(async (isPro = false): Promise<string> => {
    if (!SOLBITE_MINT_ADDRESS || !SOLBITE_TREASURY_WALLET) {
      throw new Error("Payment not configured — SOLBITE_MINT_ADDRESS or SOLBITE_TREASURY_WALLET missing");
    }

    setIsPaying(true);
    setPayError(null);
    try {
      const fromWallet = new PublicKey(
        useAuthStore.getState().walletAddress!
      );

      const amount = isPro
        ? Math.floor(SOLBITE_EXTRACTION_COST / 2)
        : SOLBITE_EXTRACTION_COST;

      const instructions = await buildPaymentInstructions(fromWallet, {
        mintAddress: SOLBITE_MINT_ADDRESS,
        decimals: SOLBITE_DECIMALS,
        amount,
        treasuryWallet: SOLBITE_TREASURY_WALLET,
        isToken2022: SOLBITE_IS_TOKEN_2022,
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
