import type { ComponentProps } from 'react';
import { Feather } from '@expo/vector-icons';

export type IconName = ComponentProps<typeof Feather>['name'];

export type AppTab = {
  id: string;
  label: string;
  icon: IconName;
  href: '/(app)' | '/(app)/recipes' | '/(app)/pantry' | '/(app)/shopping' | '/(app)/profile';
  matchPathnames: string[];
};

export const appTabs: AppTab[] = [
  { id: 'home', label: 'Home', icon: 'home', href: '/(app)', matchPathnames: ['/', '/(app)'] },
  {
    id: 'recipes',
    label: 'Recipes',
    icon: 'book-open',
    href: '/(app)/recipes',
    matchPathnames: ['/recipes', '/(app)/recipes'],
  },
  {
    id: 'pantry',
    label: 'Pantry',
    icon: 'briefcase',
    href: '/(app)/pantry',
    matchPathnames: ['/pantry', '/(app)/pantry'],
  },
  {
    id: 'shopping',
    label: 'Shopping',
    icon: 'shopping-bag',
    href: '/(app)/shopping',
    matchPathnames: ['/shopping', '/(app)/shopping'],
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: 'user',
    href: '/(app)/profile',
    matchPathnames: ['/profile', '/(app)/profile'],
  },
];
