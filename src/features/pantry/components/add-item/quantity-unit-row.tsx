import { StyleSheet, View } from 'react-native';

import { spacing } from '@/src/theme/tokens';

import { FormLabel } from './form-label';
import { TextField } from './text-field';

export function QuantityUnitRow() {
  return (
    <View style={styles.row}>
      <View style={styles.column}>
        <FormLabel text="Quantity" />
        <TextField keyboardType="numeric" placeholder="1" />
      </View>
      <View style={styles.column}>
        <FormLabel text="Unit" />
        <TextField placeholder="pieces" />
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
