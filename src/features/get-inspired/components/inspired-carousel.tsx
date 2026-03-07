import { useRef, useState } from 'react';
import { FlatList, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View, useWindowDimensions } from 'react-native';

import { spacing } from '@/src/theme/tokens';

import { inspiredRecipeCards } from '../data/get-inspired-content';
import { InspiredRecipeCard } from './inspired-recipe-card';

type InspiredCarouselProps = {
  onActiveRecipeChange?: (recipeId: string) => void;
};

export function InspiredCarousel({ onActiveRecipeChange }: InspiredCarouselProps) {
  const { width } = useWindowDimensions();
  const cardWidth = width - spacing.lg * 2;
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<FlatList>(null);

  const handleMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const nextIndex = Math.round(offsetX / cardWidth);
    const boundedIndex = Math.min(Math.max(nextIndex, 0), inspiredRecipeCards.length - 1);

    setActiveIndex(boundedIndex);
    onActiveRecipeChange?.(inspiredRecipeCards[boundedIndex].id);
  };

  return (
    <View>
      <FlatList
        data={inspiredRecipeCards}
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
        {inspiredRecipeCards.map((card, index) => (
          <View key={card.id} style={[styles.dot, index === activeIndex ? styles.activeDot : styles.inactiveDot]} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  activeDot: {
    opacity: 1,
    width: 18,
  },
  cardWrap: {
    marginTop: spacing.lg,
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
