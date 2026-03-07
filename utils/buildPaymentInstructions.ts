import { PublicKey, TransactionInstruction } from "@solana/web3.js";
import {
  getAssociatedTokenAddress,
  createTransferCheckedInstruction,
  TOKEN_2022_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { SOLBITE_BUYBACK_WALLET } from "../constants/solana";

export type PaymentConfig = {
  /** SPL Token or Token-2022 mint address */
  mintAddress: string;
  /** Token decimals (e.g. 6 for pump.fun tokens) */
  decimals: number;
  /** Total raw token amount to transfer (amount * 10^decimals) */
  amount: bigint | number;
  /** Wallet that receives 50% of the payment (app revenue) */
  treasuryWallet: string;
  /** true for Token-2022 (pump.fun tokens), false for classic SPL Token */
  isToken2022: boolean;
};

/**
 * Builds two atomic TransferChecked instructions for a single extraction payment:
 *   - 50% → treasury wallet (app revenue)
 *   - 50% → buyback accumulator wallet (swapped for SEEKER and burned by backend)
 *
 * Both transfers are in the same transaction — if one fails, both fail.
 * The buyback split is transparent and verifiable on-chain by anyone.
 *
 * Works for both classic SPL Token and Token-2022.
 * The treasury and buyback ATAs must be pre-created by the protocol owner.
 */
export async function buildPaymentInstructions(
  fromWallet: PublicKey,
  config: PaymentConfig
): Promise<TransactionInstruction[]> {
  const mint = new PublicKey(config.mintAddress);
  const treasury = new PublicKey(config.treasuryWallet);
  const tokenProgram = config.isToken2022 ? TOKEN_2022_PROGRAM_ID : TOKEN_PROGRAM_ID;

  const total = BigInt(config.amount);
  const buybackShare = total / 2n;
  const treasuryShare = total - buybackShare; // handles odd amounts — treasury gets the extra 1

  // If buyback wallet is not configured, send everything to treasury.
  if (!SOLBITE_BUYBACK_WALLET) {
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

  const buyback = new PublicKey(SOLBITE_BUYBACK_WALLET);

  const [fromAta, treasuryAta, buybackAta] = await Promise.all([
    getAssociatedTokenAddress(mint, fromWallet, false, tokenProgram),
    getAssociatedTokenAddress(mint, treasury, false, tokenProgram),
    getAssociatedTokenAddress(mint, buyback, false, tokenProgram),
  ]);

  return [
    // 50% → treasury (app revenue)
    createTransferCheckedInstruction(
      fromAta, mint, treasuryAta, fromWallet,
      treasuryShare, config.decimals, [], tokenProgram
    ),
    // 50% → buyback accumulator (backend swaps for SEEKER and burns)
    createTransferCheckedInstruction(
      fromAta, mint, buybackAta, fromWallet,
      buybackShare, config.decimals, [], tokenProgram
    ),
  ];
}
