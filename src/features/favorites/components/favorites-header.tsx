import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, spacing } from '@/src/theme/tokens';

type FavoritesHeaderProps = {
  onBackPress: () => void;
};

export function FavoritesHeader({ onBackPress }: FavoritesHeaderProps) {
  return (
    <View>
      <View style={styles.topRow}>
        <Pressable onPress={onBackPress} style={styles.iconButton}>
          <Feather color={colors.textSecondary} name="arrow-left" size={21} />
        </Pressable>
        <Text style={styles.title}>Favorites</Text>
        <View style={styles.iconButton}>
          <Feather color={colors.textMuted} name="menu" size={18} />
        </View>
      </View>
      <Text style={styles.subtitle}>24 saved recipes</Text>
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
