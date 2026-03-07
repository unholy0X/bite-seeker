import { StyleSheet, TextInput, View } from 'react-native';

import { colors, radii, spacing } from '@/src/theme/tokens';

type NewRecipeTextAreaProps = {
  placeholder: string;
};

export function NewRecipeTextArea({ placeholder }: NewRecipeTextAreaProps) {
  return (
    <View style={styles.container}>
      <TextInput
        multiline
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        style={styles.input}
        textAlignVertical="top"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surfaceMuted,
    borderColor: colors.surfaceBorder,
    borderRadius: radii.md,
    borderWidth: 1,
    minHeight: 104,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  input: {
    color: colors.textPrimary,
    flex: 1,
    fontSize: 16,
  },
});
