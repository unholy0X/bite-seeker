import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, spacing } from '@/src/theme/tokens';

import { InspiredActionsRow } from '../components/inspired-actions-row';
import { InspiredCarousel } from '../components/inspired-carousel';
import { GetInspiredHeader } from '../components/get-inspired-header';

type GetInspiredScreenProps = {
  onBackPress: () => void;
};

export function GetInspiredScreen({ onBackPress }: GetInspiredScreenProps) {
  const router = useRouter();

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
      <View style={styles.container}>
        <GetInspiredHeader onBackPress={onBackPress} />
        <InspiredCarousel />
        <InspiredActionsRow
          onCookPress={() =>
            router.push({
              params: { id: 'spicy-ramen' },
              pathname: '/recipe/[id]',
            })
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  safeArea: {
    backgroundColor: colors.background,
    flex: 1,
  },
});
