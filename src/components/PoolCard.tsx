import { Pressable, StyleSheet, Text, View } from "react-native";
import { Pool } from "@/context/SwimBookContext";
import { ThemeColors } from "@/components/swimbook/Theme";

type PoolCardProps = {
  pool: Pool;
  availableLanes: number;
  onPress: () => void;
};

export function PoolCard({ pool, availableLanes, onPress }: PoolCardProps) {
  const isAvailable = availableLanes > 0;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.poolCard, pressed && styles.pressed]}
    >
      <View style={styles.cardHeader}>
        <View style={[styles.poolAsset, pool.id === "p2" && styles.assetSunrise, pool.id === "p3" && styles.assetLab]}>
          <Text style={styles.poolAssetText}>{pool.type === "Indoor" ? "🌊" : "☀️"}</Text>
          <View style={styles.tempBadge}>
            <Text style={styles.tempBadgeText}>{pool.waterTemp}</Text>
          </View>
        </View>

        <View style={styles.poolMainInfo}>
          <View style={styles.nameRow}>
            <Text style={styles.poolName} numberOfLines={1}>{pool.name}</Text>
            <View style={styles.ratingBadge}>
              <Text style={styles.starIcon}>★</Text>
              <Text style={styles.ratingText}>{pool.rating.toFixed(1)}</Text>
            </View>
          </View>

          <Text style={styles.poolTypeSub}>{pool.type} Pool · {pool.lanesCount} Lanes total</Text>

          <View style={styles.quickBadges}>
            <View style={styles.quickBadge}>
              <Text style={styles.quickBadgeIcon}>📍</Text>
              <Text style={styles.quickBadgeText}>{pool.distance}</Text>
            </View>
            <View style={styles.quickBadge}>
              <Text style={styles.quickBadgeIcon}>🕒</Text>
              <Text style={styles.quickBadgeText}>{pool.openingHours.split('—')[0].trim()}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.divider} />
      <Text style={styles.poolDescription} numberOfLines={2}>{pool.description}</Text>

      <View style={styles.cardFooter}>
        <View style={styles.availabilityWrapper}>
          <View style={[styles.statusDot, isAvailable ? styles.dotAvailable : styles.dotBusy]} />
          <Text style={[styles.availabilityText, isAvailable ? styles.textAvailable : styles.textBusy]}>
            {isAvailable ? `${availableLanes} lanes available` : "Fully booked today"}
          </Text>
        </View>

        <View style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Book Lane</Text>
          <Text style={styles.bookButtonArrow}>➔</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  poolCard: {
    backgroundColor: ThemeColors.white,
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: ThemeColors.border,
    shadowColor: '#0A2E36',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  pressed: {
    transform: [{ scale: 0.98 }],
    borderColor: ThemeColors.waterTeal,
    shadowOpacity: 0.1,
  },
  cardHeader: { flexDirection: "row", alignItems: "center" },
  poolAsset: {
    width: 72,
    height: 72,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E1F2FF",
    marginRight: 14,
    position: 'relative',
    overflow: 'hidden',
  },
  assetSunrise: { backgroundColor: "#FFF2E2" },
  assetLab: { backgroundColor: "#F1EBFF" },
  poolAssetText: { fontSize: 28 },
  tempBadge: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(10, 46, 54, 0.75)',
    paddingVertical: 2,
    alignItems: 'center',
  },
  tempBadgeText: { color: ThemeColors.white, fontSize: 9, fontWeight: '700' },
  poolMainInfo: { flex: 1 },
  nameRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 4 },
  poolName: { fontSize: 16, fontWeight: "800", color: ThemeColors.deepPool, flex: 1, paddingRight: 8 },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8E7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#FFE0A3',
  },
  starIcon: { color: '#FFB300', fontSize: 11, marginRight: 3 },
  ratingText: { fontSize: 11, fontWeight: "700", color: '#8A6200' },
  poolTypeSub: { fontSize: 12, color: ThemeColors.gray, fontWeight: "500", marginBottom: 6 },
  quickBadges: { flexDirection: 'row', gap: 8 },
  quickBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: ThemeColors.poolMist, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  quickBadgeIcon: { fontSize: 10, marginRight: 4 },
  quickBadgeText: { fontSize: 11, color: ThemeColors.waterTeal, fontWeight: '600' },
  divider: { height: 1, backgroundColor: ThemeColors.lightGray, marginVertical: 12 },
  poolDescription: { fontSize: 12, color: ThemeColors.gray, lineHeight: 18, marginBottom: 12 },
  cardFooter: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  availabilityWrapper: { flexDirection: 'row', alignItems: 'center' },
  statusDot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
  dotAvailable: { backgroundColor: '#00C853' },
  dotBusy: { backgroundColor: ThemeColors.buoyCoral },
  availabilityText: { fontSize: 12, fontWeight: "600" },
  textAvailable: { color: '#00853C' },
  textBusy: { color: ThemeColors.buoyCoral },
  bookButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: ThemeColors.waterTeal, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10, gap: 4 },
  bookButtonText: { color: ThemeColors.white, fontSize: 11, fontWeight: '700' },
  bookButtonArrow: { color: ThemeColors.white, fontSize: 10 },
});

