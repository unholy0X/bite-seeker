import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/src/theme/tokens';

type AddItemHeaderProps = {
  onBackPress: () => void;
};

export function AddItemHeader({ onBackPress }: AddItemHeaderProps) {
  return (
    <View style={styles.container}>
      <Pressable onPress={onBackPress} style={styles.backButton}>
        <Feather color={colors.textSecondary} name="arrow-left" size={22} />
      </Pressable>
      <Text style={styles.title}>Add Item</Text>
      <View style={styles.rightSpacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    alignItems: 'center',
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rightSpacer: {
    height: 36,
    width: 36,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 36 / 2,
    fontWeight: '700',
  },
});
