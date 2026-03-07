import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/src/theme/tokens';

type NewRecipeHeaderProps = {
  onBackPress: () => void;
};

export function NewRecipeHeader({ onBackPress }: NewRecipeHeaderProps) {
  return (
    <View style={styles.container}>
      <Pressable onPress={onBackPress} style={styles.sideButton}>
        <Feather color={colors.textSecondary} name="arrow-left" size={22} />
      </Pressable>
      <Text style={styles.title}>New Recipe</Text>
      <View style={styles.sideButton} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sideButton: {
    alignItems: 'center',
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 40 / 2,
    fontWeight: '700',
  },
});
