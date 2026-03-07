import { StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing } from '@/src/theme/tokens';

type MatchBadgeProps = {
  value: number;
};

export function MatchBadge({ value }: MatchBadgeProps) {
  return (
    <View style={styles.badge}>
      <Text style={styles.text}>{`${value}%`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignItems: 'center',
    backgroundColor: colors.accent,
    borderRadius: radii.full,
    minHeight: 24,
    justifyContent: 'center',
    minWidth: 48,
    paddingHorizontal: spacing.xs,
    position: 'absolute',
    right: -8,
    top: -8,
    zIndex: 2,
  },
  text: {
    color: colors.accentText,
    fontSize: 13,
    fontWeight: '700',
  },
});
