/**
 * Centralized Solana / SOLBITE configuration.
 * All EXPO_PUBLIC_SOLANA_* and EXPO_PUBLIC_SOLBITE_* env vars live here.
 */

export const SOLANA_RPC_URL =
  process.env.EXPO_PUBLIC_SOLANA_RPC_URL || "https://api.mainnet-beta.solana.com";

export const SOLBITE_MINT_ADDRESS =
  process.env.EXPO_PUBLIC_SOLBITE_MINT_ADDRESS || "";

/** Minimum raw balance for Pro tier (1000 SOLBITE × 10^6) */
export const SOLBITE_PRO_THRESHOLD =
  parseInt(process.env.EXPO_PUBLIC_SOLBITE_PRO_THRESHOLD || "1000000000", 10);

/** Treasury wallet that receives extraction payments */
export const SOLBITE_TREASURY_WALLET =
  process.env.EXPO_PUBLIC_SOLBITE_TREASURY_WALLET || "";

/** Raw token cost per extraction (100 SOLBITE × 10^6) */
export const SOLBITE_EXTRACTION_COST =
  parseInt(process.env.EXPO_PUBLIC_SOLBITE_EXTRACTION_COST || "100000000", 10);

/** Token decimals for SOLBITE (pump.fun tokens use 6) */
export const SOLBITE_DECIMALS = 6;

/** Whether SOLBITE is a Token-2022 mint (pump.fun = true) */
export const SOLBITE_IS_TOKEN_2022 = true;

/**
 * Buyback accumulator wallet — receives 50% of every extraction payment.
 * The backend cron swaps accumulated SOLBITE for SEEKER and burns them.
 */
export const SOLBITE_BUYBACK_WALLET =
  process.env.EXPO_PUBLIC_SOLBITE_BUYBACK_WALLET || "";

/** SEEKER token mint address */
export const SEEKER_MINT_ADDRESS =
  process.env.EXPO_PUBLIC_SEEKER_MINT_ADDRESS || "";

/** pump.fun URL for acquiring SOLBITE */
export const SOLBITE_PUMP_URL =
  process.env.EXPO_PUBLIC_SOLBITE_PUMP_URL || "https://pump.fun";

/** App identity shown in the MWA wallet UI */
export const APP_IDENTITY = {
  name: "Bite Seeker",
  uri: process.env.EXPO_PUBLIC_APP_URI || "https://biteseeker.app",
  // No `icon` field — a relative path crashes SeedVault silently.
  // Provide an absolute HTTPS URL here only if you have one, e.g.:
  // icon: "https://biteseeker.app/favicon.png",
};
