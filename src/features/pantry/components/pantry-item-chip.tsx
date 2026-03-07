import { StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing } from '@/src/theme/tokens';

import type { PantryItem } from '../data/pantry-content';

type PantryItemChipProps = {
  item: PantryItem;
};

export function PantryItemChip({ item }: PantryItemChipProps) {
  return (
    <View style={styles.chip}>
      <Text style={styles.name}>{item.name}</Text>
      {item.count > 0 ? <Text style={styles.count}>x{item.count}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.full,
    flexDirection: 'row',
    height: 42,
    paddingHorizontal: spacing.md,
  },
  count: {
    color: colors.textMuted,
    fontSize: 12,
    marginLeft: spacing.xs,
  },
  name: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '500',
  },
});
