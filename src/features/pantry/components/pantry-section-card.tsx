import { StyleSheet, View } from 'react-native';

import { spacing } from '@/src/theme/tokens';

import type { PantrySection } from '../data/pantry-content';
import { PantryItemChip } from './pantry-item-chip';
import { PantrySectionTitle } from './pantry-section-title';

type PantrySectionCardProps = {
  section: PantrySection;
};

export function PantrySectionCard({ section }: PantrySectionCardProps) {
  return (
    <View style={styles.container}>
      <PantrySectionTitle section={section} />
      <View style={styles.chipsWrap}>
        {section.items.map((item) => (
          <PantryItemChip item={item} key={item.id} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  container: {
    marginTop: spacing.lg,
  },
});
