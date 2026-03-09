import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radii } from '@/src/theme/tokens';

type PantryHeaderProps = {
  onAddPress?: () => void;
  onMenuPress?: () => void;
};

export function PantryHeader({ onAddPress, onMenuPress }: PantryHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Pantry</Text>
      <View style={styles.actions}>
        {onMenuPress && (
          <Pressable onPress={onMenuPress} hitSlop={10} style={styles.menuButton}>
            <Feather color={colors.textSecondary} name="more-vertical" size={22} />
          </Pressable>
        )}
        <Pressable onPress={onAddPress} style={styles.addButton}>
          <Feather color={colors.accentText} name="plus" size={22} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  actions: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  addButton: {
    alignItems: 'center',
    backgroundColor: colors.accent,
    borderRadius: radii.full,
    height: 52,
    justifyContent: 'center',
    width: 52,
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menuButton: {
    alignItems: 'center',
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 32,
    fontWeight: '700',
  },
});
