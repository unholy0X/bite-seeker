import { View } from 'react-native';

import { MealSlotCard } from './meal-slot-card';

const MEAL_TYPES = ['breakfast', 'lunch', 'dinner', 'snack'] as const;

type MealSlotListProps = {
  entriesForDay: any[];
  onAdd: (mealType: string) => void;
  onRemove: (entryId: string) => void;
  onPressRecipe: (recipeId: string) => void;
};

export function MealSlotList({ entriesForDay, onAdd, onRemove, onPressRecipe }: MealSlotListProps) {
  return (
    <View>
      {MEAL_TYPES.map((type) => (
        <MealSlotCard
          key={type}
          mealType={type}
          entries={entriesForDay.filter((e) => e.mealType === type)}
          onAdd={() => onAdd(type)}
          onRemove={onRemove}
          onPressRecipe={onPressRecipe}
        />
      ))}
    </View>
  );
}
