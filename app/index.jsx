import { useState } from "react";
import { LoginScreen } from "@/src/features/auth/screens/login-screen";
import { useDlisheAuth } from "../utils/useDlisheAuth";

export default function LoginRoute() {
  const { signIn, isSigningIn } = useDlisheAuth();
  const [error, setError] = useState("");

  const handleWalletActionPress = async () => {
    setError("");
    try {
      await signIn();
    } catch (err) {
      const msg = err?.message ?? "";
      const userCancelled =
        msg.includes("cancelled") ||
        msg.includes("canceled") ||
        msg.includes("User rejected") ||
        msg.includes("declined") ||
        msg.includes("dismissed") ||
        err?.name === "UserDeclinedAuthorizationError";
      if (!userCancelled) {
        setError(msg || "Wallet connection failed");
      }
    }
  };

  return (
    <LoginScreen
      error={error}
      isLoading={isSigningIn}
      onWalletActionPress={handleWalletActionPress}
    />
  );
}
