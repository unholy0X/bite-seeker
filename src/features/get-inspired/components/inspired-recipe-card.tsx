import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing } from '@/src/theme/tokens';

import type { InspiredRecipeCard as InspiredRecipeCardType } from '../data/get-inspired-content';
import { InspiredTagPill } from './inspired-tag-pill';

type InspiredRecipeCardProps = {
  card: InspiredRecipeCardType;
};

export function InspiredRecipeCard({ card }: InspiredRecipeCardProps) {
  return (
    <View style={styles.card}>
      <View style={[styles.hero, { backgroundColor: card.tint }]}> 
        <View style={styles.ratingBadge}>
          <Feather color={colors.accent} name="star" size={12} />
          <Text style={styles.ratingText}>{card.rating}</Text>
        </View>
        <View accessibilityLabel={card.imageAlt} accessibilityRole="image" accessible style={styles.imageBadge}>
          <Text style={styles.imageBadgeText}>Image</Text>
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.title}>{card.title}</Text>
        <Text style={styles.description}>{card.description}</Text>
        <Text style={styles.meta}>{`${card.time}   ${card.servings}   ${card.calories}`}</Text>

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
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  card: {
    borderRadius: radii.lg,
    overflow: 'hidden',
  },
  description: {
    color: colors.textSecondary,
    fontSize: 34 / 2,
    marginTop: spacing.xs,
  },
  hero: {
    height: 340,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },
  imageBadge: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.14)',
    borderRadius: radii.full,
    height: 96,
    justifyContent: 'center',
    marginTop: 84,
    width: 96,
  },
  imageBadgeText: {
    color: colors.textPrimary,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  meta: {
    color: colors.textSecondary,
    fontSize: 15,
    marginTop: spacing.sm,
  },
  ratingBadge: {
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    borderRadius: radii.full,
    flexDirection: 'row',
    gap: 4,
    minHeight: 36,
    paddingHorizontal: spacing.sm,
  },
  ratingText: {
    color: colors.accent,
    fontSize: 34 / 2,
    fontWeight: '700',
  },
  tagsRow: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 60 / 2,
    fontWeight: '700',
  },
});
