import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing } from '@/src/theme/tokens';

import type { WalletAction } from '../data/login-content';

type WalletButtonProps = {
  action: WalletAction;
  onPress?: () => void;
};

export function WalletButton({ action, onPress }: WalletButtonProps) {
  const primary = action.variant === 'primary';

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, primary ? styles.primary : styles.secondary, pressed && styles.pressed]}>
      <View style={styles.inner}>
        <Feather
          color={primary ? colors.accentText : colors.accent}
          name={action.icon}
          size={20}
          style={styles.icon}
        />
        <Text style={[styles.label, primary ? styles.primaryLabel : styles.secondaryLabel]}>{action.label}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: radii.xl,
    height: 68,
    justifyContent: 'center',
    width: '100%',
  },
  icon: {
    width: 24,
  },
  inner: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
    justifyContent: 'center',
  },
  label: {
    fontSize: 36 / 2,
    fontWeight: '700',
    letterSpacing: 0.1,
  },
  pressed: {
    opacity: 0.92,
    transform: [{ scale: 0.995 }],
  },
  primary: {
    backgroundColor: colors.accent,
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.32,
    shadowRadius: 20,
  },
  primaryLabel: {
    color: colors.accentText,
  },
  secondary: {
    backgroundColor: colors.surface,
    borderColor: colors.surfaceBorder,
    borderWidth: 1,
  },
  secondaryLabel: {
    color: colors.textPrimary,
  },
});
