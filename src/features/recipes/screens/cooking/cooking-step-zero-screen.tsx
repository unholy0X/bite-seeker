import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, spacing } from '@/src/theme/tokens';

import { ChecklistCard } from '../../components/cooking/checklist-card';
import { CookingPrimaryButton } from '../../components/cooking/cooking-primary-button';
import { CookingTopBar } from '../../components/cooking/cooking-top-bar';
import { preflightItems } from '../../data/cooking-flow-content';

type CookingStepZeroScreenProps = {
  onBackPress: () => void;
  onNextPress: () => void;
};

export function CookingStepZeroScreen({ onBackPress, onNextPress }: CookingStepZeroScreenProps) {
  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
      <View style={styles.container}>
        <View>
          <CookingTopBar onBackPress={onBackPress} title="Before We Start" />
          <Text style={styles.subtitle}>Make sure you have everything ready:</Text>

          <View style={styles.listWrap}>
            {preflightItems.map((item) => (
              <ChecklistCard item={item} key={item.id} />
            ))}
          </View>
        </View>

        <CookingPrimaryButton label="I'm Ready! Let's Cook →" onPress={onNextPress} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  listWrap: {
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  safeArea: {
    backgroundColor: colors.background,
    flex: 1,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 16,
    marginTop: spacing.sm,
  },
});
