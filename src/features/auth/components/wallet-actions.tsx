import { StyleSheet, View } from 'react-native';

import { spacing } from '@/src/theme/tokens';

import { walletActions } from '../data/login-content';
import { WalletButton } from './wallet-button';

type WalletActionsProps = {
  onActionPress?: () => void;
};

export function WalletActions({ onActionPress }: WalletActionsProps) {
  return (
    <View style={styles.container}>
      {walletActions.map((action) => (
        <WalletButton action={action} key={action.id} onPress={onActionPress} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
    marginTop: 52,
  },
});
