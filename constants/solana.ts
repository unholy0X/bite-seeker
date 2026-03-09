/**
 * Centralized Solana / SEEKER (SKR) configuration.
 * SKR mint: SKRbvo6Gf7GondiT3BbTfuRDPqLWei4j2Qy2NPGZhW3
 * Program:  classic SPL Token (not Token-2022)
 * Decimals: 6
 */

export const SOLANA_RPC_URL =
  process.env.EXPO_PUBLIC_SOLANA_RPC_URL || "https://api.mainnet-beta.solana.com";

/** SEEKER (SKR) token mint address */
export const SEEKER_MINT_ADDRESS =
  process.env.EXPO_PUBLIC_SEEKER_MINT_ADDRESS || "SKRbvo6Gf7GondiT3BbTfuRDPqLWei4j2Qy2NPGZhW3";

/** Token decimals for SKR */
export const SEEKER_DECIMALS = 6;

/** SKR is classic SPL Token — not Token-2022 */
export const SEEKER_IS_TOKEN_2022 = false;

/** Raw token cost per extraction (10 SKR × 10^6) */
export const SEEKER_EXTRACTION_COST =
  parseInt(process.env.EXPO_PUBLIC_SEEKER_EXTRACTION_COST || "10000000", 10);

/** Minimum raw balance for Pro tier (1000 SKR × 10^6) — free extractions */
export const SEEKER_PRO_THRESHOLD =
  parseInt(process.env.EXPO_PUBLIC_SEEKER_PRO_THRESHOLD || "1000000000", 10);

/** Treasury wallet that receives all extraction payments */
export const SEEKER_TREASURY_WALLET =
  process.env.EXPO_PUBLIC_SEEKER_TREASURY_WALLET || "H31n2af398PDHDJN26XBUoRvgtHhqLahjHYz16gNwkj6";

/** Jupiter link for acquiring SKR */
export const SEEKER_BUY_URL =
  "https://jup.ag/tokens/SKRbvo6Gf7GondiT3BbTfuRDPqLWei4j2Qy2NPGZhW3";

/** App identity shown in the MWA wallet UI */
export const APP_IDENTITY = {
  name: "Bite Seeker",
  uri: process.env.EXPO_PUBLIC_APP_URI || "https://biteseeker.app",
};
