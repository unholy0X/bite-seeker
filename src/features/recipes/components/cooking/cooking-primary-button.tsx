import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, radii } from '@/src/theme/tokens';

type CookingPrimaryButtonProps = {
  label: string;
  onPress: () => void;
};

export function CookingPrimaryButton({ label, onPress }: CookingPrimaryButtonProps) {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Text style={styles.label}>{label}</Text>
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
