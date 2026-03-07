import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, spacing } from '@/src/theme/tokens';

import { BenefitsList } from '../components/benefits-list';
import { BrandIntro } from '../components/brand-intro';
import { TermsNotice } from '../components/terms-notice';
import { WalletActions } from '../components/wallet-actions';

type LoginScreenProps = {
  onWalletActionPress?: () => void;
  isLoading?: boolean;
  error?: string;
};

export function LoginScreen({ onWalletActionPress, isLoading, error }: LoginScreenProps) {
  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
      <View style={styles.container}>
        <View>
          <BrandIntro />
          <BenefitsList />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator color={colors.accent} size="large" />
            </View>
          ) : (
            <WalletActions onActionPress={onWalletActionPress} />
          )}
        </View>
        <TermsNotice />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: 84,
  },
  error: {
    color: '#FF6B6B',
    fontSize: 13,
    fontWeight: '500',
    marginTop: spacing.lg,
    textAlign: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    height: 68,
    justifyContent: 'center',
    marginTop: 52,
  },
  safeArea: {
    backgroundColor: colors.background,
    flex: 1,
  },
});
