import { useEffect } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import Svg, { Path, Circle } from 'react-native-svg';

import { colors, radii, spacing } from '@/src/theme/tokens';
import { useMealPlanStore } from '../../../../store/mealPlanStore';

// ─── meal config ───────────────────────────────────────────────────────────────
const MEAL_CONFIG = {
  breakfast: { label: 'Breakfast', accent: '#F0A45E', bg: '#1E1208' },
  lunch:     { label: 'Lunch',     accent: '#7EC85A', bg: '#0C1808' },
  dinner:    { label: 'Dinner',    accent: '#E87070', bg: '#1A0808' },
} as const;

type MealKey = keyof typeof MEAL_CONFIG;

function SunIcon({ color }: { color: string }) {
  return (
    <Svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round">
      <Circle cx="12" cy="12" r="5" />
      <Path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </Svg>
  );
}
function LeafIcon({ color }: { color: string }) {
  return (
    <Svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M6 21c3-6 7-10 14-14-4 7-8 11-14 14Z" />
      <Path d="M6 21c0 0-1-7 4-12" />
    </Svg>
  );
}
function MoonIcon({ color }: { color: string }) {
  return (
    <Svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79Z" />
    </Svg>
  );
}

const ICONS = { breakfast: SunIcon, lunch: LeafIcon, dinner: MoonIcon };

function getTodayIndex() {
  const d = new Date().getDay();
  return d === 0 ? 6 : d - 1; // 0=Mon … 6=Sun
}

// ─── single meal slot ──────────────────────────────────────────────────────────
function MealSlot({
  mealType,
  entry,
  onPress,
}: {
  mealType: MealKey;
  entry: any | null;
  onPress: () => void;
}) {
  const config = MEAL_CONFIG[mealType];
  const Icon = ICONS[mealType];

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.slot, pressed && { opacity: 0.75 }]}
    >
      {/* meal type header */}
      <View style={[styles.slotHeader, { backgroundColor: config.bg }]}>
        <Icon color={config.accent} />
        <Text style={[styles.slotLabel, { color: config.accent }]}>{config.label}</Text>
      </View>

      {/* content */}
      {entry ? (
        <View style={styles.slotContent}>
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
          <Text numberOfLines={2} style={styles.recipeName}>
            {entry.recipeTitle || 'Recipe'}
          </Text>
        </View>
      ) : (
        <View style={styles.emptySlot}>
          <Text style={styles.emptyPlus}>+</Text>
          <Text style={styles.emptyText}>Add meal</Text>
        </View>
      )}
    </Pressable>
  );
}

// ─── main card ────────────────────────────────────────────────────────────────
type MealPlanCardProps = {
  onViewAllPress: () => void;
  onRecipePress: (recipeId: string) => void;
};

export function MealPlanCard({ onViewAllPress, onRecipePress }: MealPlanCardProps) {
  const { plan, isLoading, loadCurrentWeek } = useMealPlanStore();

  useEffect(() => {
    if (!plan) {
      loadCurrentWeek({}).catch(() => {});
    }
  }, []);

  const todayIndex = getTodayIndex();
  const todayEntries: any[] = plan?.entries?.filter((e: any) => e.dayIndex === todayIndex) ?? [];

  const getEntry = (type: MealKey) =>
    todayEntries.find((e: any) => e.mealType === type) ?? null;

  const handleSlotPress = (type: MealKey) => {
    const entry = getEntry(type);
    if (entry?.recipeId) {
      onRecipePress(entry.recipeId);
    } else {
      onViewAllPress();
    }
  };

  return (
    <Pressable
      onPress={onViewAllPress}
      style={({ pressed }) => [styles.card, pressed && { opacity: 0.95 }]}
    >
      <View style={styles.headingRow}>
        <Text style={styles.title}>Today&apos;s Meal Plan</Text>
        <Pressable onPress={onViewAllPress} hitSlop={8}>
          <Text style={styles.action}>View all</Text>
        </Pressable>
      </View>

      {isLoading && !plan ? (
        <View style={styles.loading}>
          <ActivityIndicator color={colors.accent} size="small" />
        </View>
      ) : (
        <View style={styles.slotsRow}>
          {(['breakfast', 'lunch', 'dinner'] as MealKey[]).map((type) => (
            <MealSlot
              key={type}
              mealType={type}
              entry={getEntry(type)}
              onPress={() => handleSlotPress(type)}
            />
          ))}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.xl,
    marginTop: spacing.md,
    padding: spacing.md,
  },
  headingRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 17,
    fontWeight: '700',
  },
  action: {
    color: colors.accent,
    fontSize: 14,
    fontWeight: '700',
  },
  loading: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  slotsRow: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  slot: {
    backgroundColor: colors.surfaceStrong,
    borderRadius: radii.md,
    flex: 1,
    overflow: 'hidden',
  },
  slotHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
    paddingHorizontal: spacing.xs,
    paddingVertical: 6,
  },
  slotLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  slotContent: {
    alignItems: 'center',
    padding: spacing.xs,
  },
  thumb: {
    borderRadius: radii.sm,
    height: 52,
    width: '100%',
  },
  thumbPlaceholder: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    justifyContent: 'center',
  },
  thumbInitial: {
    color: colors.textSecondary,
    fontSize: 20,
    fontWeight: '700',
  },
  recipeName: {
    color: colors.textPrimary,
    fontSize: 11,
    fontWeight: '600',
    marginTop: 4,
    textAlign: 'center',
  },
  emptySlot: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
  },
  emptyPlus: {
    color: colors.textMuted,
    fontSize: 20,
    fontWeight: '300',
    lineHeight: 22,
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '500',
    marginTop: 2,
  },
});
