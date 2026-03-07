import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radii } from '@/src/theme/tokens';

type RecipesHeaderProps = {
  onAddPress: () => void;
};

export function RecipesHeader({ onAddPress }: RecipesHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Recipes</Text>
      <Pressable onPress={onAddPress} style={styles.addButton}>
        <Feather color={colors.accentText} name="plus" size={22} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  addButton: {
    alignItems: 'center',
    backgroundColor: colors.accent,
    borderRadius: radii.full,
    height: 52,
    justifyContent: 'center',
    width: 52,
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: colors.textPrimary,
    fontSize: 42 / 2,
    fontWeight: '700',
  },
});
