import { StyleSheet, Text } from 'react-native';

import { colors, spacing } from '@/src/theme/tokens';

type NewRecipeLabelProps = {
  text: string;
};

export function NewRecipeLabel({ text }: NewRecipeLabelProps) {
  return <Text style={styles.label}>{text}</Text>;
}

const styles = StyleSheet.create({
  label: {
    color: colors.textPrimary,
    fontSize: 34 / 2,
    fontWeight: '700',
    marginBottom: spacing.sm,
    marginTop: spacing.lg,
  },
});
