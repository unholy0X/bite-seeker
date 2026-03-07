import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, radii, spacing } from '@/src/theme/tokens';

type SearchInputProps = {
  onPress?: () => void;
};

export function SearchInput({ onPress }: SearchInputProps) {
  return (
    <Pressable style={({ pressed }) => [styles.container, pressed && { opacity: 0.75 }]} onPress={onPress}>
      <Feather color={colors.textMuted} name="search" size={18} />
      <Text style={styles.placeholder}>Search recipes, ingredients...</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.surfaceMuted,
    borderColor: colors.surfaceBorder,
    borderRadius: radii.full,
    borderWidth: 1,
    flexDirection: 'row',
    gap: spacing.sm,
    height: 56,
    marginTop: spacing.md,
    paddingHorizontal: spacing.md,
  },
  placeholder: {
    color: colors.textMuted,
    fontSize: 17,
    fontWeight: '500',
  },
});
