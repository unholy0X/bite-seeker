import { Feather } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import { colors, radii, spacing } from '@/src/theme/tokens';
import { requestNotificationPermission } from '../../../../services/notifications';
import { useUserStore } from '../../../../store/userStore';
import { useAuthStore } from '../../../../store/authStore';

function hashStr(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = s.charCodeAt(i) + ((h << 5) - h);
  return Math.abs(h);
}

const AVATAR_COLORS = ['#7B5B4B', '#4B6B7B', '#5B7B4B', '#7B4B6B', '#4B5B7B', '#7B6B4B'];

type HomeHeaderProps = {
  onAddPress?: () => void;
};

export function HomeHeader({ onAddPress }: HomeHeaderProps) {
  const router = useRouter();
  const username = useUserStore((s) => s.username);
  const walletAddress = useAuthStore((s) => s.walletAddress);

  const seed = username || walletAddress || 'chef';
  const avatarColor = AVATAR_COLORS[hashStr(seed) % AVATAR_COLORS.length];
  const avatarLabel = (username || walletAddress || 'C')[0].toUpperCase();
  const displayName = username || (walletAddress ? `${walletAddress.slice(0, 4)}…${walletAddress.slice(-4)}` : 'Chef');

  return (
    <View style={styles.container}>
      <Pressable style={styles.userBlock} onPress={() => router.push('/profile')}>
        <View style={[styles.avatar, { backgroundColor: avatarColor }]}>
          <Text style={styles.avatarLabel}>{avatarLabel}</Text>
        </View>
        <View>
          <Text style={styles.title}>Hey, {displayName}!</Text>
        </View>
      </Pressable>
      <View style={styles.actions}>
        <Pressable
          style={styles.bellButton}
          onPress={async () => {
            const { status } = await Notifications.getPermissionsAsync();
            if (status === 'undetermined') {
              await requestNotificationPermission();
            } else {
              Linking.openSettings();
            }
          }}
        >
          <Feather color={colors.textSecondary} name="bell" size={18} />
        </Pressable>
        {onAddPress && (
          <Pressable onPress={onAddPress} style={styles.addButton}>
            <Feather color={colors.accentText} name="plus" size={20} />
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
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
  actions: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
  },
  addButton: {
    alignItems: 'center',
    backgroundColor: colors.accent,
    borderRadius: radii.full,
    height: 44,
    justifyContent: 'center',
    width: 44,
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
  title: {
    color: colors.textPrimary,
    fontSize: 17,
    fontWeight: '700',
  },
  userBlock: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
  },
});
