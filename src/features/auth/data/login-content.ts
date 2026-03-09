import type { ComponentProps } from 'react';
import { Feather } from '@expo/vector-icons';

export type IconName = ComponentProps<typeof Feather>['name'];

export type LoginBenefit = {
  id: string;
  label: string;
  icon: IconName;
};

export type WalletAction = {
  id: string;
  label: string;
  icon: IconName;
  variant: 'primary' | 'secondary';
};

export const loginBenefits: LoginBenefit[] = [
  { id: 'extract', label: 'Extract recipes from any photo or URL', icon: 'camera' },
  { id: 'pantry', label: 'Manage your pantry & shopping lists', icon: 'shopping-bag' },
  { id: 'skr', label: 'Pay 10 SKR per extraction — free at 1K SKR', icon: 'zap' },
];

export const walletActions: WalletAction[] = [
  { id: 'connect', label: 'Connect Wallet', icon: 'lock', variant: 'primary' },
];
