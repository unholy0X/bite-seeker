import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing } from '@/src/theme/tokens';

type InspiredActionsRowProps = {
  onCookPress: () => void;
  onSkipPress: () => void;
  onFavoritePress: () => void;
  isFavorited: boolean;
};

export function InspiredActionsRow({ onCookPress, onSkipPress, onFavoritePress, isFavorited }: InspiredActionsRowProps) {
  return (
    <View style={styles.row}>
      <Pressable
        onPress={onSkipPress}
        style={({ pressed }) => [styles.roundButton, pressed && { opacity: 0.7 }]}
        hitSlop={8}
      >
        <Feather color={colors.textSecondary} name="x" size={22} />
      </Pressable>

      <Pressable
        onPress={onCookPress}
        style={({ pressed }) => [styles.cookButton, pressed && { opacity: 0.85 }]}
      >
        <Feather color={colors.accentText} name="star" size={13} />
        <Text style={styles.cookLabel}>Cook This!</Text>
      </Pressable>

      <Pressable
        onPress={onFavoritePress}
        style={({ pressed }) => [styles.roundButton, pressed && { opacity: 0.7 }]}
        hitSlop={8}
      >
        <Feather
          color={isFavorited ? colors.accent : colors.textSecondary}
          name="heart"
          size={22}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  cookButton: {
    alignItems: 'center',
    backgroundColor: colors.accent,
    borderRadius: radii.full,
    flexDirection: 'row',
    gap: spacing.xs,
    height: 64,
    justifyContent: 'center',
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.28,
    shadowRadius: 14,
    width: 190,
  },
  cookLabel: {
    color: colors.accentText,
    fontSize: 38 / 2,
    fontWeight: '700',
  },
  roundButton: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.full,
    height: 64,
    justifyContent: 'center',
    width: 64,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.lg,
    width: '100%',
  },
});
