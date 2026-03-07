import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing } from '@/src/theme/tokens';

import type { InspiredRecipeCard as InspiredRecipeCardType } from '../data/get-inspired-content';
import { InspiredTagPill } from './inspired-tag-pill';

type InspiredRecipeCardProps = {
  card: InspiredRecipeCardType;
};

export function InspiredRecipeCard({ card }: InspiredRecipeCardProps) {
  const metaParts = [card.time, card.servings].filter(Boolean).join('   ');

  return (
    <View style={styles.card}>
      {/* Hero image — fixed height, always fills */}
      <View style={[styles.hero, { backgroundColor: card.tint }]}>
        {card.thumbnailUrl ? (
          <Image
            source={{ uri: card.thumbnailUrl }}
            style={StyleSheet.absoluteFill}
            contentFit="cover"
            transition={200}
          />
        ) : null}
        {/* Gradient overlay for text legibility if ever needed */}
        <View style={styles.heroOverlay} />
      </View>

      {/* Body — fixed-height via numberOfLines so all cards are identical */}
      <View style={styles.body}>
        <Text numberOfLines={1} style={styles.title}>{card.title}</Text>
        <Text numberOfLines={2} style={styles.description}>{card.description}</Text>
        {metaParts ? <Text style={styles.meta}>{metaParts}</Text> : null}

        <View style={styles.tagsRow}>
          {card.tags.map((tag) => (
            <InspiredTagPill key={tag.id} tag={tag} />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: colors.surface,
    borderBottomLeftRadius: radii.lg,
    borderBottomRightRadius: radii.lg,
    height: 148,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  card: {
    borderRadius: radii.lg,
    overflow: 'hidden',
  },
  description: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 4,
  },
  hero: {
    height: 260,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.08)',
  },
  meta: {
    color: colors.textMuted,
    fontSize: 13,
    marginTop: spacing.xs,
  },
  tagsRow: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '700',
  },
});
