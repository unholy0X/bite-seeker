import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, spacing } from '@/src/theme/tokens';

import { PantryHeader } from '../components/pantry-header';
import { PantrySearch } from '../components/pantry-search';
import { PantrySectionsList } from '../components/pantry-sections-list';

type PantryScreenProps = {
  onAddPress?: () => void;
};

export function PantryScreen({ onAddPress }: PantryScreenProps) {
  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <PantryHeader onAddPress={onAddPress} />
        <PantrySearch />
        <PantrySectionsList />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: spacing.xxl,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  safeArea: {
    backgroundColor: colors.background,
    flex: 1,
  },
});
