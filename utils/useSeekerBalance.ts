import { useCallback, useState } from "react";
import { Connection, PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { SOLANA_RPC_URL, SEEKER_MINT_ADDRESS } from "../constants/solana";

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Module-level cache — survives re-renders, cleared only on balance change or TTL expiry
let _cache: { address: string; balance: number; fetchedAt: number } | null = null;

export function useSeekerBalance(walletAddress: string | null) {
  const [balance, setBalance] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetch = useCallback(async (forceRefresh = false) => {
    if (!walletAddress || !SEEKER_MINT_ADDRESS) {
      setBalance(null);
      return;
    }

    if (!forceRefresh && _cache && _cache.address === walletAddress && Date.now() - _cache.fetchedAt < CACHE_TTL) {
      setBalance(_cache.balance);
      return;
    }

    setIsLoading(true);
    try {
      const connection = new Connection(SOLANA_RPC_URL, "confirmed");
      const owner = new PublicKey(walletAddress);
      const mint = new PublicKey(SEEKER_MINT_ADDRESS);

      // SKR is classic SPL Token
      const accounts = await connection.getTokenAccountsByOwner(owner, { mint, programId: TOKEN_PROGRAM_ID });

      if (accounts.value.length === 0) {
        _cache = { address: walletAddress, balance: 0, fetchedAt: Date.now() };
        setBalance(0);
        return;
      }

      const tokenBalance = await connection.getTokenAccountBalance(accounts.value[0].pubkey);
      const amount = tokenBalance.value.uiAmount ?? 0;

      _cache = { address: walletAddress, balance: amount, fetchedAt: Date.now() };
      setBalance(amount);
    } catch {
      // On any RPC error, show 0 — never crash the UI over this
      setBalance(0);
    } finally {
      setIsLoading(false);
    }
  }, [walletAddress]);

  return { balance, isLoading, fetchBalance: fetch };
}
