import { Alert, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, spacing } from '@/src/theme/tokens';

import { CookServeRow } from '../components/new-recipe/cook-serve-row';
import { GenerateAiCard } from '../components/new-recipe/generate-ai-card';
import { NewRecipeHeader } from '../components/new-recipe/new-recipe-header';
import { NewRecipeInput } from '../components/new-recipe/new-recipe-input';
import { NewRecipeLabel } from '../components/new-recipe/new-recipe-label';
import { NewRecipeTextArea } from '../components/new-recipe/new-recipe-textarea';
import { NextStepButton } from '../components/new-recipe/next-step-button';
import { StepIndicator } from '../components/new-recipe/step-indicator';

type NewRecipeScreenProps = {
  onBackPress: () => void;
};

export function NewRecipeScreen({ onBackPress }: NewRecipeScreenProps) {
  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
      <View style={styles.container}>
        <View>
          <NewRecipeHeader onBackPress={onBackPress} />
          <StepIndicator />
          <Text style={styles.sectionTitle}>Basic Info</Text>

          <NewRecipeLabel text="Recipe Name" />
          <NewRecipeInput placeholder="Enter recipe name..." />

          <NewRecipeLabel text="Description" />
          <NewRecipeTextArea placeholder="Describe your recipe..." />

          <CookServeRow />
          <GenerateAiCard onPress={() => Alert.alert('AI', 'AI recipe generation coming soon.')} />
        </View>

        <NextStepButton onPress={() => Alert.alert('Next Step', 'Next step flow will be connected next.')} />
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
  safeArea: {
    backgroundColor: colors.background,
    flex: 1,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 42 / 2,
    fontWeight: '700',
    marginTop: spacing.lg,
  },
});
