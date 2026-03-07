import { transact } from "@solana-mobile/mobile-wallet-adapter-protocol-web3js";
import { Account, useAuthorization } from "./useAuthorization";
import {
  Connection,
  Transaction,
  TransactionInstruction,
  TransactionSignature,
} from "@solana/web3.js";
import { useCallback, useMemo } from "react";
import { SignInPayload } from "@solana-mobile/mobile-wallet-adapter-protocol";
import { SOLANA_RPC_URL as RPC_ENDPOINT } from "../constants/solana";

export function useMobileWallet() {
  const { authorizeSessionWithSignIn, authorizeSession, deauthorizeSession } =
    useAuthorization();

  const connect = useCallback(async (): Promise<Account> => {
    return await transact(async (wallet) => {
      return await authorizeSession(wallet);
    });
  }, [authorizeSession]);

  const signIn = useCallback(
    async (signInPayload: SignInPayload): Promise<Account> => {
      return await transact(async (wallet) => {
        return await authorizeSessionWithSignIn(wallet, signInPayload);
      });
    },
    [authorizeSession]
  );

  const disconnect = useCallback(async (): Promise<void> => {
    await transact(async (wallet) => {
      await deauthorizeSession(wallet);
    });
  }, [deauthorizeSession]);

  /**
   * Sign-then-broadcast pattern:
   * 1. Authorize + fetch blockhash IN PARALLEL inside transact()
   * 2. Build legacy Transaction inside transact() with fresh blockhash
   * 3. wallet.signTransactions() — wallet SIGNS ONLY (does NOT broadcast)
   * 4. We broadcast manually via sendRawTransaction — full control, proper errors
   *
   * Why not signAndSendTransactions:
   * The wallet's own broadcast call throws java.util.concurrent.CancellationException
   * when its internal RPC call hangs or fails, which crashes the app.
   */
  const signAndSendTransaction = useCallback(
    async (instructions: TransactionInstruction[]): Promise<TransactionSignature> => {
      const connection = new Connection(RPC_ENDPOINT, "confirmed");

      // Step 1: wallet signs only — no broadcast
      const signedTx = await transact(async (wallet) => {
        const [account, { blockhash }] = await Promise.all([
          authorizeSession(wallet),
          connection.getLatestBlockhash(),
        ]);

        const transaction = new Transaction({
          recentBlockhash: blockhash,
          feePayer: account.publicKey,
        });
        for (const ix of instructions) {
          transaction.add(ix);
        }

        const signed = await wallet.signTransactions({ transactions: [transaction] });
        return signed[0];
      });

      // Step 2: we broadcast — full error visibility.
      // skipPreflight: false → simulation runs and fails fast with a readable
      // error if the user has insufficient SOLBITE balance or the tx is invalid.
      // We do NOT await confirmTransaction — the backend validates the txSig
      // on-chain itself, and confirmTransaction on the public RPC can time out
      // even when the tx succeeds, which would wrongly block the extraction.
      const signature = await connection.sendRawTransaction(signedTx.serialize(), {
        skipPreflight: false,
        preflightCommitment: "confirmed",
      });

      return signature;
    },
    [authorizeSession]
  );

  const signMessage = useCallback(
    async (message: Uint8Array): Promise<Uint8Array> => {
      return await transact(async (wallet) => {
        const authResult = await authorizeSession(wallet);
        const signedMessages = await wallet.signMessages({
          addresses: [authResult.address],
          payloads: [message],
        });
        return signedMessages[0];
      });
    },
    [authorizeSession]
  );

  return useMemo(
    () => ({
      connect,
      signIn,
      disconnect,
      signAndSendTransaction,
      signMessage,
    }),
    [signAndSendTransaction, signMessage]
  );
}
