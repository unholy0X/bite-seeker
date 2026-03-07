import { StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing } from '@/src/theme/tokens';

type InstructionCardProps = {
  description: string;
  title: string;
};

export function InstructionCard({ description, title }: InstructionCardProps) {
  return (
    <View style={styles.card}>
      <View accessibilityLabel="Cooking step image placeholder" accessibilityRole="image" accessible style={styles.imageBadge}>
        <Text style={styles.badgeText}>Image</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badgeText: {
    color: colors.textPrimary,
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  card: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    marginTop: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
  },
  description: {
    color: colors.textSecondary,
    fontSize: 17,
    lineHeight: 24,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  imageBadge: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.14)',
    borderRadius: radii.full,
    height: 56,
    justifyContent: 'center',
    width: 56,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 50 / 2,
    fontWeight: '700',
    marginTop: spacing.md,
  },
});
