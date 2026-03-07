import { ActivityIndicator, Text, View } from 'react-native';

import { colors, spacing } from '@/src/theme/tokens';

import { usePantryStore } from '../../../../store';
import { PantrySectionCard } from './pantry-section-card';

const CATEGORY_ICONS: Record<string, string> = {
  dairy: 'lock',
  produce: 'circle',
  proteins: 'arrow-up',
  bakery: 'package',
  spices: 'feather',
  pantry: 'archive',
  beverages: 'droplet',
  condiments: 'sliders',
  snacks: 'coffee',
  frozen: 'wind',
  household: 'home',
  other: 'more-horizontal',
};

const CATEGORY_COLORS: Record<string, string> = {
  dairy: '#FFC400',
  produce: '#00D4A6',
  proteins: '#FF6B6B',
  bakery: '#FF9E00',
  spices: '#E040FB',
  pantry: '#7C4DFF',
  beverages: '#00B0FF',
  condiments: '#FF6D00',
  snacks: '#76FF03',
  frozen: '#40C4FF',
  household: '#B0BEC5',
  other: '#9AA0AE',
};

export function PantrySectionsList() {
  const { groups, isLoading } = usePantryStore();

  if (isLoading && (!groups || groups.length === 0)) {
    return (
      <View style={{ alignItems: 'center', marginTop: spacing.xl }}>
        <ActivityIndicator color={colors.accent} />
      </View>
    );
  }

  if (!groups || groups.length === 0) {
    return (
      <View style={{ alignItems: 'center', marginTop: spacing.xl }}>
        <Text style={{ color: colors.textMuted, fontSize: 14 }}>
          Your pantry is empty. Add some items!
        </Text>
      </View>
    );
  }

  const sections = groups.map((group: any) => ({
    id: group.category,
    title: group.category.charAt(0).toUpperCase() + group.category.slice(1),
    icon: CATEGORY_ICONS[group.category] || 'more-horizontal',
    iconColor: CATEGORY_COLORS[group.category] || '#9AA0AE',
    itemCountLabel: `${group.items?.length ?? 0} items`,
    items: (group.items || []).map((item: any) => ({
      id: item.id,
      name: item.name,
      count: item.quantity ? Number(item.quantity) : 0,
    })),
  }));

  return (
    <View>
      {sections.map((section: any) => (
        <PantrySectionCard key={section.id} section={section} />
      ))}
    </View>
  );
}
