import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ScreenSkeleton, useMockLoading } from "@/components/swimbook/Skeleton";
import { ThemeColors } from "@/components/swimbook/Theme";
import { Spacing } from "@/constants/theme";
import { useSwimBook } from "@/context/SwimBookContext";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProgressRoute() {
  const { swimLogs } = useSwimBook();
  const isLoading = useMockLoading();
  const distance = swimLogs.reduce((total, log) => total + log.distance, 0);
  const laps = swimLogs.reduce((total, log) => total + log.laps, 0);
  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content}>
      <SafeAreaView style={styles.shell}>
        {isLoading ? (
          <ScreenSkeleton />
        ) : (
          <>
            <Text style={styles.kicker}>Training journal</Text>
            <Text style={styles.title}>Progress</Text>
            <View style={styles.metrics}>
              <Metric label="Distance" value={`${distance.toFixed(1)} km`} />
              <Metric label="Laps" value={String(laps)} />
              <Metric label="Sessions" value={String(swimLogs.length)} />
            </View>
            <Text style={styles.section}>Recent swims</Text>
            {swimLogs.map((log) => (
              <View style={styles.log} key={log.id}>
                <View>
                  <Text style={styles.logTitle}>{log.pool}</Text>
                  <Text style={styles.logMeta}>
                    {log.date} · {log.duration} min · {log.laps} laps
                  </Text>
                </View>
                <Text style={styles.logDistance}>
                  {log.distance.toFixed(1)} km
                </Text>
              </View>
            ))}
          </>
        )}
      </SafeAreaView>
    </ScrollView>
  );
}
function Metric({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.metric}>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: ThemeColors.deepPool },
  content: { padding: Spacing.four },
  shell: {
    gap: Spacing.three,
    maxWidth: 800,
    width: "100%",
    alignSelf: "center",
  },
  kicker: {
    color: ThemeColors.sunlitAqua,
    textTransform: "uppercase",
    letterSpacing: 1.6,
    fontSize: 12,
    fontWeight: "700",
  },
  title: { color: ThemeColors.white, fontSize: 30, fontWeight: "700" },
  metrics: { flexDirection: "row", gap: 10 },
  metric: {
    flex: 1,
    minHeight: 105,
    padding: 14,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  metricValue: { color: ThemeColors.white, fontSize: 19, fontWeight: "700" },
  metricLabel: { marginTop: 8, color: "rgba(255,255,255,0.7)", fontSize: 12 },
  section: {
    color: ThemeColors.white,
    fontSize: 19,
    fontWeight: "700",
    marginTop: 10,
  },
  log: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    padding: 16,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  logTitle: { color: ThemeColors.white, fontSize: 15, fontWeight: "700" },
  logMeta: { color: "rgba(255,255,255,0.66)", marginTop: 6, fontSize: 12 },
  logDistance: {
    color: ThemeColors.sunlitAqua,
    fontSize: 15,
    fontWeight: "700",
  },
});
