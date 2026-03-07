export type MatchRecipe = {
  id: string;
  imageAlt: string;
  matchPercent: number;
  meta: string;
  missingInfo: string;
  title: string;
  tone: 'brown' | 'green' | 'blue';
};

export const matchRecipes: MatchRecipe[] = [
  {
    id: 'spicy-ramen',
    imageAlt: 'Placeholder for spicy ramen bowl image',
    matchPercent: 95,
    meta: '25 min • 420 kcal',
    missingInfo: 'You have 9/10 ingredients',
    title: 'Spicy Ramen Bowl',
    tone: 'brown',
  },
  {
    id: 'avocado-toast',
    imageAlt: 'Placeholder for avocado toast image',
    matchPercent: 88,
    meta: '10 min • 280 kcal',
    missingInfo: 'You have 7/8 ingredients',
    title: 'Avocado Toast',
    tone: 'green',
  },
  {
    id: 'caesar-salad',
    imageAlt: 'Placeholder for caesar salad image',
    matchPercent: 72,
    meta: '15 min • 320 kcal',
    missingInfo: 'Missing: croutons, anchovies',
    title: 'Caesar Salad',
    tone: 'blue',
  },
];
