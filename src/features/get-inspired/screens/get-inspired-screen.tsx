import { useRef, useState } from 'react';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, spacing } from '@/src/theme/tokens';
import { useSuggestedStore } from '../../../../store/suggestedStore';
import { toggleFavorite } from '../../../../services/recipes';

import { InspiredActionsRow } from '../components/inspired-actions-row';
import { InspiredCarousel } from '../components/inspired-carousel';
import { GetInspiredHeader } from '../components/get-inspired-header';

type GetInspiredScreenProps = {
  onBackPress: () => void;
};

export function GetInspiredScreen({ onBackPress }: GetInspiredScreenProps) {
  const router = useRouter();
  const { recipes } = useSuggestedStore();
  const [activeIndex, setActiveIndex] = useState(0);
  const [favorited, setFavorited] = useState<Record<string, boolean>>({});
  const carouselRef = useRef<{ scrollToNext: () => void } | null>(null);

  const activeRecipe = recipes[activeIndex] || recipes[0];

  const handleCook = () => {
    const id = activeRecipe?.id;
    if (id) router.push({ params: { id }, pathname: '/recipe/[id]' });
  };

  const handleSkip = () => {
    carouselRef.current?.scrollToNext();
  };

  const handleFavorite = async () => {
    const id = activeRecipe?.id;
    if (!id) return;
    const next = !favorited[id];
    setFavorited((prev) => ({ ...prev, [id]: next }));
    try {
      await toggleFavorite({ recipeId: id, isFavorite: next });
    } catch {
      setFavorited((prev) => ({ ...prev, [id]: !next }));
    }
  };

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
      <View style={styles.container}>
        <GetInspiredHeader onBackPress={onBackPress} />
        <InspiredCarousel
          ref={carouselRef}
          onActiveIndexChange={setActiveIndex}
        />
        <InspiredActionsRow
          onCookPress={handleCook}
          onSkipPress={handleSkip}
          onFavoritePress={handleFavorite}
          isFavorited={!!(activeRecipe && favorited[activeRecipe.id])}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  safeArea: {
    backgroundColor: colors.background,
    flex: 1,
  },
});
