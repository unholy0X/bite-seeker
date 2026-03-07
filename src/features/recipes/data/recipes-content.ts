export type RecipeFilter = {
  id: string;
  label: string;
};

export type RecipeCard = {
  id: string;
  imageAlt: string;
  meta: string;
  placeholderLabel: string;
  thumbnailUrl?: string | null;
  tint: string;
  title: string;
};

export const recipeFilters: RecipeFilter[] = [
  { id: 'all', label: 'All' },
  { id: 'favorites', label: 'Favorites' },
];

export const recipeCards: RecipeCard[] = [
  {
    id: 'spicy-ramen',
    imageAlt: 'Placeholder for spicy ramen recipe image',
    meta: '25 min • 420 kcal',
    placeholderLabel: 'Ramen Image Placeholder',
    tint: '#2C1806',
    title: 'Spicy Ramen',
  },
  {
    id: 'caesar-salad',
    imageAlt: 'Placeholder for caesar salad recipe image',
    meta: '15 min • 320 kcal',
    placeholderLabel: 'Caesar Salad Image Placeholder',
    tint: '#032743',
    title: 'Caesar Salad',
  },
  {
    id: 'margherita-pizza',
    imageAlt: 'Placeholder for margherita pizza recipe image',
    meta: '40 min • 680 kcal',
    placeholderLabel: 'Pizza Image Placeholder',
    tint: '#3A0026',
    title: 'Margherita Pizza',
  },
  {
    id: 'avocado-toast',
    imageAlt: 'Placeholder for avocado toast recipe image',
    meta: '10 min • 280 kcal',
    placeholderLabel: 'Avocado Toast Image Placeholder',
    tint: '#1A3A00',
    title: 'Avocado Toast',
  },
];
