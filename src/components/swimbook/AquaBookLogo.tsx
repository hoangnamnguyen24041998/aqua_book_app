import { StyleSheet, Text, View } from 'react-native';

import { ThemeColors } from './Theme';

export function AquaBookLogo({ light = false, compact = false }: { light?: boolean; compact?: boolean }) {
  const textColor = light ? ThemeColors.white : ThemeColors.deepPool;
  return <View style={styles.row} accessibilityRole="image" accessibilityLabel="AquaBook">
    <View style={styles.mark}><View style={styles.drop} /><View style={styles.waveOne} /><View style={styles.waveTwo} /></View>
    {!compact && <View><Text style={[styles.wordmark, { color: textColor }]}>Aqua<Text style={styles.book}>Book</Text></Text><Text style={[styles.tagline, { color: light ? 'rgba(255,255,255,0.7)' : ThemeColors.gray }]}>SWIM ON YOUR SCHEDULE</Text></View>}
  </View>;
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 9 }, mark: { width: 38, height: 38, borderRadius: 14, backgroundColor: ThemeColors.waterTeal, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' },
  drop: { width: 13, height: 18, borderRadius: 12, backgroundColor: ThemeColors.sunlitAqua, transform: [{ rotate: '45deg' }], marginTop: -5 },
  waveOne: { position: 'absolute', width: 29, height: 12, bottom: 5, borderTopWidth: 2, borderColor: ThemeColors.white, borderRadius: 20, transform: [{ rotate: '-8deg' }] },
  waveTwo: { position: 'absolute', width: 23, height: 10, bottom: 1, borderTopWidth: 2, borderColor: 'rgba(255,255,255,0.7)', borderRadius: 20, transform: [{ rotate: '8deg' }] },
  wordmark: { fontSize: 21, letterSpacing: -0.7, fontWeight: '800' }, book: { color: ThemeColors.waterTeal }, tagline: { fontSize: 7, letterSpacing: 1.15, fontWeight: '700', marginTop: 1 },
});
