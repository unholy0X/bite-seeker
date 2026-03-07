import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing } from '@/src/theme/tokens';

export function HomeHeader() {
  return (
    <View style={styles.container}>
      <View style={styles.userBlock}>
        <View accessibilityLabel="User avatar placeholder" accessibilityRole="image" accessible style={styles.avatar}>
          <Text style={styles.avatarLabel}>C</Text>
        </View>
        <View>
          <Text style={styles.title}>Hey, Chef!</Text>
          <Text style={styles.subtitle}>12 tokens earned</Text>
        </View>
      </View>
      <Pressable style={styles.bellButton}>
        <Feather color={colors.textSecondary} name="bell" size={18} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    backgroundColor: '#7B5B4B',
    borderRadius: radii.full,
    height: 42,
    justifyContent: 'center',
    width: 42,
  },
  avatarLabel: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
  },
  bellButton: {
    alignItems: 'center',
    backgroundColor: colors.surfaceMuted,
    borderRadius: radii.full,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 16,
    marginTop: spacing.xxs,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 34 / 2,
    fontWeight: '700',
  },
  userBlock: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
  },
});
