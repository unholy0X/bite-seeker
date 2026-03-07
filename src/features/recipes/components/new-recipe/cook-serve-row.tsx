import { StyleSheet, View } from 'react-native';

import { spacing } from '@/src/theme/tokens';

import { NewRecipeInput } from './new-recipe-input';
import { NewRecipeLabel } from './new-recipe-label';

export function CookServeRow() {
  return (
    <View style={styles.row}>
      <View style={styles.column}>
        <NewRecipeLabel text="Cook Time" />
        <NewRecipeInput placeholder="30 min" />
      </View>
      <View style={styles.column}>
        <NewRecipeLabel text="Servings" />
        <NewRecipeInput keyboardType="numeric" placeholder="4" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  column: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
});
