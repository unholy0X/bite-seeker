import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@/src/theme/tokens';

import type { PantrySection } from '../data/pantry-content';

type PantrySectionTitleProps = {
  section: PantrySection;
};

export function PantrySectionTitle({ section }: PantrySectionTitleProps) {
  return (
    <View style={styles.row}>
      <View style={styles.leftSide}>
        <Feather color={section.iconColor} name={section.icon} size={14} />
        <Text style={styles.title}>{section.title}</Text>
      </View>
      <Text style={styles.count}>{section.itemCountLabel}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  count: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '500',
  },
  leftSide: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: colors.textPrimary,
    fontSize: 34 / 2,
    fontWeight: '700',
  },
});
