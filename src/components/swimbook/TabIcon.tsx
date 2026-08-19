import { ColorValue, StyleSheet, Text, View } from 'react-native';

import { ThemeColors } from './Theme';

const glyphs = { home: '⌂', explore: '⌕', bookings: '▣', progress: '↗', profile: '◉' } as const;
export function TabIcon({ name, color, focused }: { name: keyof typeof glyphs; color: ColorValue; focused: boolean }) {
  return <View style={[styles.wrap, focused && styles.active]}><Text style={[styles.icon, { color }]}>{glyphs[name]}</Text></View>;
}
const styles = StyleSheet.create({ wrap: { minWidth: 34, height: 28, alignItems: 'center', justifyContent: 'center', borderRadius: 12 }, active: { backgroundColor: 'rgba(20,125,125,0.10)' }, icon: { fontSize: 22, lineHeight: 25, fontWeight: '700' } });
