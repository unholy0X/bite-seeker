import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing } from '@/src/theme/tokens';

type AddMissingItemsCardProps = {
  onPress: () => void;
};

export function AddMissingItemsCard({ onPress }: AddMissingItemsCardProps) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <View style={styles.topRow}>
        <Feather color={colors.accent} name="lightbulb" size={14} />
        <Text style={styles.title}>Add missing items to shopping list</Text>
      </View>
      <Text style={styles.subtitle}>We can auto-add what you need</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(182, 255, 0, 0.06)',
    borderColor: 'rgba(182, 255, 0, 0.45)',
    borderRadius: radii.lg,
    borderWidth: 1,
    marginTop: spacing.md,
    minHeight: 82,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 16,
    marginTop: 2,
  },
  title: {
    color: colors.accent,
    fontSize: 34 / 2,
    fontWeight: '700',
  },
  topRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.xs,
  },
});
