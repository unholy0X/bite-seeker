import { CookingStepOneScreen } from './cooking-step-one-screen';
import { CookingStepThreeScreen } from './cooking-step-three-screen';
import { CookingStepTwoScreen } from './cooking-step-two-screen';
import { CookingStepZeroScreen } from './cooking-step-zero-screen';

type RecipeCookingScreenProps = {
  onBackToHomePress: () => void;
  onNextPress: () => void;
  onPreviousPress: () => void;
  step: number;
};

export function RecipeCookingScreen({ onBackToHomePress, onNextPress, onPreviousPress, step }: RecipeCookingScreenProps) {
  if (step <= 0) {
    return <CookingStepZeroScreen onBackPress={onPreviousPress} onNextPress={onNextPress} />;
  }

  if (step === 1) {
    return <CookingStepOneScreen onBackPress={onPreviousPress} onNextPress={onNextPress} />;
  }

  if (step === 2) {
    return (
      <CookingStepTwoScreen onBackPress={onPreviousPress} onNextPress={onNextPress} onPreviousPress={onPreviousPress} />
    );
  }

  return <CookingStepThreeScreen onBackToHomePress={onBackToHomePress} onPreviousPress={onPreviousPress} />;
}
