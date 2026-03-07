import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { useUserStore } from "../store";
import { getMe } from "../services/user";
import { useDemoStore } from "../store/demoStore";

export default function UserSync() {
  const token = useAuthStore((s) => s.token);
  const walletAddress = useAuthStore((s) => s.walletAddress);
  const setWalletAddress = useUserStore((s) => s.setWalletAddress);
  const setPreferredUnitSystem = useUserStore((s) => s.setPreferredUnitSystem);
  const clearUser = useUserStore((s) => s.clearUser);
  const isDemoMode = useDemoStore((s) => s.isDemoMode);

  useEffect(() => {
    let cancelled = false;

    if (token || isDemoMode) {
      if (walletAddress) {
        setWalletAddress(walletAddress);
      }

      // Fetch backend preferences
      getMe()
        .then((res) => {
          if (!cancelled && res?.user?.preferredUnitSystem) {
            setPreferredUnitSystem(res.user.preferredUnitSystem);
          }
        })
        .catch((err) => {
          console.warn("UserSync: failed to fetch preferences", err?.message);
        });
    } else {
      clearUser();
    }

    return () => { cancelled = true; };
  }, [token, walletAddress, isDemoMode]);

  return null;
}
