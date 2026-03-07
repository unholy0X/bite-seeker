export interface ApiFetchOptions extends Omit<RequestInit, "signal"> {
  token?: string;
  timeout?: number;
}

export interface NonceResponse {
  nonce: string;
  message: string;
}

export interface AuthResponse {
  token: string;
  walletAddress: string;
  isNew: boolean;
}

export function apiFetch<T = any>(path: string, options?: ApiFetchOptions): Promise<T>;
export function authFetch<T = any>(path: string, options?: ApiFetchOptions): Promise<T>;
export function getApiBaseUrl(): string;
export function requestNonce(wallet: string): Promise<NonceResponse>;
export function verifyWallet(wallet: string, signature: string, message: string): Promise<AuthResponse>;
