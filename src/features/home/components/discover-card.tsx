import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, radii, spacing } from '@/src/theme/tokens';

import type { DiscoverCard as DiscoverCardType } from '../data/home-content';

type DiscoverCardProps = {
  card: DiscoverCardType;
  onPress?: (cardId: string) => void;
};

export function DiscoverCard({ card, onPress }: DiscoverCardProps) {
  return (
    <Pressable onPress={() => onPress?.(card.id)} style={styles.card}>
      <Feather color={colors.textSecondary} name="star" size={16} />
      <Text style={styles.title}>{card.title}</Text>
      <Text style={styles.subtitle}>{card.subtitle}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    flex: 1,
    minHeight: 116,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.md,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 15,
    marginTop: spacing.xs,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 17,
    fontWeight: '700',
    marginTop: spacing.sm,
    textAlign: 'center',
  },
});
