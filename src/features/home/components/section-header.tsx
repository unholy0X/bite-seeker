import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@/src/theme/tokens';

type SectionHeaderProps = {
  actionLabel: string;
  title: string;
};

export function SectionHeader({ actionLabel, title }: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.action}>{actionLabel}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  action: {
    color: colors.accent,
    fontSize: 15,
    fontWeight: '700',
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: colors.textPrimary,
    fontSize: 36 / 2,
    fontWeight: '700',
  },
});
