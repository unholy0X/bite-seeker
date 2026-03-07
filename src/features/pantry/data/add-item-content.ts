export type PantryCategory = {
  id: string;
  label: string;
};

export const pantryCategories: PantryCategory[] = [
  { id: 'produce', label: 'Produce' },
  { id: 'dairy', label: 'Dairy' },
  { id: 'grains', label: 'Grains' },
  { id: 'protein', label: 'Protein' },
  { id: 'spices', label: 'Spices' },
];
