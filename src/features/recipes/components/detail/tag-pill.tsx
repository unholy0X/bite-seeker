import { StyleSheet, Text, View } from 'react-native';

import { radii, spacing } from '@/src/theme/tokens';

import type { RecipeTag } from '../../data/recipe-details-content';

type TagPillProps = {
  tag: RecipeTag;
};

export function TagPill({ tag }: TagPillProps) {
  const greenTone = tag.tone === 'green';

  return (
    <View style={[styles.pill, greenTone ? styles.greenPill : styles.tealPill]}>
      <Text style={[styles.label, greenTone ? styles.greenLabel : styles.tealLabel]}>{tag.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  greenLabel: {
    color: '#ABF53E',
  },
  greenPill: {
    backgroundColor: 'rgba(171, 245, 62, 0.16)',
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
  },
  pill: {
    borderRadius: radii.full,
    height: 30,
    justifyContent: 'center',
    paddingHorizontal: spacing.sm,
  },
  tealLabel: {
    color: '#41E5C9',
  },
  tealPill: {
    backgroundColor: 'rgba(65, 229, 201, 0.16)',
  },
});
