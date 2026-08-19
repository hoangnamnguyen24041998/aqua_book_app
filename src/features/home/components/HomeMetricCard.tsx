import { StyleSheet, Text, View } from 'react-native';

import { ThemeColors } from '@/components/swimbook/Theme';

export function HomeMetricCard({
  label,
  value,
  helper,
  compact = false,
}: {
  label: string;
  value: string;
  helper: string;
  compact?: boolean;
}) {
  return (
    <View style={[styles.card, compact && styles.compact]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value} numberOfLines={2}>
        {value}
      </Text>
      <Text style={styles.helper} numberOfLines={2}>
        {helper}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minHeight: 132,
    borderRadius: 28,
    padding: 18,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  compact: {
    minHeight: 108,
  },
  label: {
    color: 'rgba(243, 250, 249, 0.62)',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    fontSize: 11,
    marginBottom: 10,
  },
  value: {
    color: ThemeColors.white,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '700',
  },
  helper: {
    marginTop: 8,
    color: 'rgba(243, 250, 249, 0.72)',
    fontSize: 13,
    lineHeight: 18,
  },
});
