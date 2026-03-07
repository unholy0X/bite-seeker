import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View, useWindowDimensions } from 'react-native';

import { colors, spacing } from '@/src/theme/tokens';
import { useSuggestedStore } from '../../../../store/suggestedStore';
import { InspiredRecipeCard } from './inspired-recipe-card';

const TINTS = ['#3A1C00', '#18231C', '#142238', '#1A0A20', '#0D1A14'];
const TAG_TONES = ['green', 'teal', 'red'] as const;

type InspiredCarouselProps = {
  onActiveIndexChange?: (index: number) => void;
};

export const InspiredCarousel = forwardRef(function InspiredCarousel(
  { onActiveIndexChange }: InspiredCarouselProps,
  ref: React.Ref<{ scrollToNext: () => void }>
) {
  const { width } = useWindowDimensions();
  const cardWidth = width - spacing.lg * 2;
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<FlatList>(null);
  const { recipes, isLoading } = useSuggestedStore();

  const cards = recipes.map((r: any, i: number) => {
    const totalTime = (r.prepTime || 0) + (r.cookTime || 0);
    const rawTags: string[] = Array.isArray(r.tags) ? r.tags : [];
    return {
      id: r.id,
      title: r.title,
      description: r.description || '',
      time: totalTime > 0 ? `${totalTime} min` : '',
      servings: r.servings ? `${r.servings} servings` : '',
      calories: '',
      rating: '',
      tint: TINTS[i % TINTS.length],
      imageAlt: r.title,
      thumbnailUrl: r.thumbnailUrl || null,
      tags: rawTags.slice(0, 3).map((tag, ti) => ({
        id: tag,
        label: tag.charAt(0).toUpperCase() + tag.slice(1),
        tone: TAG_TONES[ti % TAG_TONES.length],
      })),
    };
  });

  useImperativeHandle(ref, () => ({
    scrollToNext: () => {
      const next = Math.min(activeIndex + 1, cards.length - 1);
      scrollRef.current?.scrollToIndex({ index: next, animated: true });
      setActiveIndex(next);
      onActiveIndexChange?.(next);
    },
  }));

  if (isLoading && cards.length === 0) {
    return (
      <View style={styles.loadingWrap}>
        <ActivityIndicator color={colors.accent} />
      </View>
    );
  }

  const handleMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const nextIndex = Math.round(offsetX / cardWidth);
    const boundedIndex = Math.min(Math.max(nextIndex, 0), cards.length - 1);
    setActiveIndex(boundedIndex);
    onActiveIndexChange?.(boundedIndex);
  };

  return (
    <View style={styles.flex}>
      <FlatList
        data={cards}
        decelerationRate="fast"
        horizontal
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        pagingEnabled
        ref={scrollRef}
        renderItem={({ item }) => (
          <View style={[styles.cardWrap, { width: cardWidth }]}>
            <InspiredRecipeCard card={item} />
          </View>
        )}
        showsHorizontalScrollIndicator={false}
        snapToAlignment="start"
        snapToInterval={cardWidth}
      />

      <View style={styles.dotsRow}>
        {cards.map((card: any, index: number) => (
          <View key={card.id} style={[styles.dot, index === activeIndex ? styles.activeDot : styles.inactiveDot]} />
        ))}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  activeDot: {
    opacity: 1,
    width: 18,
  },
  cardWrap: {
    marginTop: spacing.lg,
  },
  flex: {
    flex: 1,
  },
  loadingWrap: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  dot: {
    backgroundColor: '#C6CCDA',
    borderRadius: 3,
    height: 6,
  },
  dotsRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.xs,
    justifyContent: 'center',
    marginTop: spacing.sm,
  },
  inactiveDot: {
    opacity: 0.35,
    width: 6,
  },
});
