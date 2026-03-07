import { Alert, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, radii, spacing } from '@/src/theme/tokens';

import { CompletionStatCard } from '../../components/cooking/completion-stat-card';
import { CookingPrimaryButton } from '../../components/cooking/cooking-primary-button';
import { CookingSecondaryButton } from '../../components/cooking/cooking-secondary-button';
import { CookingTopBar } from '../../components/cooking/cooking-top-bar';
import { completionStats } from '../../data/cooking-flow-content';

type CookingStepThreeScreenProps = {
  onBackToHomePress: () => void;
  onPreviousPress: () => void;
};

export function CookingStepThreeScreen({ onBackToHomePress, onPreviousPress }: CookingStepThreeScreenProps) {
  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
      <View style={styles.container}>
        <View>
          <CookingTopBar />

          <Text style={styles.party}>🎉</Text>
          <Text style={styles.title}>Bon Appetit!</Text>
          <Text style={styles.subtitle}>
            You&apos;ve earned <Text style={styles.accentText}>+5 tokens</Text> for completing this recipe!
          </Text>

          <View accessibilityLabel="Completed recipe image placeholder" accessibilityRole="image" accessible style={styles.heroCircle}>
            <Text style={styles.heroText}>Dish</Text>
          </View>

          <View style={styles.statsRow}>
            {completionStats.map((stat) => (
              <CompletionStatCard key={stat.id} stat={stat} />
            ))}
          </View>

          <View style={styles.actionsRow}>
            <View style={styles.actionColumn}>
              <CookingSecondaryButton label="Share" onPress={() => Alert.alert('Share', 'Share flow coming soon.')} />
            </View>
            <View style={styles.actionColumn}>
              <CookingSecondaryButton label="Rate" onPress={() => Alert.alert('Rate', 'Rating flow coming soon.')} />
            </View>
          </View>

          <View style={styles.previousWrap}>
            <CookingSecondaryButton label="← Previous" onPress={onPreviousPress} />
          </View>
        </View>

        <CookingPrimaryButton label="Back to Home" onPress={onBackToHomePress} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  accentText: {
    color: colors.accent,
    fontWeight: '700',
  },
  actionColumn: {
    flex: 1,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  heroCircle: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#2C1806',
    borderColor: colors.accent,
    borderRadius: radii.full,
    borderWidth: 4,
    height: 220 / 2,
    justifyContent: 'center',
    marginTop: spacing.lg,
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    width: 220 / 2,
  },
  heroText: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  party: {
    fontSize: 60 / 2,
    marginTop: spacing.lg,
    textAlign: 'center',
  },
  previousWrap: {
    marginTop: spacing.sm,
  },
  safeArea: {
    backgroundColor: colors.background,
    flex: 1,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 33 / 2,
    lineHeight: 46 / 2,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  title: {
    color: colors.textPrimary,
    fontSize: 64 / 2,
    fontWeight: '700',
    marginTop: spacing.sm,
    textAlign: 'center',
  },
});
