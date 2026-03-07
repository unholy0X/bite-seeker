import type { ComponentProps } from 'react';
import { Feather } from '@expo/vector-icons';

export type IconName = ComponentProps<typeof Feather>['name'];

export type AppTab = {
  id: string;
  label: string;
  icon: IconName;
  href: '/home' | '/recipes' | '/pantry' | '/shopping' | '/profile';
  matchPathnames: string[];
};

export const appTabs: AppTab[] = [
  { id: 'home', label: 'Home', icon: 'home', href: '/home', matchPathnames: ['/home'] },
  { id: 'recipes', label: 'Recipes', icon: 'book-open', href: '/recipes', matchPathnames: ['/recipes'] },
  { id: 'pantry', label: 'Pantry', icon: 'briefcase', href: '/pantry', matchPathnames: ['/pantry'] },
  { id: 'shopping', label: 'Shopping', icon: 'shopping-bag', href: '/shopping', matchPathnames: ['/shopping'] },
  { id: 'profile', label: 'Profile', icon: 'user', href: '/profile', matchPathnames: ['/profile'] },
];
