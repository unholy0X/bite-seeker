import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, radii, spacing } from '@/src/theme/tokens';

type CategoryChipProps = {
  active: boolean;
  label: string;
  onPress: () => void;
};

export function CategoryChip({ active, label, onPress }: CategoryChipProps) {
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
  },
  chip: {
    alignItems: 'center',
    borderRadius: radii.full,
    height: 42,
    justifyContent: 'center',
    minWidth: 92,
    paddingHorizontal: spacing.md,
  },
  inactiveChip: {
    backgroundColor: colors.surface,
  },
  inactiveLabel: {
    color: colors.textSecondary,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
  },
});
