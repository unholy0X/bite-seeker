import { View } from 'react-native';

import { mealSlots } from '../data/meal-plan-content';
import { MealSlotCard } from './meal-slot-card';

export function MealSlotList() {
  return (
    <View>
      {mealSlots.map((slot) => (
        <MealSlotCard key={slot.id} slot={slot} />
      ))}
    </View>
  );
}
