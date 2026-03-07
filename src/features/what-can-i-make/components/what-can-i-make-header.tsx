import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, spacing } from '@/src/theme/tokens';

type WhatCanIMakeHeaderProps = {
  onBackPress: () => void;
};

export function WhatCanIMakeHeader({ onBackPress }: WhatCanIMakeHeaderProps) {
  return (
    <View>
      <View style={styles.topRow}>
        <Pressable onPress={onBackPress} style={styles.iconButton}>
          <Feather color={colors.textSecondary} name="arrow-left" size={21} />
        </Pressable>
        <Text style={styles.title}>What Can I Make?</Text>
        <View style={styles.iconButton}>
          <Text style={styles.menuDots}>••</Text>
        </View>
      </View>
      <Text style={styles.subtitle}>Based on your pantry ingredients</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    alignItems: 'center',
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  menuDots: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 1,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 34 / 2,
    marginTop: spacing.sm,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 52 / 2,
    fontWeight: '700',
  },
  topRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
