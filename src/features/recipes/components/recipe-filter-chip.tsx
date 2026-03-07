import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, radii, spacing } from '@/src/theme/tokens';

type RecipeFilterChipProps = {
  active: boolean;
  label: string;
  onPress: () => void;
};

export function RecipeFilterChip({ active, label, onPress }: RecipeFilterChipProps) {
  return (
    <Pressable onPress={onPress} style={[styles.chip, active ? styles.activeChip : styles.inactiveChip]}>
      <Text style={[styles.label, active ? styles.activeLabel : styles.inactiveLabel]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  activeChip: {
    backgroundColor: colors.accent,
  },
  activeLabel: {
    color: colors.accentText,
    fontWeight: '700',
  },
  chip: {
    borderRadius: radii.full,
    minHeight: 42,
    minWidth: 82,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inactiveChip: {
    backgroundColor: colors.surface,
  },
  inactiveLabel: {
    color: colors.textSecondary,
    fontWeight: '600',
  },
  label: {
    fontSize: 17 / 2 * 2,
  },
});
