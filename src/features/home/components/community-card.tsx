import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { colors, radii, spacing } from '@/src/theme/tokens';
import { SEEKER_BUY_URL } from '@/constants/solana';

function FlameIcon() {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2C12 2 7 8 7 13a5 5 0 0 0 10 0c0-3-2-6-2-6s-1 3-3 3c-1 0-2-1-2-2 0-2 2-6 2-6z"
        fill="#B6FF00"
        opacity={0.9}
      />
      <Path
        d="M12 14c0 1.1-.9 2-2 2"
        stroke="#B6FF00"
        strokeWidth={1.5}
        strokeLinecap="round"
        opacity={0.5}
      />
    </Svg>
  );
}

function SeekerLogo() {
  return (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none">
      <Circle cx="16" cy="16" r="16" fill="rgba(182,255,0,0.12)" />
      <Circle cx="16" cy="16" r="10" fill="rgba(182,255,0,0.08)" stroke="rgba(182,255,0,0.4)" strokeWidth="1" />
      <Circle cx="16" cy="16" r="4" fill="#B6FF00" opacity={0.9} />
      <Path d="M16 6v4M16 22v4M6 16h4M22 16h4" stroke="rgba(182,255,0,0.3)" strokeWidth="1.5" strokeLinecap="round" />
    </Svg>
  );
}

export function CommunityCard() {
  return (
    <View style={styles.card}>
      {/* Glow accent */}
      <View style={styles.glowBlob} />

      {/* Top row */}
      <View style={styles.topRow}>
        <SeekerLogo />
        <View style={styles.tagPill}>
          <Text style={styles.tagText}>SEEKER COMMUNITY</Text>
        </View>
      </View>

      {/* Headline */}
      <Text style={styles.headline}>Built by Seekers,{'\n'}for Seekers.</Text>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Burn row */}
      <View style={styles.burnRow}>
        <View style={styles.burnIconWrap}>
          <FlameIcon />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.burnTitle}>50% of all SKR collected is burned</Text>
          <Text style={styles.burnSub}>
            Every extraction fee directly reduces SKR supply — giving back to every holder in the community.
          </Text>
        </View>
      </View>

      {/* Stats row */}
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>10 SKR</Text>
          <Text style={styles.statLabel}>per extraction</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>50%</Text>
          <Text style={styles.statLabel}>burned forever</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>1K SKR</Text>
          <Text style={styles.statLabel}>= Pro tier</Text>
        </View>
      </View>

      {/* CTA */}
      <Pressable
        style={({ pressed }) => [styles.cta, pressed && { opacity: 0.8 }]}
        onPress={() => Linking.openURL(SEEKER_BUY_URL).catch(() => {})}
      >
        <Text style={styles.ctaText}>Get SKR on Jupiter →</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: 'rgba(182,255,0,0.15)',
    marginTop: spacing.xl,
    overflow: 'hidden',
    padding: spacing.lg,
  },
  glowBlob: {
    position: 'absolute',
    top: -30,
    right: -30,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(182,255,0,0.07)',
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  tagPill: {
    backgroundColor: 'rgba(182,255,0,0.1)',
    borderRadius: radii.full,
    borderWidth: 1,
    borderColor: 'rgba(182,255,0,0.2)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
  },
  tagText: {
    color: colors.accent,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.2,
  },

  headline: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.5,
    lineHeight: 30,
    marginBottom: spacing.md,
  },

  divider: {
    height: 1,
    backgroundColor: colors.divider,
    marginBottom: spacing.md,
  },

  burnRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  burnIconWrap: {
    width: 32,
    height: 32,
    borderRadius: radii.sm,
    backgroundColor: 'rgba(182,255,0,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  burnTitle: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  burnSub: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 19,
  },

  statsRow: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceStrong,
    borderRadius: radii.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    color: colors.accent,
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  statLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '500',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 28,
    backgroundColor: colors.divider,
  },

  cta: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  ctaText: {
    color: colors.accent,
    fontSize: 14,
    fontWeight: '600',
  },
});
