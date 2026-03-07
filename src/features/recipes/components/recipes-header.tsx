import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing } from '@/src/theme/tokens';

type RecipesHeaderProps = {
  onAddPress?: () => void;
  onSearchPress?: () => void;
};

export function RecipesHeader({ onAddPress, onSearchPress }: RecipesHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Recipes</Text>
      <View style={styles.actions}>
        {onSearchPress && (
          <Pressable onPress={onSearchPress} style={styles.iconButton}>
            <Feather color={colors.textSecondary} name="search" size={20} />
          </Pressable>
        )}
        <Pressable onPress={onAddPress} style={styles.addButton}>
          <Feather color={colors.accentText} name="plus" size={22} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  actions: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
  },
  addButton: {
    alignItems: 'center',
    backgroundColor: colors.accent,
    borderRadius: radii.full,
    height: 52,
    justifyContent: 'center',
    width: 52,
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconButton: {
    alignItems: 'center',
    backgroundColor: colors.surfaceStrong,
    borderRadius: radii.full,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 42 / 2,
    fontWeight: '700',
  },
});
