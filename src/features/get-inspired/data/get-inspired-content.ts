export type InspiredTag = {
  id: string;
  label: string;
  tone: 'green' | 'teal' | 'red';
};

export type InspiredRecipeCard = {
  calories: string;
  description: string;
  id: string;
  imageAlt: string;
  rating: string;
  servings: string;
  tags: InspiredTag[];
  time: string;
  tint: string;
  title: string;
};

export const inspiredRecipeCards: InspiredRecipeCard[] = [
  {
    calories: '520 kcal',
    description: 'Aromatic coconut curry with fresh vegetables',
    id: 'thai-green-curry',
    imageAlt: 'Placeholder for Thai green curry recipe image',
    rating: '4.9',
    servings: '4 servings',
    tags: [
      { id: 'thai', label: 'Thai', tone: 'green' },
      { id: 'vegan', label: 'Vegan', tone: 'teal' },
      { id: 'spicy', label: 'Spicy', tone: 'red' },
    ],
    time: '35 min',
    tint: '#3A1C00',
    title: 'Thai Green Curry',
  },
  {
    calories: '460 kcal',
    description: 'Creamy risotto with wild mushrooms and herbs',
    id: 'mushroom-risotto',
    imageAlt: 'Placeholder for mushroom risotto recipe image',
    rating: '4.7',
    servings: '3 servings',
    tags: [
      { id: 'italian', label: 'Italian', tone: 'green' },
      { id: 'vegetarian', label: 'Veg', tone: 'teal' },
      { id: 'creamy', label: 'Creamy', tone: 'red' },
    ],
    time: '40 min',
    tint: '#18231C',
    title: 'Mushroom Risotto',
  },
  {
    calories: '390 kcal',
    description: 'Fresh salmon bowl with rice and citrus dressing',
    id: 'salmon-bowl',
    imageAlt: 'Placeholder for salmon bowl recipe image',
    rating: '4.8',
    servings: '2 servings',
    tags: [
      { id: 'japanese', label: 'Japanese', tone: 'green' },
      { id: 'high-protein', label: 'Protein', tone: 'teal' },
      { id: 'fresh', label: 'Fresh', tone: 'red' },
    ],
    time: '25 min',
    tint: '#142238',
    title: 'Salmon Rice Bowl',
  },
];
