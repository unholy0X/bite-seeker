import { useState } from 'react';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, spacing } from '@/src/theme/tokens';

import { CommunityCard } from '../components/community-card';
import { DiscoverGrid } from '../components/discover-grid';
import { FeaturedCategoryRow } from '../components/featured-category-row';
import { HomeHeader } from '../components/home-header';
import { MealCategoriesRow } from '../components/meal-categories-row';
import { MealPlanCard } from '../components/meal-plan-card';
import { SearchInput } from '../components/search-input';
import { TrendingSection } from '../components/trending-section';

type HomeScreenProps = {
  onAddRecipePress?: () => void;
  onRecipePress?: (id: string) => void;
  onSearchPress?: () => void;
};

export function HomeScreen({ onAddRecipePress, onRecipePress, onSearchPress }: HomeScreenProps) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('breakfast');

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <HomeHeader onAddPress={onAddRecipePress} />
        <SearchInput onPress={onSearchPress} />
        <MealCategoriesRow selectedId={selectedCategory} onSelect={setSelectedCategory} />
        <FeaturedCategoryRow selectedCategory={selectedCategory} onRecipePress={onRecipePress} />
        <TrendingSection onRecipePress={onRecipePress} />
        <CommunityCard />
        <DiscoverGrid
          onCardPress={(cardId) => {
            if (cardId === 'discover') router.push('/get-inspired');
            else if (cardId === 'pantry') router.push('/what-can-i-make');
            else if (cardId === 'favorites') router.push('/favorites');
          }}
        />
        <MealPlanCard onViewAllPress={() => router.push('/mealPlan')} onRecipePress={(id) => router.push(`/recipe/${id}`)} />
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bottomSpacer: {
    height: spacing.xl,
  },
  safeArea: {
    backgroundColor: colors.background,
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
});
