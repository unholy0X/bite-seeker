import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing } from '@/src/theme/tokens';

export function TermsNotice() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>By connecting, you agree to our Terms of Service</Text>
      <Text style={styles.text}>
        Powered by <Text style={styles.highlight}>Solana.</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  highlight: {
    color: colors.accent,
    fontWeight: '600',
  },
  text: {
    color: colors.textMuted,
    fontSize: 26 / 2,
    fontWeight: '500',
    lineHeight: 34 / 2,
  },
});
