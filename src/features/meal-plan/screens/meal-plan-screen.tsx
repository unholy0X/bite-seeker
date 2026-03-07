import { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { colors, spacing } from '@/src/theme/tokens';
import { useMealPlanStore } from '../../../../store/mealPlanStore';
import { useRecipeStore, useShoppingStore } from '../../../../store';

import { MealPlanHeader } from '../components/meal-plan-header';
import { WeekStrip } from '../components/week-strip';
import { MealSlotList } from '../components/meal-slot-list';
import { AddRecipeSheet } from '../components/add-recipe-sheet';
import { GenerateListButton } from '../components/generate-list-button';

export function MealPlanScreen() {
  const router = useRouter();
  const { recipes: userRecipes, isLoading: recipesLoading, loadRecipes } = useRecipeStore();

  const {
    plan,
    selectedDay,
    isLoading,
    isGenerating,
    error,
    loadCurrentWeek,
    navigateWeek,
    setSelectedDay,
    addEntry,
    removeEntry,
    generateShoppingList,
    clearError,
  } = useMealPlanStore();

  const [addSheetOpen, setAddSheetOpen] = useState(false);
  const [addMealType, setAddMealType] = useState('dinner');

  useEffect(() => {
    loadCurrentWeek({}).catch(() => {});
    loadRecipes({}).catch(() => {});
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(clearError, 4000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const entries = plan?.entries || [];

  const entriesForDay = useMemo(
    () => entries.filter((e: any) => e.dayIndex === selectedDay),
    [entries, selectedDay],
  );

  const mealsPerDay = useMemo(() => {
    const counts = [0, 0, 0, 0, 0, 0, 0];
    entries.forEach((e: any) => {
      if (e.dayIndex >= 0 && e.dayIndex <= 6) counts[e.dayIndex]++;
    });
    return counts;
  }, [entries]);

  const totalMeals = entries.length;

  const handleAdd = useCallback((mealType: string) => {
    setAddMealType(mealType);
    setAddSheetOpen(true);
  }, []);

  const handleSelectRecipe = useCallback(
    async (recipe: any) => {
      setAddSheetOpen(false);
      try {
        await addEntry({ recipeId: recipe.id, dayIndex: selectedDay, mealType: addMealType });
      } catch {
        Alert.alert('Failed to add meal', 'Please try again.');
      }
    },
    [selectedDay, addMealType],
  );

  const handleRemove = useCallback(async (entryId: string) => {
    try {
      await removeEntry({ entryId });
    } catch {}
  }, []);

  const handleRecipePress = useCallback(
    (recipeId: string) => {
      if (recipeId) router.push(`/recipe/${recipeId}`);
    },
    [router],
  );

  const handleGenerateList = useCallback(async () => {
    try {
      const weekDate = plan?.weekStart ? new Date(plan.weekStart) : new Date();
      const dateStr = weekDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const result = await generateShoppingList({ name: `Meal Plan – ${dateStr}` });
      if (result?.list) {
        const list = result.list;
        const itemCount = list.items?.length ?? list.itemCount ?? 0;
        useShoppingStore.setState((state: any) => ({
          lists: [{ ...list, itemCount, checkedCount: 0 }, ...(state.lists || [])],
        }));
        Alert.alert('Shopping list created', `${itemCount} items added for ${list.name}.`);
      } else if (result?.message) {
        Alert.alert('All good!', 'All ingredients are already in your pantry.');
      }
    } catch (err: any) {
      Alert.alert('Failed to generate list', err?.message || 'Please try again.');
    }
  }, [plan?.weekStart]);

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <MealPlanHeader
        onBackPress={() => router.back()}
        weekStart={plan?.weekStart}
        onPrevWeek={() => navigateWeek({ direction: -1 }).catch(() => {})}
        onNextWeek={() => navigateWeek({ direction: 1 }).catch(() => {})}
      />

      <WeekStrip
        weekStart={plan?.weekStart}
        selectedDay={selectedDay}
        onSelectDay={setSelectedDay}
        mealsPerDay={mealsPerDay}
      />

      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator color={colors.accent} size="large" />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <MealSlotList
            entriesForDay={entriesForDay}
            onAdd={handleAdd}
            onRemove={handleRemove}
            onPressRecipe={handleRecipePress}
          />

          {totalMeals > 0 && (
            <GenerateListButton isGenerating={isGenerating} onPress={handleGenerateList} />
          )}
        </ScrollView>
      )}

      <AddRecipeSheet
        visible={addSheetOpen}
        onClose={() => setAddSheetOpen(false)}
        recipes={userRecipes}
        isLoading={recipesLoading}
        onSelect={handleSelectRecipe}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.background,
    flex: 1,
  },
  loading: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    paddingBottom: spacing.xxl,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
});
