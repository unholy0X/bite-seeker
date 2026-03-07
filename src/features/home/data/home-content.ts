import type { ComponentProps } from 'react';
import { Feather } from '@expo/vector-icons';

export type IconName = ComponentProps<typeof Feather>['name'];

export type MealCategory = {
  id: string;
  icon: IconName;
  label: string;
  selected?: boolean;
};

export type TrendingRecipe = {
  id: string;
  imageAlt: string;
  subtitle: string;
  title: string;
};

export type DiscoverCard = {
  id: string;
  subtitle: string;
  title: string;
};

export const mealCategories: MealCategory[] = [
  { id: 'breakfast', icon: 'coffee', label: 'Breakfast', selected: true },
  { id: 'lunch', icon: 'pie-chart', label: 'Lunch' },
  { id: 'dinner', icon: 'message-circle', label: 'Dinner' },
  { id: 'more', icon: 'more-horizontal', label: 'More' },
];

export const trendingRecipes: TrendingRecipe[] = [
  {
    id: 'ramen',
    imageAlt: 'Placeholder for spicy ramen bowl photo',
    subtitle: '25 min • 420 kcal',
    title: 'Spicy Ramen Bowl',
  },
  {
    id: 'avocado-toast',
    imageAlt: 'Placeholder for avocado toast photo',
    subtitle: '10 min • 280 kcal',
    title: 'Avocado Toast',
  },
];

export const discoverCards: DiscoverCard[] = [
  {
    id: 'pantry',
    subtitle: 'From your pantry',
    title: 'What can I make?',
  },
  {
    id: 'discover',
    subtitle: 'Discover new dishes',
    title: 'Get Inspired',
  },
  {
    id: 'favorites',
    subtitle: 'Your saved dishes',
    title: 'Favourites',
  },
];
