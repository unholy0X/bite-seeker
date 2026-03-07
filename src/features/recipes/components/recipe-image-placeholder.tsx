import { StyleSheet, Text, View } from 'react-native';

import { colors, radii } from '@/src/theme/tokens';

type RecipeImagePlaceholderProps = {
  alt: string;
  label: string;
  tint: string;
};

export function RecipeImagePlaceholder({ alt, label, tint }: RecipeImagePlaceholderProps) {
  return (
    <View accessibilityLabel={alt} accessibilityRole="image" accessible style={[styles.container, { backgroundColor: tint }]}>
      <View style={styles.badge}>
        <Text numberOfLines={1} style={styles.badgeText}>
          {label}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.14)',
    borderRadius: radii.full,
    justifyContent: 'center',
    minHeight: 44,
    minWidth: 44,
    paddingHorizontal: 10,
  },
  badgeText: {
    color: colors.textPrimary,
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.3,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  container: {
    alignItems: 'center',
    borderTopLeftRadius: radii.lg,
    borderTopRightRadius: radii.lg,
    height: 168,
    justifyContent: 'center',
    width: '100%',
  },
});
