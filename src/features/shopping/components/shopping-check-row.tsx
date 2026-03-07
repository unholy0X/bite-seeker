import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@/src/theme/tokens';

import type { ShoppingItem } from '../data/shopping-content';

type ShoppingCheckRowProps = {
  item: ShoppingItem;
};

export function ShoppingCheckRow({ item }: ShoppingCheckRowProps) {
  return (
    <View style={styles.row}>
      <View style={[styles.checkbox, item.checked ? styles.checkedBox : styles.uncheckedBox]}>
        {item.checked ? <Feather color={colors.accentText} name="check" size={13} /> : null}
      </View>
      <Text style={[styles.label, item.checked ? styles.checkedLabel : styles.uncheckedLabel]}>{item.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  checkbox: {
    alignItems: 'center',
    borderRadius: 6,
    height: 24,
    justifyContent: 'center',
    width: 24,
  },
  checkedBox: {
    backgroundColor: colors.accent,
  },
  checkedLabel: {
    color: colors.textMuted,
    textDecorationLine: 'line-through',
  },
  label: {
    fontSize: 31 / 2,
    marginLeft: 10,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  uncheckedBox: {
    borderColor: colors.surfaceBorder,
    borderWidth: 2,
  },
  uncheckedLabel: {
    color: colors.textPrimary,
  },
});
