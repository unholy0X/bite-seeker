# BITE SEEKER
### The recipe app built by the Seeker community, for the Seeker community.

---

## SLIDE 1 — HOOK

> **Every recipe on the internet. In your pocket. Paid for with SKR.**

Bite Seeker turns any URL, YouTube video, or cookbook photo into a structured,
searchable recipe — using AI extraction gated by the Seeker token (SKR).

The first consumer app on Solana Mobile where your token holdings replace
your subscription plan.

---

## SLIDE 2 — THE PROBLEM

**Recipe discovery is completely fragmented.**

- Saved links die in browser bookmarks
- YouTube cooking videos can't be searched by ingredient
- Cookbook recipes live in photos buried in camera rolls
- Meal planning lives in a different app than shopping lists
- No single place connects *what you have* → *what you can cook* → *what to buy*

**For Seeker device holders specifically:**
There are zero consumer apps in the Solana mobile ecosystem that serve everyday,
non-financial needs — the kind of app you open every single day.

---

## SLIDE 3 — THE SOLUTION

**Bite Seeker is a native Android recipe app that:**

| Feature | What it does |
|---|---|
| **Extract** | Paste a URL or snap a cookbook page → AI parses it into a structured recipe |
| **Pantry** | Track what you have at home |
| **What Can I Make?** | Matches pantry contents to your recipe library |
| **Meal Plan** | Drag recipes onto a weekly calendar |
| **Shopping List** | Auto-generated from your meal plan, checkable in-store |
| **SKR-gated Pro** | Hold 1,000 SKR → unlimited free extractions forever |

---

## SLIDE 4 — SEEKER-NATIVE INTEGRATION

**SKR is not bolted on. It is the business model.**

```
Free user                         Pro user
    │                                 │
    ▼                                 ▼
Tap "Extract Recipe"          Tap "Extract Recipe"
    │                                 │
    ▼                                 ▼
Wallet opens (MWA)            Balance checked on-chain
Pay 10 SKR → treasury         1,000+ SKR held → FREE
    │                                 │
    ▼                                 ▼
       Recipe extracted & saved
```

**What makes this special:**
- Auth: Solana wallet sign-in via Mobile Wallet Adapter — no email, no password
- Payment: on-chain `TransferChecked` instruction, treasury receives 100% of SKR
- Pro tier: real-time RPC balance check (`getTokenAccountsByOwner`) on every session
- No subscriptions. No App Store billing. No middleman.

**Holding SKR literally unlocks the app.** That's a native reason to acquire
and hold the Seeker community token.

---

## SLIDE 5 — USER EXPERIENCE

**Designed for mobile from the ground up. Not a web port.**

- **Wallet auth** replaces the login form entirely — one tap, sign with Phantom
- **Camera extraction** — snap 3 photos of a cookbook page, AI reads it
- **Pantry scanner** — photograph your fridge, AI identifies ingredients
- **Offline-resilient** — cached state survives no-signal zones (supermarkets)
- **RTL support** — Arabic, French, English with full locale switching
- **Dark theme** — optimized for low-light kitchen environments
- **Safe area / edge-to-edge** — built for modern Android form factors

Every screen is a bottom sheet, swipe gesture, or full-bleed card.
There is no hamburger menu. There is no desktop layout squeezed onto a phone.

---

## SLIDE 6 — HOW IT WORKS (DEMO FLOW)

**30-second user journey:**

1. Open app → Phantom wallet prompt → sign nonce → authenticated
2. Paste `youtube.com/watch?v=...` → tap **Grab Recipe** → wallet opens
3. Sign 10 SKR transfer → extraction job starts
4. 20–40 seconds → full structured recipe appears (title, ingredients, steps, time)
5. Ingredients auto-added to pantry suggestion
6. Drop recipe onto Tuesday's meal plan
7. Tap **Generate Shopping List** → shareable checklist ready for the store

**No account creation. No credit card. No App Store subscription.**
Just a Solana wallet and some SKR.

---

## SLIDE 7 — TECH STACK

**Mobile (Android APK):**
- Expo SDK 55 / React Native 0.83 — native Android build via EAS
- Expo Router — file-based navigation, deep link support
- Zustand — offline-first state management with SecureStore persistence
- `@solana-mobile/mobile-wallet-adapter-protocol-web3js` — MWA v2
- `@solana/spl-token` — on-chain balance queries & `TransferChecked` payments
- Sentry — production error tracking

**Backend (Go):**
- Chi v5 REST API on Postgres + Redis
- Ed25519 nonce-based wallet authentication → JWT
- Google Gemini — recipe extraction from URLs, videos, and images
- Solana RPC — `getTransaction` payment verification + `getTokenAccountsByOwner`
  balance checks (no off-chain oracle, fully trustless)

