import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, radii } from '@/src/theme/tokens';

type CookingSecondaryButtonProps = {
  label: string;
  onPress: () => void;
};

export function CookingSecondaryButton({ label, onPress }: CookingSecondaryButtonProps) {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.xl,
    height: 68,
    justifyContent: 'center',
  },
  label: {
    color: colors.textPrimary,
    fontSize: 34 / 2,
    fontWeight: '700',
  },
});
