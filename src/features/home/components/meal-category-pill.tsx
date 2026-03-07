import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing } from '@/src/theme/tokens';

import type { MealCategory } from '../data/home-content';
import { BreakfastSvgIcon, DinnerSvgIcon, LunchSvgIcon } from './meal-category-svgs';

type MealCategoryPillProps = {
  category: MealCategory;
};

export function MealCategoryPill({ category }: MealCategoryPillProps) {
  const selected = Boolean(category.selected);

  const renderIcon = () => {
    if (category.id === 'breakfast') {
      return <BreakfastSvgIcon selected={selected} />;
    }

    if (category.id === 'lunch') {
      return <LunchSvgIcon selected={selected} />;
    }

    if (category.id === 'dinner') {
      return <DinnerSvgIcon selected={selected} />;
    }

    return <Feather color={selected ? colors.accentText : colors.textSecondary} name={category.icon} size={23} />;
  };

  return (
    <Pressable style={styles.wrapper}>
      <View style={[styles.iconContainer, selected ? styles.activeIconContainer : styles.inactiveIconContainer]}>
        {renderIcon()}
      </View>
      <Text style={[styles.label, selected ? styles.activeLabel : styles.inactiveLabel]}>{category.label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  activeIconContainer: {
    backgroundColor: colors.accent,
  },
  activeLabel: {
    color: colors.textPrimary,
    fontWeight: '600',
  },
  iconContainer: {
    alignItems: 'center',
    borderRadius: radii.full,
    height: 90 / 2,
    justifyContent: 'center',
    width: 90 / 2,
  },
  inactiveIconContainer: {
    backgroundColor: colors.surfaceStrong,
  },
  inactiveLabel: {
    color: colors.textSecondary,
  },
  label: {
    fontSize: 16,
    marginTop: spacing.sm,
  },
  wrapper: {
    alignItems: 'center',
    flex: 1,
  },
});
