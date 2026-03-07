import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing } from '@/src/theme/tokens';

type InspiredActionsRowProps = {
  onCookPress: () => void;
};

function RoundIconButton({ icon, onPress }: { icon: 'x' | 'heart'; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.roundButton}>
      <Feather color={colors.textSecondary} name={icon} size={22} />
    </Pressable>
  );
}

export function InspiredActionsRow({ onCookPress }: InspiredActionsRowProps) {
  return (
    <View style={styles.row}>
      <RoundIconButton icon="x" onPress={() => {}} />
      <Pressable onPress={onCookPress} style={styles.cookButton}>
        <Feather color={colors.accentText} name="star" size={13} />
        <Text style={styles.cookLabel}>Cook This!</Text>
      </Pressable>
      <RoundIconButton icon="heart" onPress={() => {}} />
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
