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
  /** Token decimals (6 for SKR) */
  decimals: number;
  /** Total raw token amount to transfer (amount * 10^decimals) */
  amount: bigint | number;
  /** Treasury wallet that receives 100% of the payment */
  treasuryWallet: string;
  /** true for Token-2022, false for classic SPL Token (SKR uses classic) */
  isToken2022: boolean;
};

/**
 * Builds a single TransferChecked instruction sending 100% to the treasury.
 * Works for both classic SPL Token and Token-2022.
 * The treasury ATA must be pre-created by the protocol owner.
 */
export async function buildPaymentInstructions(
  fromWallet: PublicKey,
  config: PaymentConfig
): Promise<TransactionInstruction[]> {
  const mint = new PublicKey(config.mintAddress);
  const treasury = new PublicKey(config.treasuryWallet);
  const tokenProgram = config.isToken2022 ? TOKEN_2022_PROGRAM_ID : TOKEN_PROGRAM_ID;

  const total = BigInt(config.amount);

  const [fromAta, toAta] = await Promise.all([
    getAssociatedTokenAddress(mint, fromWallet, false, tokenProgram),
    getAssociatedTokenAddress(mint, treasury, false, tokenProgram),
  ]);

  return [
    createTransferCheckedInstruction(
      fromAta, mint, toAta, fromWallet,
      total, config.decimals, [], tokenProgram
    ),
  ];
}
