import { PublicKey, TransactionInstruction } from "@solana/web3.js";
import {
  getAssociatedTokenAddress,
  createTransferCheckedInstruction,
  TOKEN_2022_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

export type PaymentConfig = {
  /** SPL Token or Token-2022 mint address */
  mintAddress: string;
  /** Token decimals (e.g. 6 for pump.fun tokens) */
  decimals: number;
  /** Raw token amount to transfer (amount * 10^decimals) */
  amount: bigint | number;
  /** Wallet that receives payments */
  treasuryWallet: string;
  /** true for Token-2022 (pump.fun tokens), false for classic SPL Token */
  isToken2022: boolean;
};

/**
 * Builds a TransferChecked instruction for paying a fixed token amount.
 *
 * Works for both classic SPL Token and Token-2022.
 * The treasury ATA must be pre-created by the protocol owner.
 *
 * @example
 * const instructions = await buildPaymentInstructions(
 *   userWalletPublicKey,
 *   {
 *     mintAddress: "FaqYPyaatHB5jtG9HJDu7r1w1NxF4okFMrW34DyQpump",
 *     decimals: 6,
 *     amount: 100 * 1_000_000,  // 100 tokens
 *     treasuryWallet: "H31n2af...",
 *     isToken2022: true,
 *   }
 * );
 */
export async function buildPaymentInstructions(
  fromWallet: PublicKey,
  config: PaymentConfig
): Promise<TransactionInstruction[]> {
  const mint = new PublicKey(config.mintAddress);
  const treasury = new PublicKey(config.treasuryWallet);
  const tokenProgram = config.isToken2022 ? TOKEN_2022_PROGRAM_ID : TOKEN_PROGRAM_ID;

  const [fromAta, toAta] = await Promise.all([
    getAssociatedTokenAddress(mint, fromWallet, false, tokenProgram),
    getAssociatedTokenAddress(mint, treasury, false, tokenProgram),
  ]);

  return [
    createTransferCheckedInstruction(
      fromAta,
      mint,
      toAta,
      fromWallet,
      BigInt(config.amount),
      config.decimals,
      [],
      tokenProgram
    ),
  ];
}
