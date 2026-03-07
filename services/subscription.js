import { authFetch } from "./api";

export async function getSubscription() {
  return authFetch("/subscription");
}
