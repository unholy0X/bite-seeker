# Bite Seeker

> **Every recipe, everywhere. Paid for with SKR.**

A native Android recipe app built for the Seeker community — extract any recipe from a URL, YouTube video, or cookbook photo using AI, manage your pantry, plan your meals, and generate your shopping list. Gated by the SEEKER (SKR) token: pay 10 SKR per extraction, or hold 1,000 SKR to unlock unlimited free extractions forever.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Solana Integration](#solana-integration)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Building](#building)
- [Backend](#backend)
- [Internationalization](#internationalization)
- [Community & Tokenomics](#community--tokenomics)

---

## Overview

Bite Seeker is a mobile-first recipe management app submitted to the **Monolith Solana Hackathon**. It is designed exclusively for Android using Expo / React Native, with a Solana wallet as the only authentication method (no email, no password, no App Store billing).

The app is **by the Seeker community, for the Seeker community**. Every SKR token spent on the app flows back: 50% is burned to reduce supply, giving appreciation back to every SKR holder.

---

## Features

| Feature | Description |
|---|---|
| **Wallet Auth** | Sign in with any Solana wallet via Mobile Wallet Adapter (MWA v2) — one tap, sign a nonce, done |
| **Recipe Extraction** | Paste a URL, YouTube link, or snap a cookbook page — Gemini AI parses it into a structured recipe |
| **Pantry Manager** | Track what you have at home, add items manually or via AI photo scan |
| **What Can I Make?** | Matches your pantry contents against your recipe library with ingredient match scores |
| **Meal Plan** | Drag recipes onto a weekly calendar (breakfast / lunch / dinner / snack) |
| **Shopping List** | Auto-generated from your meal plan, checkable in-store, offline-resilient |
| **Thermomix Export** | Export any recipe to Cookidoo via the Thermomix integration (Pro feature) |
| **Get Inspired** | Swipeable carousel of AI-suggested recipes |
| **Favorites** | Heart any recipe to your personal favorites collection |
| **SKR-gated Pro** | Hold 1,000 SKR → unlimited free extractions, forever — no subscription |

---

## Solana Integration

| Parameter | Value |
|---|---|
| Token | SEEKER (SKR) |
| Mint | `SKRbvo6Gf7GondiT3BbTfuRDPqLWei4j2Qy2NPGZhW3` |
| Program | Classic SPL Token (Token Program) |
| Decimals | 6 |
| Extraction cost | 10 SKR (raw: `10_000_000`) |
| Pro threshold | 1,000 SKR (raw: `1_000_000_000`) |
| Treasury | `H31n2af398PDHDJN26XBUoRvgtHhqLahjHYz16gNwkj6` |
| Buy SKR | [Jupiter](https://jup.ag/tokens/SKRbvo6Gf7GondiT3BbTfuRDPqLWei4j2Qy2NPGZhW3) |

### Payment Flow

```
User taps "Grab recipe"
        │
        ▼
useSeekerPayment checks Pro status
        │
   isPro = true ──────────────────► extraction starts (free)
        │
   isPro = false
        │
        ▼
buildPaymentInstructions()
  → TransferChecked SPL instruction
  → user ATA → treasury ATA (10 SKR)
        │
        ▼
useMobileWallet.signAndSendTransaction()
  → MWA session opens Phantom / any wallet
  → wallet signs transaction
  → app broadcasts via sendRawTransaction
        │
        ▼
txSignature sent to backend with extract request
  → backend verifies on-chain via getTransaction
  → recipe extraction job starts
```

### Auth Flow

```
Tap "Connect Wallet"
        │
        ▼
MWA transact() session
  → authorize wallet → get publicKey
  → POST /auth/nonce
  → sign nonce message
  → POST /auth/wallet (signature + pubkey)
  → receive JWT
        │
        ▼
JWT + walletAddress persisted in SecureStore
All API calls use Bearer token
```

---

## Tech Stack

**Mobile (Android APK)**

| Layer | Technology |
|---|---|
| Framework | Expo SDK 55 / React Native 0.83 |
| Navigation | Expo Router (file-based, deep link support) |
| State | Zustand 5 (offline-first, SecureStore persistence) |
| Server state | TanStack React Query 5 |
| Wallet auth | `@solana-mobile/mobile-wallet-adapter-protocol` v2 |
| Token payments | `@solana/spl-token` — `TransferChecked` instruction |
| Balance check | `getTokenAccountsByOwner` RPC call (5-min cache) |
| i18n | i18next + react-i18next (EN / FR / AR) |
| Error tracking | Sentry |
| Storage | `expo-secure-store` (JWT, preferences) |
| Images | `expo-image`, `expo-image-picker` |

**Backend (Go)**

| Layer | Technology |
|---|---|
| API | Chi v5 REST on Postgres + Redis |
| Auth | Ed25519 nonce-based wallet auth → JWT |
| AI | Google Gemini — extraction from URLs, videos, images |
| Solana | RPC `getTransaction` payment verification + `getTokenAccountsByOwner` balance checks |
| Replay protection | Used `txSignatures` stored in Postgres |

---

## Project Structure

```
bite-seeker/
├── app/                    # Expo Router file-based routes
│   ├── _layout.jsx         # Root layout, AuthGate, font/i18n init
│   ├── index.jsx           # Login screen (wallet connect)
│   ├── onboarding.jsx      # First-launch onboarding (4 slides)
│   ├── home.jsx            # Home dashboard
│   ├── recipes.jsx         # My recipe collection
│   ├── recipe/[id].jsx     # Recipe detail (dynamic route)
│   ├── pantry.jsx          # Pantry manager
│   ├── shopping.jsx        # Shopping lists hub
│   ├── shoppingList.jsx    # Shopping list detail
│   ├── mealPlan.jsx        # Weekly meal planner
│   ├── what-can-i-make.jsx # Pantry-based recommendations
│   ├── get-inspired.jsx    # AI-suggested recipe carousel
│   ├── trending.jsx        # Trending recipes
│   ├── favorites.jsx       # Favorited recipes
│   └── profile.jsx         # Settings & account
│
├── src/
│   ├── features/           # Feature-sliced UI (TSX)
│   │   ├── auth/
│   │   ├── home/
│   │   ├── recipes/
│   │   ├── pantry/
│   │   ├── meal-plan/
│   │   ├── what-can-i-make/
│   │   ├── favorites/
│   │   ├── get-inspired/
│   │   ├── navigation/
│   │   └── shopping/
│   └── theme/
│       └── tokens.ts       # Colors, spacing, radii design tokens
│
├── store/                  # Zustand stores
│   ├── authStore.ts
│   ├── extractStore.js
│   ├── recipeStore.js
│   ├── pantryStore.js
│   ├── subscriptionStore.js
│   ├── mealPlanStore.js
│   ├── shoppingStore.js
│   └── ...
│
├── services/               # API client layer
│   ├── api.js              # authFetch / apiFetch base clients
│   ├── recipes.js
│   ├── pantry.js
│   ├── shopping.js
│   └── subscription.js
│
├── utils/                  # Hooks & helpers
│   ├── useBiteSeekerAuth.ts
│   ├── useSeekerBalance.ts
│   ├── useSeekerPayment.ts
│   ├── useMobileWallet.tsx
│   ├── buildPaymentInstructions.ts
│   └── polyfills.ts        # Buffer + crypto polyfills for Solana libs
│
├── constants/
│   └── solana.ts           # SKR token constants (mint, decimals, thresholds)
│
├── components/             # Shared JSX components
│   ├── paywall/
│   │   └── SolbiteGateSheet.jsx
│   ├── mealPlan/
│   ├── recipies/
│   └── ...
│
├── i18n/
│   └── locales/
│       ├── en/
│       ├── fr/
│       └── ar/
│
├── eas.json                # EAS Build profiles
├── app.json                # Expo app config
└── PITCH_DECK.md           # Hackathon pitch deck
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [EAS CLI](https://docs.expo.dev/build/setup/) (`npm install -g eas-cli`)
- Android device with a Solana wallet installed (Phantom, Solflare, etc.)

> **Note:** Mobile Wallet Adapter (MWA) requires a **physical Android device**. The wallet connection flow does not work in Expo Go or on iOS.

### Install

```bash
git clone https://github.com/unholy0X/bite-seeker.git
cd bite-seeker
npm install
```

### Configure environment

Copy the example env and fill in your values:

```bash
cp .env.example .env
```

See [Environment Variables](#environment-variables) for all required keys.

### Run (development)

```bash
npx expo start --clear
```

Scan the QR code with **Expo Go** for UI development. For full wallet functionality, build a development client (see [Building](#building)).

---

## Environment Variables

All variables are prefixed with `EXPO_PUBLIC_` and embedded at build time by EAS.

| Variable | Description | Default |
|---|---|---|
| `EXPO_PUBLIC_API_BASE_URL` | Backend REST API base URL | `http://207.180.202.57:8080/api/v1` |
| `EXPO_PUBLIC_SOLANA_RPC_URL` | Solana RPC endpoint | `https://api.mainnet-beta.solana.com` |
| `EXPO_PUBLIC_SEEKER_MINT_ADDRESS` | SKR token mint address | `SKRbvo6Gf7GondiT3BbTfuRDPqLWei4j2Qy2NPGZhW3` |
| `EXPO_PUBLIC_SEEKER_TREASURY_WALLET` | Treasury wallet receiving SKR payments | `H31n2af398PDHDJN26XBUoRvgtHhqLahjHYz16gNwkj6` |
| `EXPO_PUBLIC_SEEKER_EXTRACTION_COST` | Cost per extraction in raw token units | `10000000` (= 10 SKR) |
| `EXPO_PUBLIC_SEEKER_PRO_THRESHOLD` | Pro tier threshold in raw token units | `1000000000` (= 1,000 SKR) |
| `EXPO_PUBLIC_APP_URI` | App identity URI for MWA handshake | `https://biteseeker.app` |
| `EXPO_PUBLIC_SENTRY_DSN` | Sentry DSN for error tracking | *(optional)* |

---

## Building

### Preview APK (recommended for testing on device)

```bash
eas build --platform android --profile preview
```

Produces a direct `.apk` download link. Install on your Android device without Play Store.

### Development client

```bash
eas build --platform android --profile development
```

Full dev client with fast refresh and Expo dev tools, required for MWA wallet testing.

### Production

```bash
eas build --platform android --profile production
```

Auto-increments version number via EAS remote versioning.

---

## Backend

The backend is a separate Go service ([`unholy0X/dlishe`](https://github.com/unholy0X/dlishe), `solana-auth` branch).

**Key backend env vars (server-side):**

```env
SOLBITE_MINT_ADDRESS=SKRbvo6Gf7GondiT3BbTfuRDPqLWei4j2Qy2NPGZhW3
SOLBITE_EXTRACTION_COST=10000000
SOLBITE_PRO_THRESHOLD=1000000000
SOLBITE_TREASURY_WALLET=H31n2af398PDHDJN26XBUoRvgtHhqLahjHYz16gNwkj6
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
```

The backend performs:
- **Payment verification:** `getTransaction` + `postTokenBalances` to confirm the on-chain SKR transfer before starting extraction
- **Pro tier check:** `getTokenAccountsByOwner` live balance check on every `GET /subscription` call — no stale DB state
- **Replay protection:** Used `txSignatures` stored in Postgres, checked before accepting any payment

---

## Internationalization

The app ships with full support for three languages:

| Language | Code | RTL |
|---|---|---|
| English | `en` | No |
| French | `fr` | No |
| Arabic | `ar` | Yes *(forced RTL layout on switch)* |

Language is auto-detected from device locale on first launch and can be changed in the Profile tab. The selected language is synced to the backend so AI-extracted recipes are returned in the user's language.

**Namespaces:** `common`, `auth`, `home`, `recipe`, `pantry`, `shopping`, `mealPlan`, `paywall`, `errors`

---

## Community & Tokenomics

Bite Seeker is built **by the Seeker community, for the Seeker community**.

```
Every extraction:

  10 SKR paid by user
       │
       ├── 50% → 🔥 Burned forever (reduces SKR supply)
       └── 50% → Treasury (funds app development)
```

- **No subscriptions.** No App Store billing. No middleman.
- **Holding SKR unlocks the app.** 1,000 SKR held = unlimited free extractions.
- **Every fee burns supply.** The more the app is used, the more SKR is removed from circulation — giving appreciation back to every holder.

---

## License

MIT
