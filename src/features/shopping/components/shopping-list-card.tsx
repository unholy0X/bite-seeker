import { StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing } from '@/src/theme/tokens';

import type { ShoppingList } from '../data/shopping-content';
import { ShoppingCheckRow } from './shopping-check-row';
import { ShoppingProgressBar } from './shopping-progress-bar';

type ShoppingListCardProps = {
  list: ShoppingList;
};

export function ShoppingListCard({ list }: ShoppingListCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{list.title}</Text>
        <Text style={styles.count}>{list.itemTotalLabel}</Text>
      </View>

      <ShoppingProgressBar progress={list.progress} />

      <View style={styles.itemsWrap}>
        {list.items.map((item) => (
          <ShoppingCheckRow item={item} key={item.id} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    marginTop: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  count: {
    color: colors.accent,
    fontSize: 15,
    fontWeight: '700',
  },
  headerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemsWrap: {
    marginTop: 4,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 38 / 2,
    fontWeight: '700',
  },
});
