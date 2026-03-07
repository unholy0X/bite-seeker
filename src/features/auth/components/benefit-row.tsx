import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing } from '@/src/theme/tokens';

import type { LoginBenefit } from '../data/login-content';

type BenefitRowProps = {
  benefit: LoginBenefit;
};

export function BenefitRow({ benefit }: BenefitRowProps) {
  return (
    <View style={styles.row}>
      <Feather color={colors.accent} name={benefit.icon} size={14} />
      <Text style={styles.label}>{benefit.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: colors.textSecondary,
    fontSize: 31 / 2,
    fontWeight: '500',
    lineHeight: 40 / 2,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.md,
  },
});
