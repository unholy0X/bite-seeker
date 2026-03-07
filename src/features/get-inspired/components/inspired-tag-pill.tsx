import { StyleSheet, Text, View } from 'react-native';

import { radii, spacing } from '@/src/theme/tokens';

import type { InspiredTag } from '../data/get-inspired-content';

type InspiredTagPillProps = {
  tag: InspiredTag;
};

export function InspiredTagPill({ tag }: InspiredTagPillProps) {
  return (
    <View style={[styles.pill, toneStyles[tag.tone].pill]}>
      <Text style={[styles.label, toneStyles[tag.tone].label]}>{tag.label}</Text>
    </View>
  );
}

const toneStyles = {
  green: {
    label: { color: '#A6F34A' },
    pill: { backgroundColor: 'rgba(166, 243, 74, 0.16)' },
  },
  red: {
    label: { color: '#FF6C66' },
    pill: { backgroundColor: 'rgba(255, 108, 102, 0.16)' },
  },
  teal: {
    label: { color: '#41E5C9' },
    pill: { backgroundColor: 'rgba(65, 229, 201, 0.16)' },
  },
} as const;

const styles = StyleSheet.create({
  label: {
    fontSize: 13,
    fontWeight: '700',
  },
  pill: {
    borderRadius: radii.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
});
