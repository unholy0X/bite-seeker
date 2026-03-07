import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing } from '@/src/theme/tokens';

import type { PreflightItem } from '../../data/cooking-flow-content';

type ChecklistCardProps = {
  item: PreflightItem;
};

export function ChecklistCard({ item }: ChecklistCardProps) {
  return (
    <View style={styles.card}>
      <View style={[styles.checkbox, item.checked ? styles.checkboxChecked : styles.checkboxUnchecked]}>
        {item.checked ? <Feather color={colors.accentText} name="check" size={15} /> : null}
      </View>
      <View style={styles.textWrap}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    flexDirection: 'row',
    minHeight: 88,
    paddingHorizontal: spacing.md,
  },
  checkbox: {
    alignItems: 'center',
    borderRadius: 8,
    height: 30,
    justifyContent: 'center',
    width: 30,
  },
  checkboxChecked: {
    backgroundColor: colors.accent,
  },
  checkboxUnchecked: {
    borderColor: colors.surfaceBorder,
    borderWidth: 2,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 16,
    marginTop: 2,
  },
  textWrap: {
    marginLeft: spacing.md,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 34 / 2,
    fontWeight: '700',
  },
});
