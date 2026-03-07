import { StyleSheet, View } from 'react-native';

import { spacing } from '@/src/theme/tokens';

import { discoverCards } from '../data/home-content';
import { DiscoverCard } from './discover-card';

type DiscoverGridProps = {
  onCardPress?: (cardId: string) => void;
};

export function DiscoverGrid({ onCardPress }: DiscoverGridProps) {
  const rows = [];
  for (let i = 0; i < discoverCards.length; i += 2) {
    rows.push(discoverCards.slice(i, i + 2));
  }

  return (
    <View style={styles.container}>
      {rows.map((row, rowIndex) => (
        <View
          key={`discover-row-${rowIndex}`}
          style={[styles.row, rowIndex < rows.length - 1 ? styles.rowSpacing : undefined]}>
          {row.map((card, columnIndex) => (
            <View
              key={card.id}
              style={[styles.column, columnIndex === 0 ? styles.firstColumnSpacing : undefined]}>
              <DiscoverCard card={card} onPress={onCardPress} />
            </View>
          ))}
          {row.length < 2 ? <View style={styles.column} /> : null}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  column: {
    flex: 1,
  },
  container: {
    marginTop: spacing.md,
  },
  firstColumnSpacing: {
    marginRight: spacing.sm,
  },
  row: {
    flexDirection: 'row',
  },
  rowSpacing: {
    marginBottom: spacing.sm,
  },
});
