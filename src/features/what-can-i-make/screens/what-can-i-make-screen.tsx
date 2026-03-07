import { useRouter } from 'expo-router';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, spacing } from '@/src/theme/tokens';

import { AddMissingItemsCard } from '../components/add-missing-items-card';
import { MatchRecipesList } from '../components/match-recipes-list';
import { WhatCanIMakeHeader } from '../components/what-can-i-make-header';

type WhatCanIMakeScreenProps = {
  onBackPress: () => void;
};

export function WhatCanIMakeScreen({ onBackPress }: WhatCanIMakeScreenProps) {
  const router = useRouter();

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <WhatCanIMakeHeader onBackPress={onBackPress} />
        <MatchRecipesList
          onRecipePress={(recipeId) =>
            router.push({
              params: { id: recipeId },
              pathname: '/recipe/[id]',
            })
          }
        />
        <AddMissingItemsCard onPress={() => Alert.alert('Shopping', 'Missing items will be added soon.')} />
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
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  safeArea: {
    backgroundColor: colors.background,
    flex: 1,
  },
});
