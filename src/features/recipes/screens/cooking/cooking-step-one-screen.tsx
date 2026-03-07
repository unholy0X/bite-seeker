import { Alert, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, spacing } from '@/src/theme/tokens';

import { CookingPrimaryButton } from '../../components/cooking/cooking-primary-button';
import { CookingTopBar } from '../../components/cooking/cooking-top-bar';
import { TimerControls } from '../../components/cooking/timer-controls';
import { TimerRing } from '../../components/cooking/timer-ring';
import { boilingStep } from '../../data/cooking-flow-content';

type CookingStepOneScreenProps = {
  onBackPress: () => void;
  onNextPress: () => void;
};

export function CookingStepOneScreen({ onBackPress, onNextPress }: CookingStepOneScreenProps) {
  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
      <View style={styles.container}>
        <View>
          <CookingTopBar onBackPress={onBackPress} title="Step 2 of 5" />

          <Text style={styles.stepTitle}>{boilingStep.subtitle}</Text>
          <View style={styles.ringWrap}>
            <TimerRing time={boilingStep.remaining} />
          </View>
          <Text style={styles.description}>{boilingStep.description}</Text>

          <View style={styles.controlsWrap}>
            <TimerControls
              onPausePress={() => Alert.alert('Timer', 'Timer paused.')}
              onPlayPress={() => Alert.alert('Timer', 'Timer started.')}
              onStopPress={() => Alert.alert('Timer', 'Timer stopped.')}
            />
          </View>
        </View>

        <View style={styles.buttonWrap}>
          <CookingPrimaryButton label="Next Step →" onPress={onNextPress} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonWrap: {
    paddingHorizontal: spacing.xxl,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  controlsWrap: {
    marginTop: spacing.xl,
  },
  description: {
    color: colors.textSecondary,
    fontSize: 17,
    lineHeight: 24,
    marginTop: spacing.lg,
    textAlign: 'center',
  },
  ringWrap: {
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  safeArea: {
    backgroundColor: colors.background,
    flex: 1,
  },
  stepTitle: {
    color: colors.textSecondary,
    fontSize: 34 / 2,
    marginTop: 72 / 2,
    textAlign: 'center',
  },
});
