import { Alert, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, spacing } from '@/src/theme/tokens';

import { CookingPrimaryButton } from '../../components/cooking/cooking-primary-button';
import { CookingSecondaryButton } from '../../components/cooking/cooking-secondary-button';
import { CookingTopBar } from '../../components/cooking/cooking-top-bar';
import { InstructionCard } from '../../components/cooking/instruction-card';
import { ProTipCard } from '../../components/cooking/pro-tip-card';
import { StepProgressTrack } from '../../components/cooking/step-progress-track';
import { StepTimerCard } from '../../components/cooking/step-timer-card';
import { stepTwoContent } from '../../data/cooking-flow-content';

type CookingStepTwoScreenProps = {
  onBackPress: () => void;
  onNextPress: () => void;
  onPreviousPress: () => void;
};

export function CookingStepTwoScreen({
  onBackPress,
  onNextPress,
  onPreviousPress,
}: CookingStepTwoScreenProps) {
  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
      <View style={styles.container}>
        <View>
          <CookingTopBar onBackPress={onBackPress} title="Step 3 of 5" />
          <StepProgressTrack progress={0.6} />

          <InstructionCard description={stepTwoContent.description} title={stepTwoContent.title} />
          <StepTimerCard onPlayPress={() => Alert.alert('Timer', 'Timer started.')} time="03:30" />
          <ProTipCard description={stepTwoContent.tipDescription} title={stepTwoContent.tipTitle} />
        </View>

        <View style={styles.bottomButtons}>
          <View style={styles.buttonColumn}>
            <CookingSecondaryButton label="← Previous" onPress={onPreviousPress} />
          </View>
          <View style={styles.buttonColumn}>
            <CookingPrimaryButton label="Next →" onPress={onNextPress} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bottomButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  buttonColumn: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  safeArea: {
    backgroundColor: colors.background,
    flex: 1,
  },
});
