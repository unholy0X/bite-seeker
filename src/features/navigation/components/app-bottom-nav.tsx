import { usePathname, useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '@/src/theme/tokens';

import { appTabs } from '../data/tabs';
import { NavTabItem } from './nav-tab-item';

export function AppBottomNav() {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const router = useRouter();
  const normalizedPathname = pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname;

  return (
    <View style={[styles.wrapper, { paddingBottom: Math.max(insets.bottom, 14) }]}>
      <View style={styles.inner}>
        {appTabs.map((tab) => (
          <NavTabItem
            active={tab.matchPathnames.includes(normalizedPathname)}
            key={tab.id}
            onPress={() => router.replace(tab.href)}
            tab={tab}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inner: {
    backgroundColor: colors.background,
    borderTopColor: colors.divider,
    borderTopWidth: 1,
    flexDirection: 'row',
    minHeight: 66,
    paddingHorizontal: 8,
  },
  wrapper: {
    backgroundColor: colors.background,
  },
});
