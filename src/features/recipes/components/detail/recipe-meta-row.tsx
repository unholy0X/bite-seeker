import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing } from '@/src/theme/tokens';

type RecipeMetaRowProps = {
  rating: string;
  servings: string;
  time: string;
};

function MetaItem({ icon, value }: { icon: 'clock' | 'users' | 'star'; value: string }) {
  return (
    <View style={styles.metaItem}>
      <Feather color={colors.textMuted} name={icon} size={14} />
      <Text style={styles.metaText}>{value}</Text>
    </View>
  );
}

export function RecipeMetaRow({ rating, servings, time }: RecipeMetaRowProps) {
  return (
    <View style={styles.container}>
      <MetaItem icon="clock" value={time} />
      <MetaItem icon="users" value={servings} />
      <MetaItem icon="star" value={rating} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.md,
  },
  metaItem: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  metaText: {
    color: colors.textSecondary,
    fontSize: 15,
    fontWeight: '500',
  },
});
