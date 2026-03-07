import { Image } from 'expo-image';
import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

import { colors, radii, spacing } from '@/src/theme/tokens';

const MEAL_CONFIG = {
  breakfast: { label: 'Breakfast', accent: '#F0A45E', bg: '#1E1208' },
  lunch:     { label: 'Lunch',     accent: '#7EC85A', bg: '#0C1808' },
  dinner:    { label: 'Dinner',    accent: '#E87070', bg: '#1A0808' },
  snack:     { label: 'Snack',     accent: '#A07CE8', bg: '#120A1A' },
} as const;

function SunIcon({ color }: { color: string }) {
  return (
    <Svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round">
      <Circle cx="12" cy="12" r="5" />
      <Path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </Svg>
  );
}

function LeafIcon({ color }: { color: string }) {
  return (
    <Svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M6 21c3-6 7-10 14-14-4 7-8 11-14 14Z" />
      <Path d="M6 21c0 0-1-7 4-12" />
    </Svg>
  );
}

function MoonIcon({ color }: { color: string }) {
  return (
    <Svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79Z" />
    </Svg>
  );
}

function CookieIcon({ color }: { color: string }) {
  return (
    <Svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round">
      <Circle cx="12" cy="12" r="10" />
      <Circle cx="10" cy="9" r="1" fill={color} />
      <Circle cx="15" cy="13" r="1" fill={color} />
      <Circle cx="9" cy="14" r="1" fill={color} />
    </Svg>
  );
}

const ICONS = {
  breakfast: SunIcon,
  lunch: LeafIcon,
  dinner: MoonIcon,
  snack: CookieIcon,
};

type MealSlotCardProps = {
  mealType: keyof typeof MEAL_CONFIG;
  entries: any[];
  onAdd: () => void;
  onRemove: (entryId: string) => void;
  onPressRecipe: (recipeId: string) => void;
};

export function MealSlotCard({ mealType, entries, onAdd, onRemove, onPressRecipe }: MealSlotCardProps) {
  const config = MEAL_CONFIG[mealType];
  const Icon = ICONS[mealType];

  return (
    <View style={styles.container}>
      <View style={[styles.header, { backgroundColor: config.bg }]}>
        <View style={styles.headerLeft}>
          <Icon color={config.accent} />
          <Text style={[styles.headerLabel, { color: config.accent }]}>{config.label}</Text>
        </View>
        {entries.length > 0 && (
          <View style={[styles.countBadge, { backgroundColor: config.accent }]}>
            <Text style={styles.countBadgeText}>{entries.length}</Text>
          </View>
        )}
      </View>

      {entries.map((entry) => {
        const totalTime = (entry.prepTime || 0) + (entry.cookTime || 0);
        return (
          <Pressable
            key={entry.id}
            onPress={() => onPressRecipe(entry.recipeId)}
            style={({ pressed }) => [styles.recipeCard, pressed && { opacity: 0.75 }]}
          >
            <View style={styles.thumbWrap}>
              {entry.thumbnailUrl ? (
                <Image
                  cachePolicy="memory-disk"
                  contentFit="cover"
                  source={{ uri: entry.thumbnailUrl }}
                  style={styles.thumb}
                  transition={200}
                />
              ) : (
                <View style={[styles.thumb, styles.thumbPlaceholder]}>
                  <Text style={styles.thumbInitial}>
                    {(entry.recipeTitle || 'R')[0].toUpperCase()}
                  </Text>
                </View>
              )}
            </View>
            <View style={styles.recipeInfo}>
              <Text numberOfLines={2} style={styles.recipeTitle}>
                {entry.recipeTitle || 'Recipe'}
              </Text>
              {totalTime > 0 && (
                <Text style={styles.recipeMeta}>{totalTime} min</Text>
              )}
            </View>
            <Pressable
              hitSlop={10}
              onPress={() => onRemove(entry.id)}
              style={styles.removeBtn}
            >
              <Feather color={colors.textMuted} name="x" size={12} />
            </Pressable>
          </Pressable>
        );
      })}

      <Pressable onPress={onAdd} style={({ pressed }) => [styles.addBtn, pressed && { opacity: 0.6 }]}>
        <Feather color={colors.accent} name="plus" size={14} />
        <Text style={styles.addBtnText}>Add recipe</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  header: {
    alignItems: 'center',
    borderRadius: radii.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  headerLeft: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.xxs,
  },
  headerLabel: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  countBadge: {
    alignItems: 'center',
    borderRadius: radii.full,
    height: 20,
    justifyContent: 'center',
    minWidth: 20,
    paddingHorizontal: 6,
  },
  countBadgeText: {
    color: colors.background,
    fontSize: 11,
    fontWeight: '700',
  },
  recipeCard: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    flexDirection: 'row',
    marginBottom: spacing.xxs,
    padding: spacing.xs,
  },
  thumbWrap: {
    borderRadius: radii.md,
    height: 48,
    overflow: 'hidden',
    width: 48,
  },
  thumb: {
    height: 48,
    width: 48,
  },
  thumbPlaceholder: {
    alignItems: 'center',
    backgroundColor: colors.surfaceStrong,
    justifyContent: 'center',
  },
  thumbInitial: {
    color: colors.textSecondary,
    fontSize: 18,
    fontWeight: '700',
  },
  recipeInfo: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  recipeTitle: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  recipeMeta: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
  removeBtn: {
    alignItems: 'center',
    backgroundColor: colors.surfaceStrong,
    borderRadius: radii.full,
    height: 28,
    justifyContent: 'center',
    marginLeft: spacing.xs,
    width: 28,
  },
  addBtn: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.surfaceBorder,
    borderRadius: radii.lg,
    borderWidth: 1,
    flexDirection: 'row',
    gap: spacing.xxs,
    justifyContent: 'center',
    paddingVertical: spacing.md,
  },
  addBtnText: {
    color: colors.accent,
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: -0.1,
  },
});
