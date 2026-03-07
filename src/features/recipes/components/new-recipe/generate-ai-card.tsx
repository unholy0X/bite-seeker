import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing } from '@/src/theme/tokens';

type GenerateAiCardProps = {
  onPress: () => void;
};

export function GenerateAiCard({ onPress }: GenerateAiCardProps) {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Feather color={colors.accent} name="zap" size={14} />
      <View>
        <Text style={styles.title}>Generate with AI</Text>
        <Text style={styles.subtitle}>Describe what you want to cook</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'rgba(182, 255, 0, 0.06)',
    borderColor: 'rgba(182, 255, 0, 0.45)',
    borderRadius: radii.lg,
    borderWidth: 1,
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.lg,
    minHeight: 84,
    paddingHorizontal: spacing.md,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 14,
    marginTop: 2,
  },
  title: {
    color: colors.accent,
    fontSize: 34 / 2,
    fontWeight: '700',
  },
});
