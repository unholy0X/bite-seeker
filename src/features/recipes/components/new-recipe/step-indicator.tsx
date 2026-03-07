import { StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing } from '@/src/theme/tokens';

function StepCircle({ active, step }: { active?: boolean; step: number }) {
  return (
    <View style={[styles.circle, active ? styles.activeCircle : styles.inactiveCircle]}>
      <Text style={[styles.stepText, active ? styles.activeStepText : styles.inactiveStepText]}>{step}</Text>
    </View>
  );
}

function Connector({ active }: { active?: boolean }) {
  return <View style={[styles.connector, active ? styles.activeConnector : styles.inactiveConnector]} />;
}

export function StepIndicator() {
  return (
    <View style={styles.container}>
      <StepCircle active step={1} />
      <Connector active />
      <StepCircle step={2} />
      <Connector />
      <StepCircle step={3} />
    </View>
  );
}

const styles = StyleSheet.create({
  activeCircle: {
    backgroundColor: colors.accent,
  },
  activeConnector: {
    backgroundColor: colors.accent,
  },
  activeStepText: {
    color: colors.accentText,
  },
  circle: {
    alignItems: 'center',
    borderRadius: radii.full,
    height: 42,
    justifyContent: 'center',
    width: 42,
  },
  connector: {
    height: 2,
    width: 36,
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.lg,
  },
  inactiveCircle: {
    backgroundColor: colors.surface,
  },
  inactiveConnector: {
    backgroundColor: colors.surface,
  },
  inactiveStepText: {
    color: colors.textMuted,
  },
  stepText: {
    fontSize: 15,
    fontWeight: '700',
  },
});
