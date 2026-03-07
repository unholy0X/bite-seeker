import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, spacing } from '@/src/theme/tokens';

import { FavoritesHeader } from '../components/favorites-header';
import { FavoritesList } from '../components/favorites-list';

type FavoritesScreenProps = {
  onBackPress: () => void;
};

export function FavoritesScreen({ onBackPress }: FavoritesScreenProps) {
  const router = useRouter();

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <FavoritesHeader onBackPress={onBackPress} />
        <FavoritesList
          onRecipePress={(recipeId) =>
            router.push({
              params: { id: recipeId },
              pathname: '/recipe/[id]',
            })
          }
        />
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bottomSpacer: {
    height: spacing.xxl,
  },
  content: {
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  safeArea: {
    backgroundColor: colors.background,
    flex: 1,
  },
});
