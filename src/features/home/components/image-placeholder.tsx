import { StyleSheet, Text, View } from 'react-native';

import { colors, radii } from '@/src/theme/tokens';

type ImagePlaceholderProps = {
  alt: string;
};

export function ImagePlaceholder({ alt }: ImagePlaceholderProps) {
  return (
    <View accessibilityLabel={alt} accessibilityRole="image" accessible style={styles.container}>
      <Text style={styles.label}>Image Placeholder</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#30384B',
    borderTopLeftRadius: radii.lg,
    borderTopRightRadius: radii.lg,
    height: 128,
    justifyContent: 'center',
    width: '100%',
  },
  label: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
    opacity: 0.9,
    textTransform: 'uppercase',
  },
});
