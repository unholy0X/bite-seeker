import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, spacing } from '@/src/theme/tokens';

import { AddItemHeader } from '../components/add-item/add-item-header';
import { AddToPantryButton } from '../components/add-item/add-to-pantry-button';
import { CategorySelector } from '../components/add-item/category-selector';
import { FormLabel } from '../components/add-item/form-label';
import { QuantityUnitRow } from '../components/add-item/quantity-unit-row';
import { SearchIngredientField } from '../components/add-item/search-ingredient-field';
import { TextField } from '../components/add-item/text-field';

type AddPantryScreenProps = {
  onBackPress: () => void;
};

export function AddPantryScreen({ onBackPress }: AddPantryScreenProps) {
  const [activeCategoryId, setActiveCategoryId] = useState('produce');

  const handleAddItem = () => {
    Alert.alert('Added', 'Pantry item added.');
  };

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
      <View style={styles.container}>
        <View>
          <AddItemHeader onBackPress={onBackPress} />
          <View style={styles.formSection}>
            <SearchIngredientField />
            <FormLabel text="Category" />
            <CategorySelector activeCategoryId={activeCategoryId} onCategoryChange={setActiveCategoryId} />
            <FormLabel text="Item Name" />
            <TextField placeholder="e.g. Fresh Tomatoes" />
            <QuantityUnitRow />
            <FormLabel text="Expiry Date" />
            <TextField placeholder="Select date" />
          </View>
        </View>

        <AddToPantryButton onPress={handleAddItem} />
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
  formSection: {
    marginTop: spacing.md,
  },
  safeArea: {
    backgroundColor: colors.background,
    flex: 1,
  },
});
