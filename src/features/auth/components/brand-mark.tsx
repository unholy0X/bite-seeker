import { Feather } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import { colors, radii } from '@/src/theme/tokens';

export function BrandMark() {
  return (
    <View style={styles.glow}>
      <View style={styles.core}>
        <Feather color={colors.accent} name="star" size={46} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  glow: {
    alignItems: 'center',
    backgroundColor: colors.accentGlow,
    borderRadius: radii.full,
    height: 104,
    justifyContent: 'center',
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 26,
    width: 104,
  },
  core: {
    alignItems: 'center',
    backgroundColor: 'rgba(182, 255, 0, 0.06)',
    borderRadius: radii.full,
    height: 74,
    justifyContent: 'center',
    width: 74,
  },
});
