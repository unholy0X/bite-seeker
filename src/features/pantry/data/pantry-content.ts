import type { ComponentProps } from 'react';
import { Feather } from '@expo/vector-icons';

export type IconName = ComponentProps<typeof Feather>['name'];

export type PantryItem = {
  count: number;
  id: string;
  name: string;
};

export type PantrySection = {
  icon: IconName;
  iconColor: string;
  id: string;
  itemCountLabel: string;
  items: PantryItem[];
  title: string;
};

export const pantrySections: PantrySection[] = [
  {
    icon: 'circle',
    iconColor: '#00D4A6',
    id: 'produce',
    itemCountLabel: '8 items',
    items: [
      { count: 6, id: 'tomatoes', name: 'Tomatoes' },
      { count: 3, id: 'onions', name: 'Onions' },
      { count: 5, id: 'garlic', name: 'Garlic' },
      { count: 2, id: 'avocados', name: 'Avocados' },
    ],
    title: 'Produce',
  },
  {
    icon: 'lock',
    iconColor: '#FFC400',
    id: 'dairy',
    itemCountLabel: '5 items',
    items: [
      { count: 0, id: 'milk', name: 'Milk' },
      { count: 0, id: 'eggs', name: 'Eggs' },
      { count: 0, id: 'butter', name: 'Butter' },
      { count: 0, id: 'parmesan', name: 'Parmesan' },
    ],
    title: 'Dairy',
  },
  {
    icon: 'arrow-up',
    iconColor: '#FF9E00',
    id: 'grains',
    itemCountLabel: '4 items',
    items: [
      { count: 0, id: 'rice', name: 'Rice' },
      { count: 0, id: 'pasta', name: 'Pasta' },
      { count: 0, id: 'flour', name: 'Flour' },
    ],
    title: 'Grains',
  },
];
