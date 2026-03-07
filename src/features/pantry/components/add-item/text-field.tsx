import { StyleSheet, TextInput, View } from 'react-native';

import { colors, radii, spacing } from '@/src/theme/tokens';

type TextFieldProps = {
  keyboardType?: 'default' | 'numeric';
  placeholder: string;
};

export function TextField({ keyboardType = 'default', placeholder }: TextFieldProps) {
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
