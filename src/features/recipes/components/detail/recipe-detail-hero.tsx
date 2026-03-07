import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing } from '@/src/theme/tokens';

type RecipeDetailHeroProps = {
  heroLabel: string;
  heroTint: string;
  onBackPress: () => void;
};

export function RecipeDetailHero({ heroLabel, heroTint, onBackPress }: RecipeDetailHeroProps) {
  return (
    <View style={[styles.container, { backgroundColor: heroTint }]}> 
      <View style={styles.topRow}>
        <Pressable onPress={onBackPress} style={styles.iconButton}>
          <Feather color={colors.textPrimary} name="arrow-left" size={22} />
        </Pressable>
        <Pressable style={styles.iconButton}>
          <Feather color={colors.textPrimary} name="heart" size={20} />
        </Pressable>
      </View>
      <View accessibilityLabel={heroLabel} accessibilityRole="image" accessible style={styles.imageBadge}>
        <Text style={styles.imageBadgeText}>{heroLabel}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 244,
    paddingHorizontal: spacing.lg,
    paddingTop: 92,
  },
  iconButton: {
    alignItems: 'center',
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
  imageBadge: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.14)',
    borderRadius: radii.full,
    justifyContent: 'center',
    marginTop: 34,
    minHeight: 90,
    minWidth: 90,
    paddingHorizontal: spacing.md,
  },
  imageBadgeText: {
    color: colors.textPrimary,
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.3,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
