import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, radii } from '@/src/theme/tokens';

type StartCookingButtonProps = {
  onPress: () => void;
};

export function StartCookingButton({ onPress }: StartCookingButtonProps) {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Text style={styles.label}>Start Cooking →</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: colors.accent,
    borderRadius: radii.xl,
    height: 68,
    justifyContent: 'center',
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 14,
  },
  label: {
    color: colors.accentText,
    fontSize: 34 / 2,
    fontWeight: '700',
  },
});
