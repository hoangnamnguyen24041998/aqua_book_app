import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { Badge } from '@/components/swimbook/Buttons';
import { ThemeColors } from '@/components/swimbook/Theme';
import type { Lane, Pool } from '@/context/SwimBookContext';

const markerPositions: Record<string, { left: string; top: string }> = {
  p1: { left: '19%', top: '46%' }, p2: { left: '67%', top: '26%' }, p3: { left: '58%', top: '65%' },
};

export function PoolMap({ pools, lanesData, selectedPool, onSelectPool }: {
  pools: Pool[]; lanesData: Record<string, Lane[]>; selectedPool: Pool | null; onSelectPool: (pool: Pool) => void;
}) {
  const available = (lanesData[selectedPool?.id ?? ''] ?? []).filter((l) => l.status === 'available').length;
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>MAP VIEW</Text>
          <Text style={styles.title}>Pools in your area</Text>
        </View>
        <Pressable onPress={() => Alert.alert("Location", "Synced with District 1.")} style={styles.location}>
          <Text style={styles.locationText}>📍 District 1 ▾</Text>
        </Pressable>
      </View>

      <View style={styles.map}>
        <View style={styles.roadOne} /><View style={styles.roadTwo} /><View style={styles.roadThree} />
        <View style={styles.water} /><View style={styles.blockOne} /><View style={styles.blockTwo} />

        {pools.map((p) => {
          const count = (lanesData[p.id] ?? []).filter((l) => l.status === 'available').length;
          const isSel = selectedPool?.id === p.id;
          return (
            <Pressable key={p.id} onPress={() => onSelectPool(p)} style={[styles.pin, markerPositions[p.id], isSel && styles.pinSel]}>
              <Text style={{ fontSize: 18 }}>{p.type === 'Indoor' ? '🌊' : '☀️'}</Text>
              <View style={[styles.pinCount, !count && { backgroundColor: ThemeColors.buoyCoral }]}><Text style={styles.pinCountText}>{count}</Text></View>
            </Pressable>
          );
        })}
        <View style={styles.tipBadge}><Text style={styles.mapCaption}>💡 Tap marker to compare pools</Text></View>
      </View>

      {selectedPool ? (
        <Pressable onPress={() => onSelectPool(selectedPool)} style={styles.selection}>
          <View style={{ flex: 1 }}>
            <View style={styles.selectionTitleRow}>
              <Text style={styles.selectionName} numberOfLines={1}>{selectedPool.name}</Text>
              <Text style={styles.ratingText}>★ {selectedPool.rating}</Text>
            </View>
            <Text style={styles.selectionMeta}>📍 {selectedPool.distance}  ·  🌡️ {selectedPool.waterTemp}</Text>
          </View>
          <Badge text={`${available} lanes free`} type={available ? 'accent' : 'coral'} />
        </Pressable>
      ) : (
        <View style={styles.noSelection}><Text style={styles.noSelectionText}>Select a marker on the map to see details</Text></View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 24, overflow: 'hidden', backgroundColor: ThemeColors.white, borderWidth: 1, borderColor: ThemeColors.border, shadowColor: '#0A2E36', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.05, shadowRadius: 15, elevation: 4, marginBottom: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  eyebrow: { color: ThemeColors.waterTeal, fontSize: 10, letterSpacing: 1.5, fontWeight: '800' }, 
  title: { color: ThemeColors.deepPool, fontSize: 17, fontWeight: '800', marginTop: 3 },
  location: { backgroundColor: ThemeColors.poolMist, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 12, borderWidth: 1, borderColor: '#D0EAF4' }, 
  locationText: { color: ThemeColors.deepPool, fontSize: 12, fontWeight: '700' },
  map: { height: 230, backgroundColor: '#E6F6F3', overflow: 'hidden', position: 'relative' },
  roadOne: { position: 'absolute', backgroundColor: 'rgba(255,255,255,0.92)', borderColor: 'rgba(132,184,177,0.38)', borderWidth: 1.5, width: '122%', height: 32, left: '-12%', top: 52, transform: [{ rotate: '-16deg' }] }, 
  roadTwo: { position: 'absolute', backgroundColor: 'rgba(255,255,255,0.92)', borderColor: 'rgba(132,184,177,0.38)', borderWidth: 1.5, width: '118%', height: 28, left: '-9%', top: 158, transform: [{ rotate: '17deg' }] }, 
  roadThree: { position: 'absolute', backgroundColor: 'rgba(255,255,255,0.92)', borderColor: 'rgba(132,184,177,0.38)', borderWidth: 1.5, width: 30, height: '120%', left: '46%', top: '-10%', transform: [{ rotate: '22deg' }] },
  water: { position: 'absolute', width: 190, height: 160, right: -60, bottom: -40, borderRadius: 95, backgroundColor: 'rgba(95,209,198,0.4)' }, 
  blockOne: { position: 'absolute', width: 75, height: 48, left: 20, top: 23, borderRadius: 12, backgroundColor: 'rgba(110,162,157,0.22)' }, 
  blockTwo: { position: 'absolute', width: 88, height: 64, right: 31, top: 86, borderRadius: 14, backgroundColor: 'rgba(110,162,157,0.19)' }, 
  pin: { position: 'absolute', width: 44, height: 44, borderRadius: 22, backgroundColor: ThemeColors.deepPool, alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: ThemeColors.white }, 
  pinSel: { backgroundColor: ThemeColors.waterTeal, borderColor: ThemeColors.sunlitAqua }, 
  pinCount: { position: 'absolute', right: -6, top: -6, height: 20, minWidth: 20, borderRadius: 10, backgroundColor: ThemeColors.sunlitAqua, borderWidth: 2, borderColor: ThemeColors.white, alignItems: 'center', justifyContent: 'center' }, 
  pinCountText: { color: ThemeColors.deepPool, fontSize: 9, fontWeight: '900' },
  tipBadge: { position: 'absolute', left: 14, bottom: 12, flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(10, 46, 54, 0.85)', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 12 },
  mapCaption: { color: ThemeColors.white, fontSize: 10, fontWeight: '700' },
  selection: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12, paddingHorizontal: 18, paddingVertical: 14, borderTopWidth: 1, borderTopColor: ThemeColors.border, backgroundColor: '#FAFCFC' }, 
  selectionTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 2 },
  selectionName: { color: ThemeColors.deepPool, fontSize: 14, fontWeight: '800', maxWidth: '80%' }, 
  ratingText: { fontSize: 11, fontWeight: '700', color: '#8A6200', backgroundColor: '#FFF8E7', paddingHorizontal: 6, paddingVertical: 1, borderRadius: 6 },
  selectionMeta: { color: ThemeColors.gray, fontSize: 11, fontWeight: '500' },
  noSelection: { padding: 16, alignItems: 'center', justifyContent: 'center', borderTopWidth: 1, borderTopColor: ThemeColors.border, backgroundColor: '#FAFCFC' },
  noSelectionText: { color: ThemeColors.gray, fontSize: 12, fontWeight: '500', fontStyle: 'italic' }
});
