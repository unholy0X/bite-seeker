import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, spacing } from '@/src/theme/tokens';

import { DiscoverGrid } from '../components/discover-grid';
import { HomeHeader } from '../components/home-header';
import { MealCategoriesRow } from '../components/meal-categories-row';
import { MealPlanCard } from '../components/meal-plan-card';
import { SearchInput } from '../components/search-input';
import { TrendingSection } from '../components/trending-section';

export function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <HomeHeader />
        <SearchInput />
        <MealCategoriesRow />
        <TrendingSection />
        <DiscoverGrid
          onCardPress={(cardId) => {
            if (cardId === 'discover') {
              router.push('/get-inspired');
              return;
            }

            if (cardId === 'pantry') {
              router.push('/what-can-i-make');
              return;
            }

            if (cardId === 'favorites') {
              router.push('/favorites');
            }
          }}
        />
        <MealPlanCard onViewAllPress={() => router.push('/meal-plan')} />
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
