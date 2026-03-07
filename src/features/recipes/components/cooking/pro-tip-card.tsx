import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing } from '@/src/theme/tokens';

type ProTipCardProps = {
  description: string;
  title: string;
};

export function ProTipCard({ description, title }: ProTipCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.titleRow}>
        <Feather color={colors.accent} name="lightbulb" size={13} />
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(182, 255, 0, 0.06)',
    borderColor: 'rgba(182, 255, 0, 0.45)',
    borderRadius: radii.lg,
    borderWidth: 1,
    marginTop: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  description: {
    color: colors.textSecondary,
    fontSize: 16,
    lineHeight: 22,
    marginTop: spacing.xs,
  },
  title: {
    color: colors.accent,
    fontSize: 16,
    fontWeight: '700',
  },
  titleRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
  },
});
