import { Feather } from '@expo/vector-icons';
import { StyleSheet, TextInput, View } from 'react-native';

import { colors, radii, spacing } from '@/src/theme/tokens';

export function SearchIngredientField() {
  return (
    <View style={styles.container}>
      <Feather color={colors.textMuted} name="search" size={18} />
      <TextInput placeholder="Search ingredient..." placeholderTextColor={colors.textMuted} style={styles.input} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.surfaceMuted,
    borderColor: colors.surfaceBorder,
    borderRadius: radii.md,
    borderWidth: 1,
    flexDirection: 'row',
    gap: spacing.sm,
    minHeight: 58,
    paddingHorizontal: spacing.md,
  },
  input: {
    color: colors.textPrimary,
    flex: 1,
    fontSize: 16,
  },
});
