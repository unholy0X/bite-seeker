import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';

import { colors, radii, spacing } from '@/src/theme/tokens';
import { ImagePlaceholder } from './image-placeholder';

type TrendingRecipeCardProps = {
  recipe: {
    id: string;
    title: string;
    subtitle: string;
    imageAlt: string;
    thumbnailUrl?: string | null;
  };
  onPress?: (id: string) => void;
};

export function TrendingRecipeCard({ recipe, onPress }: TrendingRecipeCardProps) {
  return (
    <Pressable
      onPress={() => onPress?.(recipe.id)}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      {recipe.thumbnailUrl ? (
        <Image
          contentFit="cover"
          source={{ uri: recipe.thumbnailUrl }}
          style={styles.image}
        />
      ) : (
        <ImagePlaceholder alt={recipe.imageAlt} />
      )}
      <View style={styles.content}>
        <Text numberOfLines={2} style={styles.title}>{recipe.title}</Text>
        {recipe.subtitle ? <Text style={styles.subtitle}>{recipe.subtitle}</Text> : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    flex: 1,
    overflow: 'hidden',
  },
  cardPressed: {
    opacity: 0.75,
  },
  content: {
    gap: spacing.xxs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
  },
  image: {
    height: 128,
    width: '100%',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '500',
  },
  title: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '700',
  },
});
