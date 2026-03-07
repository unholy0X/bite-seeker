import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/src/theme/tokens';

type CookingTopBarProps = {
  onBackPress?: () => void;
  title?: string;
};

export function CookingTopBar({ onBackPress, title }: CookingTopBarProps) {
  return (
    <View style={styles.container}>
      <Pressable disabled={!onBackPress} onPress={onBackPress} style={styles.sideButton}>
        {onBackPress ? <Feather color={colors.textSecondary} name="arrow-left" size={21} /> : null}
      </Pressable>
      <Text numberOfLines={1} style={styles.title}>
        {title ?? ''}
      </Text>
      <View style={styles.sideButton}>
        <Text style={styles.menuDots}>••</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menuDots: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 1,
  },
  sideButton: {
    alignItems: 'center',
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  title: {
    color: colors.textPrimary,
    flex: 1,
    fontSize: 38 / 2,
    fontWeight: '700',
    textAlign: 'center',
  },
});
