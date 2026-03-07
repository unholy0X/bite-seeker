import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, spacing } from '@/src/theme/tokens';

import type { AppTab } from '../data/tabs';

type NavTabItemProps = {
  active: boolean;
  onPress: () => void;
  tab: AppTab;
};

export function NavTabItem({ active, onPress, tab }: NavTabItemProps) {
  return (
    <Pressable onPress={onPress} style={styles.pressable}>
      <Feather color={active ? colors.accent : colors.textMuted} name={tab.icon} size={19} />
      <Text style={[styles.label, active ? styles.activeLabel : styles.inactiveLabel]}>{tab.label}</Text>
      <View style={[styles.dot, active ? styles.activeDot : styles.inactiveDot]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  activeDot: {
    opacity: 1,
  },
  activeLabel: {
    color: colors.accent,
  },
  dot: {
    backgroundColor: colors.accent,
    borderRadius: 4,
    height: 8,
    marginTop: spacing.xs,
    width: 8,
  },
  inactiveDot: {
    opacity: 0,
  },
  inactiveLabel: {
    color: colors.textMuted,
  },
  label: {
    fontSize: 11,
    fontWeight: '500',
    marginTop: spacing.xs,
  },
  pressable: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingTop: spacing.xs,
  },
});
