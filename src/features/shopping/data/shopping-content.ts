export type ShoppingItem = {
  checked: boolean;
  id: string;
  label: string;
};

export type ShoppingList = {
  id: string;
  items: ShoppingItem[];
  itemTotalLabel: string;
  progress: number;
  title: string;
};

export const shoppingLists: ShoppingList[] = [
  {
    id: 'weekly-groceries',
    itemTotalLabel: '12 items',
    items: [
      { checked: true, id: 'chicken-breast', label: 'Chicken breast x2' },
      { checked: false, id: 'ramen-noodles', label: 'Fresh ramen noodles' },
      { checked: false, id: 'sesame-oil', label: 'Sesame oil' },
    ],
    progress: 0.34,
    title: 'Weekly Groceries',
  },
  {
    id: 'party-prep',
    itemTotalLabel: '8 items',
    items: [
      { checked: true, id: 'tortilla-chips', label: 'Tortilla chips' },
      { checked: false, id: 'guacamole', label: 'Guacamole ingredients' },
    ],
    progress: 0.26,
    title: 'Party Prep',
  },
];
