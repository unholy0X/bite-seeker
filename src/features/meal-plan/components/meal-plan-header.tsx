import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@/src/theme/tokens';

export function MealPlanHeader() {
  return (
    <View style={styles.row}>
      <Text style={styles.title}>Meal Plan</Text>
      <Text style={styles.period}>This Week</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  period: {
    color: colors.accent,
    fontSize: 34 / 2,
    fontWeight: '700',
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: colors.textPrimary,
    fontSize: 52 / 2,
    fontWeight: '700',
  },
});
