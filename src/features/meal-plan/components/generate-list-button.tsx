import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';

import { colors, radii, spacing } from '@/src/theme/tokens';

type GenerateListButtonProps = {
  isGenerating: boolean;
  onPress: () => void;
};

export function GenerateListButton({ isGenerating, onPress }: GenerateListButtonProps) {
  return (
    <Pressable
      disabled={isGenerating}
      onPress={onPress}
      style={({ pressed }) => [
        styles.btn,
        isGenerating && styles.btnDisabled,
        pressed && !isGenerating && { opacity: 0.85 },
      ]}
    >
      {isGenerating ? (
        <ActivityIndicator color={colors.accentText} size="small" />
      ) : (
        <Text style={styles.btnText}>Generate Shopping List</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    alignItems: 'center',
    backgroundColor: colors.accent,
    borderRadius: radii.xl,
    marginTop: spacing.xs,
    paddingVertical: spacing.md,
  },
  btnDisabled: {
    opacity: 0.6,
  },
  btnText: {
    color: colors.accentText,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
});
