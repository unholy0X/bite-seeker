import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing } from '@/src/theme/tokens';

import { BrandMark } from './brand-mark';

export function BrandIntro() {
  return (
    <View style={styles.container}>
      <BrandMark />
      <View style={styles.copyBlock}>
        <Text style={styles.title}>Bite Seeker</Text>
        <Text style={styles.subtitle}>AI Recipes on Solana Seeker</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  copyBlock: {
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: spacing.lg,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 34 / 2,
    fontWeight: '500',
    letterSpacing: 0.1,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 72 / 2,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
});
