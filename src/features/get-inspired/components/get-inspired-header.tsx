import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, spacing } from '@/src/theme/tokens';

type GetInspiredHeaderProps = {
  onBackPress: () => void;
};

export function GetInspiredHeader({ onBackPress }: GetInspiredHeaderProps) {
  return (
    <View>
      <View style={styles.topRow}>
        <Pressable onPress={onBackPress} style={styles.iconButton}>
          <Feather color={colors.textSecondary} name="arrow-left" size={21} />
        </Pressable>
        <Text style={styles.title}>Get Inspired</Text>
        <Pressable style={styles.iconButton}>
          <Feather color={colors.textMuted} name="menu" size={18} />
        </Pressable>
      </View>
      <Text style={styles.subtitle}>Swipe to discover new recipes</Text>
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
  subtitle: {
    color: colors.textSecondary,
    fontSize: 34 / 2,
    marginTop: spacing.sm,
    textAlign: 'center',
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
