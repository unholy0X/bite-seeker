import { useRouter } from 'expo-router';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { colors, spacing } from '@/src/theme/tokens';
import { useSuggestedStore } from '../../../../store/suggestedStore';

import { SectionHeader } from './section-header';
import { TrendingRecipeCard } from './trending-recipe-card';

type TrendingSectionProps = {
  onRecipePress?: (id: string) => void;
};

export function TrendingSection({ onRecipePress }: TrendingSectionProps) {
  const router = useRouter();
  const { recipes, isLoading } = useSuggestedStore();

  const visible = recipes.slice(0, 4);

  return (
    <View style={styles.container}>
      <SectionHeader actionLabel="See all" title="Trending Now" onAction={() => router.push('/trending')} />
      {isLoading && visible.length === 0 ? (
        <View style={styles.loading}>
          <ActivityIndicator color={colors.accent} size="small" />
        </View>
      ) : (
        <View style={styles.cardsRow}>
          {visible.map((recipe: any) => {
            const totalTime = (recipe.prepTime || 0) + (recipe.cookTime || 0);
            const meta = [
              totalTime > 0 ? `${totalTime} min` : null,
              recipe.difficulty || null,
            ].filter(Boolean).join(' · ');

            return (
              <View key={recipe.id} style={styles.cardWrapper}>
                <TrendingRecipeCard
                  recipe={{
                    id: recipe.id,
                    title: recipe.title,
                    subtitle: meta,
                    imageAlt: recipe.title,
                    thumbnailUrl: recipe.thumbnailUrl || null,
                  }}
                  onPress={onRecipePress}
                />
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cardsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  cardWrapper: {
    width: '47.5%',
  },
  container: {
    marginTop: spacing.xl,
  },
  loading: {
    alignItems: 'center',
    marginTop: spacing.md,
  },
});
