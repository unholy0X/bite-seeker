import { StyleSheet, View } from 'react-native';

import { spacing } from '@/src/theme/tokens';

import { mealCategories } from '../data/home-content';
import { MealCategoryPill } from './meal-category-pill';

export function MealCategoriesRow() {
  return (
    <View style={styles.container}>
      {mealCategories.map((category) => (
        <MealCategoryPill category={category} key={category.id} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginTop: 30,
  },
});
