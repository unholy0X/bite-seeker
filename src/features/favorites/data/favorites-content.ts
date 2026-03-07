export type FavoriteRecipe = {
  id: string;
  imageAlt: string;
  meta: string;
  rating: string;
  tint: string;
  title: string;
};

export const favoriteRecipes: FavoriteRecipe[] = [
  {
    id: 'spicy-ramen',
    imageAlt: 'Placeholder for spicy ramen bowl image',
    meta: '25 min • 420 kcal',
    rating: '4.8',
    tint: '#3A1F08',
    title: 'Spicy Ramen Bowl',
  },
  {
    id: 'avocado-toast',
    imageAlt: 'Placeholder for avocado toast image',
    meta: '10 min • 280 kcal',
    rating: '4.6',
    tint: '#153804',
    title: 'Avocado Toast',
  },
  {
    id: 'thai-green-curry',
    imageAlt: 'Placeholder for thai green curry image',
    meta: '35 min • 520 kcal',
    rating: '4.9',
    tint: '#01403A',
    title: 'Thai Green Curry',
  },
  {
    id: 'margherita-pizza',
    imageAlt: 'Placeholder for margherita pizza image',
    meta: '40 min • 680 kcal',
    rating: '4.7',
    tint: '#3E0026',
    title: 'Margherita Pizza',
  },
];
