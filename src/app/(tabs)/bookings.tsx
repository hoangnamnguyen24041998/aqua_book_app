import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Badge } from "@/components/swimbook/Buttons";
import { ScreenSkeleton, useMockLoading } from "@/components/swimbook/Skeleton";
import { ThemeColors } from "@/components/swimbook/Theme";
import { Spacing } from "@/constants/theme";
import { useSwimBook } from "@/context/SwimBookContext";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BookingsRoute() {
  const { bookings } = useSwimBook();
  const isLoading = useMockLoading();
  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content}>
      <SafeAreaView style={styles.shell}>
        {isLoading ? (
          <ScreenSkeleton />
        ) : (
          <>
            <Text style={styles.kicker}>Your schedule</Text>
            <Text style={styles.title}>Bookings</Text>
            <Text style={styles.subtitle}>
              Everything you have planned for the water.
            </Text>
            {bookings.map((booking) => (
              <View key={booking.id} style={styles.card}>
                <View style={styles.row}>
                  <Badge
                    text={booking.status}
                    type={booking.status === "CONFIRMED" ? "accent" : "muted"}
                  />
                  <Text style={styles.price}>
                    {booking.price.toLocaleString("vi-VN")}₫
                  </Text>
                </View>
                <Text style={styles.cardTitle}>{booking.title}</Text>
                <Text style={styles.detail}>{booking.subtitle}</Text>
                <View style={styles.footer}>
                  <Text style={styles.time}>
                    {booking.date} · {booking.time}
                  </Text>
                  <Text style={styles.qr}>
                    {booking.checkedIn
                      ? "Checked in"
                      : `Code: ${booking.qrCode}`}
                  </Text>
                </View>
              </View>
            ))}
          </>
        )}
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: ThemeColors.poolMist },
  content: { padding: Spacing.four },
  shell: {
    gap: Spacing.three,
    maxWidth: 800,
    width: "100%",
    alignSelf: "center",
  },
  kicker: {
    color: ThemeColors.waterTeal,
    textTransform: "uppercase",
    letterSpacing: 1.6,
    fontSize: 12,
    fontWeight: "700",
  },
  title: { color: ThemeColors.deepPool, fontSize: 30, fontWeight: "700" },
  subtitle: { color: "#547176", fontSize: 15, marginBottom: 5 },
  card: {
    gap: 10,
    backgroundColor: ThemeColors.white,
    borderWidth: 1,
    borderColor: ThemeColors.border,
    borderRadius: 22,
    padding: 18,
  },
  row: { flexDirection: "row", justifyContent: "space-between" },
  price: { color: ThemeColors.deepPool, fontWeight: "700" },
  cardTitle: { color: ThemeColors.deepPool, fontSize: 18, fontWeight: "700" },
  detail: { color: "#547176", fontSize: 13 },
  footer: {
    borderTopWidth: 1,
    borderTopColor: ThemeColors.lightGray,
    paddingTop: 10,
    gap: 4,
  },
  time: { color: ThemeColors.waterTeal, fontSize: 13, fontWeight: "700" },
  qr: { color: ThemeColors.gray, fontSize: 12 },
});
