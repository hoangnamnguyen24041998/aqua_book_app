import { StyleSheet, Text, View } from 'react-native';

import { Badge } from '@/components/swimbook/Buttons';
import { ThemeColors } from '@/components/swimbook/Theme';
import { Spacing } from '@/constants/theme';

export function HomeHeroCard({
  title,
  subtitle,
  statusLabel,
  statusTone,
}: {
  title: string;
  subtitle: string;
  statusLabel: string;
  statusTone: 'accent' | 'coral';
}) {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Badge text="Premium booking" type="muted" />
        <Badge text={statusLabel} type={statusTone} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <View style={styles.glow} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    borderRadius: 32,
    padding: Spacing.four,
    gap: Spacing.three,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  title: {
    color: ThemeColors.white,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
    letterSpacing: -0.4,
  },
  subtitle: {
    color: 'rgba(243, 250, 249, 0.78)',
    fontSize: 15,
    lineHeight: 22,
  },
  glow: {
    position: 'absolute',
    right: -32,
    top: -36,
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: 'rgba(95, 209, 198, 0.25)',
  },
});
