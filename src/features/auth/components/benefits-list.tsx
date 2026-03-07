import { StyleSheet, View } from 'react-native';

import { spacing } from '@/src/theme/tokens';

import { loginBenefits } from '../data/login-content';
import { BenefitRow } from './benefit-row';

export function BenefitsList() {
  return (
    <View style={styles.container}>
      {loginBenefits.map((benefit) => (
        <BenefitRow benefit={benefit} key={benefit.id} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
    marginTop: spacing.xxl,
  },
});
