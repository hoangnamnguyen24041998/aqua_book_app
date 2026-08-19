import { StyleSheet, Text, View } from 'react-native';

import { ThemeColors } from '@/components/swimbook/Theme';

export function HomeStatList({
  stats,
}: {
  stats: {
    distance: string;
    laps: string;
    duration: string;
  };
}) {
  return (
    <View style={styles.row}>
      <View style={styles.stat}>
        <Text style={styles.value}>{stats.distance}</Text>
        <Text style={styles.label}>Distance</Text>
      </View>
      <View style={styles.stat}>
        <Text style={styles.value}>{stats.laps}</Text>
        <Text style={styles.label}>Laps</Text>
      </View>
      <View style={styles.stat}>
        <Text style={styles.value}>{stats.duration}</Text>
        <Text style={styles.label}>Duration</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  stat: {
    flex: 1,
    borderRadius: 22,
    paddingVertical: 16,
    paddingHorizontal: 14,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  value: {
    color: ThemeColors.white,
    fontSize: 18,
    fontWeight: '700',
  },
  label: {
    marginTop: 6,
    color: 'rgba(243, 250, 249, 0.62)',
    fontSize: 12,
  },
});
