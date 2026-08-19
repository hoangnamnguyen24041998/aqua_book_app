import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { ThemeColors } from './Theme';
import { useSwimBook } from '../../context/SwimBookContext';

export const WeatherCard: React.FC = () => {
  const { weatherState, toggleWeather } = useSwimBook();
  const ok = weatherState === 'perfect';
  return (
    <Pressable
      onPress={toggleWeather}
      style={[styles.wCard, !ok && { borderColor: ThemeColors.buoyCoral, backgroundColor: '#FFF8F6' }]}
    >
      <View style={styles.wRow}>
        <Text style={[styles.wTitle, !ok && { color: ThemeColors.buoyCoral }]}>
          {ok ? 'Perfect swimming conditions' : 'Swimming conditions may be poor'}
        </Text>
        <Text style={{ fontSize: 20 }}>{ok ? '☀️' : '⛈️'}</Text>
      </View>
      <View style={styles.wDetails}>
        <View style={styles.wCol}>
          <Text style={styles.wVal}>{ok ? '27°C' : '18°C'}</Text>
          <Text style={styles.wLbl}>Air Temp</Text>
        </View>
        <View style={styles.wCol}>
          <Text style={styles.wVal}>{ok ? 'Water 28°C' : 'Water 20°C'}</Text>
          <Text style={styles.wLbl}>Pool Temp</Text>
        </View>
        <View style={styles.wCol}>
          <Text style={[styles.wVal, !ok && { color: ThemeColors.buoyCoral }]}>{ok ? 'UV 4' : 'UV 1'}</Text>
          <Text style={styles.wLbl}>{ok ? 'Outdoor open' : 'Outdoor closed'}</Text>
        </View>
      </View>
      <Text style={{ fontSize: 9, color: ThemeColors.gray, textAlign: 'center', marginTop: 6, fontStyle: 'italic', fontFamily: 'Inter' }}>
        Tap card to toggle weather simulation
      </Text>
    </Pressable>
  );
};

export const Sparkline: React.FC = () => (
  <View style={styles.sparkRow}>
    {[15, 30, 20, 45, 38, 55, 48].map((pt, i) => (
      <View key={i} style={{ flex: 1, alignItems: 'center' }}>
        <View style={[styles.sparkBar, { height: pt }]} />
      </View>
    ))}
  </View>
);

export const SkeletonLoader: React.FC = () => (
  <View style={styles.skContainer}>
    <View style={styles.skHeader} />
    <View style={styles.skLine} />
    <View style={[styles.skLine, { width: '70%' }]} />
  </View>
);

const styles = StyleSheet.create({
  wCard: {
    backgroundColor: ThemeColors.white,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: ThemeColors.border,
    width: '100%',
    marginVertical: 4
  },
  wRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6
  },
  wTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: ThemeColors.deepPool,
    fontFamily: 'Inter',
    flex: 1,
    paddingRight: 4
  },
  wDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2
  },
  wCol: { alignItems: 'flex-start' },
  wVal: {
    fontSize: 13,
    fontWeight: '700',
    color: ThemeColors.deepPool,
    fontFamily: 'JetBrains Mono'
  },
  wLbl: {
    fontSize: 9,
    color: ThemeColors.gray,
    fontFamily: 'Inter',
    marginTop: 2
  },
  sparkRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 36,
    width: '100%',
    paddingVertical: 2
  },
  sparkBar: {
    backgroundColor: ThemeColors.waterTeal,
    width: 3,
    borderRadius: 1.5,
    minHeight: 4
  },
  skContainer: {
    width: '100%',
    padding: 12,
    backgroundColor: ThemeColors.white,
    borderRadius: 12,
    marginVertical: 4,
    gap: 4
  },
  skHeader: {
    height: 12,
    width: '40%',
    backgroundColor: '#EAEAEA',
    borderRadius: 3
  },
  skLine: {
    height: 7,
    width: '100%',
    backgroundColor: '#F3F3F3',
    borderRadius: 3
  }
});