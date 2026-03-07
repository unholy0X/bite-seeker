import { StyleSheet, TextInput, View } from 'react-native';

import { colors, radii, spacing } from '@/src/theme/tokens';

type NewRecipeInputProps = {
  keyboardType?: 'default' | 'numeric';
  placeholder: string;
};

export function NewRecipeInput({ keyboardType = 'default', placeholder }: NewRecipeInputProps) {
  return (
    <View style={styles.container}>
      <TextInput keyboardType={keyboardType} placeholder={placeholder} placeholderTextColor={colors.textMuted} style={styles.input} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surfaceMuted,
    borderColor: colors.surfaceBorder,
    borderRadius: radii.md,
    borderWidth: 1,
    minHeight: 58,
    paddingHorizontal: spacing.md,
  },
  input: {
    color: colors.textPrimary,
    flex: 1,
    fontSize: 16,
  },
});