**Solana:**
- Token: SKR (`SKRbvo6Gf7GondiT3BbTfuRDPqLWei4j2Qy2NPGZhW3`) — classic SPL
- 10 SKR per extraction → 100% to treasury (on-chain, verifiable)
- 1,000 SKR held → Pro tier (infinite extractions)
- Replay protection: used txSignatures stored in Postgres, checked before execution

---

## SLIDE 8 — WHY THIS WINS ON STICKINESS

**Recipe apps are opened every day. SKR creates a reason to hold, not just trade.**

| Habit | Frequency |
|---|---|
| Check pantry before shopping | 2–3× / week |
| Look up a recipe | Daily |
| Build a meal plan | Weekly |
| Check shopping list in-store | Weekly |

This is not a DeFi dashboard opened once a month.
This is an app opened before every meal.

**Retention mechanics:**
- Pantry state accumulates over time → switching cost grows
- Meal plan history → personalized suggestions improve
- Pro tier is permanent while you hold SKR → no churn, just hold

---

## SLIDE 9 — ELIGIBILITY & MOBILE-FIRST PROOF

**Started fresh for this hackathon. Mobile-native by construction.**

- ✅ Project started within the 3-month eligibility window
- ✅ No outside capital raised
- ✅ Android APK produced via EAS Build (`buildType: "apk"`)
- ✅ MWA integration requires physical Android device — impossible on web
- ✅ Camera extraction (`expo-image-picker`) — mobile sensor, not web API
- ✅ Biometric auth hooks (`expo-local-authentication`) — device hardware
- ✅ `expo-secure-store` — encrypted on-device JWT + wallet storage
- ✅ Edge-to-edge layout, safe area insets, Android back gesture handling
- ✅ Offline banner, push notifications — mobile OS primitives
- ✅ No web version exists. No PWA. No Electron wrapper.

---

## SLIDE 10 — ROADMAP

**Post-hackathon, if we ship to the dApp Store:**

**Month 1 — dApp Store launch**
- Publish to Solana dApp Store
- SKR balance tier displayed in wallet aggregators

**Month 2 — Social layer**
- Share extracted recipes publicly
- Follow other Seeker users, see their recipe boxes
- Featured community recipes curated by SKR-weighted votes

**Month 3 — Device integration**
- Seeker device NFC tap → instant pantry scan
- Seeker-exclusive recipe packs from partner chefs
- SKR staking for permanent Pro without balance threshold

**Long term:**
- Marketplace: creators monetize recipe collections in SKR
- Grocery delivery integration (add shopping list to cart)
- AI meal planning based on dietary goals + pantry history

---

## SLIDE 11 — THE TEAM

**A student and a senior dev. One hackathon. One app.**

---

### Faycal Brahmi — Mobile & Product
*Frontend · React Native · Expo · UI/UX*

- CS student, based in France
- First hackathon. First shipped app.
- Wants to build on Solana — this is his entry point
- Owned the entire mobile experience: all screens, navigation, wallet auth
  flow, SKR payment integration, pantry, meal plan, shopping, i18n (EN/FR/AR),
  dark theme, camera extraction UI
- Learned Mobile Wallet Adapter, SPL token mechanics, and React Native
  from scratch during this sprint

> *"I wanted my first app to mean something to a real community.
> The Seeker ecosystem felt like the right place to start."*

---

### Naoufal Brahmi — Backend & Infrastructure
*Go · Postgres · Solana RPC · DevOps*

- Senior software engineer, working full time
- Limited availability — contributed nights and weekends
- Built and owns the backend: Go REST API, Ed25519 wallet authentication,
  Solana RPC payment verification, Gemini AI extraction pipeline,
  multi-platform deployment, and all infrastructure
- Ensured the on-chain payment and balance checks are production-grade
  and replay-protected

---

**Why this team story matters for the judges:**

This is not a team of full-time founders with runway.
It's a student learning to build on Solana — with just enough senior
support on the infrastructure that would have blocked him.

Every screen you see in the demo was designed and built by someone
submitting their first app to their first hackathon.
That is the Seeker community: builders at the start of their journey,
choosing Solana as their foundation.

---

## SLIDE 12 — THE ASK

**We built a consumer app the Seeker community will actually use every day.**

Not a token dashboard. Not a DEX. Not another wallet.

A recipe app where your SKR holdings replace your Netflix subscription —
except the value stays on-chain, and you own it.

**Bite Seeker. Your kitchen, on-chain.**

---

*Android APK: [link]*
*GitHub: [link]*
*Demo video: [link]*
