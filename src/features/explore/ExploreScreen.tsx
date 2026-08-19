import { ScrollView, StyleSheet, Text, View } from "react-native";

import { ThemeColors } from "@/components/swimbook/Theme";
import { MaxContentWidth, Spacing } from "@/constants/theme";
import { ScreenSkeleton, useMockLoading } from "@/components/swimbook/Skeleton";
import { useSwimBook } from "@/context/SwimBookContext";
import { PoolMap } from "./components/PoolMap";
import { PoolCard } from "../../components/PoolCard";
import { SafeAreaView } from "react-native-safe-area-context";

export function ExploreScreen() {
  const { pools, lanesData, selectedPool, setSelectedPool } = useSwimBook();
  const isLoading = useMockLoading();
  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content}>
      <SafeAreaView style={styles.shell}>
        {isLoading ? (
          <ScreenSkeleton />
        ) : (
          <>
            <Text style={styles.kicker}>Explore</Text>
            <Text style={styles.title}>
              Find a lane that fits your next session.
            </Text>
            <PoolMap
              pools={pools}
              lanesData={lanesData}
              selectedPool={selectedPool}
              onSelectPool={setSelectedPool}
            />
            <Text style={styles.sectionTitle}>Pools nearby</Text>
            {pools.map((pool) => (
              <PoolCard
                key={pool.id}
                pool={pool}
                availableLanes={
                  (lanesData[pool.id] ?? []).filter(
                    (lane) => lane.status === "available",
                  ).length
                }
                onPress={() => setSelectedPool(pool)}
              />
            ))}
          </>
        )}
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: ThemeColors.poolMist,
  },
  content: {
    padding: Spacing.md,
    paddingBottom: 64,
  },
  shell: {
    maxWidth: MaxContentWidth,
    width: "100%",
    alignSelf: "center",
    padding: 16,
  },
  kicker: {
    color: ThemeColors.waterTeal,
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1.2,
    marginBottom: Spacing.sm,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: ThemeColors.deepPool,
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: ThemeColors.deepPool,
    marginTop: Spacing.xl,
    marginBottom: Spacing.md,
  },
});
