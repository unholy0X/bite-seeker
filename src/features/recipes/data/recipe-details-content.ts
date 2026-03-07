export type RecipeTag = {
  id: string;
  label: string;
  tone: 'green' | 'teal';
};

export type NutritionItem = {
  id: string;
  label: string;
  value: string;
};

export type IngredientItem = {
  amount: string;
  id: string;
  name: string;
};

export type RecipeDetail = {
  description: string;
  heroLabel: string;
  heroTint: string;
  id: string;
  ingredients: IngredientItem[];
  nutrition: NutritionItem[];
  rating: string;
  servings: string;
  tags: RecipeTag[];
  time: string;
  title: string;
};

export const recipeDetails: RecipeDetail[] = [
  {
    description: 'A rich and flavorful Japanese-inspired bowl',
    heroLabel: 'Ramen Image Placeholder',
    heroTint: '#2A1607',
    id: 'spicy-ramen',
    ingredients: [
      { amount: '200g', id: 'noodles', name: 'Ramen noodles' },
      { amount: '800ml', id: 'broth', name: 'Chicken broth' },
      { amount: '2 pcs', id: 'eggs', name: 'Soft boiled eggs' },
      { amount: '2 tbsp', id: 'chili-oil', name: 'Chili oil' },
    ],
    nutrition: [
      { id: 'kcal', label: 'kcal', value: '420' },
      { id: 'protein', label: 'protein', value: '18g' },
      { id: 'carbs', label: 'carbs', value: '52g' },
      { id: 'fat', label: 'fat', value: '14g' },
    ],
    rating: '4.8',
    servings: '4 servings',
    tags: [
      { id: 'popular', label: 'Popular', tone: 'green' },
      { id: 'healthy', label: 'Healthy', tone: 'teal' },
    ],
    time: '25 min',
    title: 'Spicy Ramen Bowl',
  },
  {
    description: 'Fresh, crunchy and packed with flavor',
    heroLabel: 'Caesar Salad Image Placeholder',
    heroTint: '#062D48',
    id: 'caesar-salad',
    ingredients: [
      { amount: '1 head', id: 'lettuce', name: 'Romaine lettuce' },
      { amount: '1/2 cup', id: 'croutons', name: 'Croutons' },
      { amount: '60g', id: 'parmesan', name: 'Parmesan' },
      { amount: '4 tbsp', id: 'dressing', name: 'Caesar dressing' },
    ],
    nutrition: [
      { id: 'kcal', label: 'kcal', value: '320' },
      { id: 'protein', label: 'protein', value: '11g' },
      { id: 'carbs', label: 'carbs', value: '17g' },
      { id: 'fat', label: 'fat', value: '19g' },
    ],
    rating: '4.6',
    servings: '2 servings',
    tags: [
      { id: 'popular', label: 'Popular', tone: 'green' },
      { id: 'healthy', label: 'Healthy', tone: 'teal' },
    ],
    time: '15 min',
    title: 'Caesar Salad',
  },
  {
    description: 'Classic pizza with tomato, basil and mozzarella',
    heroLabel: 'Pizza Image Placeholder',
    heroTint: '#3E0026',
    id: 'margherita-pizza',
    ingredients: [
      { amount: '1', id: 'dough', name: 'Pizza dough' },
      { amount: '120g', id: 'mozzarella', name: 'Mozzarella' },
      { amount: '5 tbsp', id: 'sauce', name: 'Tomato sauce' },
      { amount: '8 leaves', id: 'basil', name: 'Fresh basil' },
    ],
    nutrition: [
      { id: 'kcal', label: 'kcal', value: '680' },
      { id: 'protein', label: 'protein', value: '24g' },
      { id: 'carbs', label: 'carbs', value: '75g' },
      { id: 'fat', label: 'fat', value: '30g' },
    ],
    rating: '4.7',
    servings: '4 servings',
    tags: [
      { id: 'popular', label: 'Popular', tone: 'green' },
      { id: 'healthy', label: 'Healthy', tone: 'teal' },
    ],
    time: '40 min',
    title: 'Margherita Pizza',
  },
  {
    description: 'Quick toast topped with creamy avocado',
    heroLabel: 'Avocado Toast Image Placeholder',
    heroTint: '#1D3E09',
    id: 'avocado-toast',
    ingredients: [
      { amount: '2 slices', id: 'bread', name: 'Sourdough bread' },
      { amount: '1', id: 'avocado', name: 'Ripe avocado' },
      { amount: '1 tbsp', id: 'lemon', name: 'Lemon juice' },
      { amount: 'to taste', id: 'seasoning', name: 'Salt and pepper' },
    ],
    nutrition: [
      { id: 'kcal', label: 'kcal', value: '280' },
      { id: 'protein', label: 'protein', value: '8g' },
      { id: 'carbs', label: 'carbs', value: '29g' },
      { id: 'fat', label: 'fat', value: '14g' },
    ],
    rating: '4.5',
    servings: '1 serving',
    tags: [
      { id: 'popular', label: 'Popular', tone: 'green' },
      { id: 'healthy', label: 'Healthy', tone: 'teal' },
    ],
    time: '10 min',
    title: 'Avocado Toast',
  },
];

export function getRecipeDetailById(id: string) {
  return recipeDetails.find((recipe) => recipe.id === id);
}
