import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ScreenSkeleton, useMockLoading } from "@/components/swimbook/Skeleton";
import { ThemeColors } from "@/components/swimbook/Theme";
import { Spacing } from "@/constants/theme";
import { useSwimBook } from "@/context/SwimBookContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function ProfileRoute() {
  const { userName, userLevel, notifications, logout } = useSwimBook();
  const router = useRouter();
  const isLoading = useMockLoading();
  const unread = notifications.filter((item) => item.unread).length;
  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content}>
      <SafeAreaView style={styles.shell}>
        {isLoading ? (
          <ScreenSkeleton cards={4} />
        ) : (
          <>
            <Text style={styles.kicker}>Member profile</Text>
            <View style={styles.hero}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {userName.slice(0, 1).toUpperCase()}
                </Text>
              </View>
              <View>
                <Text style={styles.name}>{userName}</Text>
                <Text style={styles.level}>
                  {userLevel} swimmer · AquaBook member
                </Text>
              </View>
            </View>
            <Text style={styles.section}>Account</Text>
            <Row title="Swim level" value={userLevel} />
            <Row title="Notifications" value={`${unread} unread`} />
            <Row title="Preferred session" value="Morning lanes" />
            <Pressable
              onPress={() =>
                Alert.alert(
                  "Mock settings",
                  "Profile preferences will be connected when the API is ready.",
                )
              }
              style={styles.setting}
            >
              <Text style={styles.settingText}>Manage preferences</Text>
              <Text style={styles.chevron}>›</Text>
            </Pressable>
            <Pressable onPress={() => { logout(); router.replace("/login"); }} style={styles.logout}>
              <Text style={styles.logoutText}>Log out</Text>
            </Pressable>
          </>
        )}
      </SafeAreaView>
    </ScrollView>
  );
}
function Row({ title, value }: { title: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowTitle}>{title}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
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
  hero: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 18,
    borderRadius: 24,
    backgroundColor: ThemeColors.deepPool,
  },
  avatar: {
    height: 56,
    width: 56,
    borderRadius: 28,
    backgroundColor: ThemeColors.sunlitAqua,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { color: ThemeColors.deepPool, fontSize: 24, fontWeight: "800" },
  name: { color: ThemeColors.white, fontSize: 21, fontWeight: "700" },
  level: { color: "rgba(255,255,255,0.72)", marginTop: 4, fontSize: 13 },
  section: {
    color: ThemeColors.deepPool,
    fontSize: 18,
    fontWeight: "700",
    marginTop: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomColor: ThemeColors.border,
    borderBottomWidth: 1,
  },
  rowTitle: { color: ThemeColors.deepPool, fontSize: 15 },
  rowValue: { color: ThemeColors.waterTeal, fontSize: 13, fontWeight: "700" },
  setting: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: ThemeColors.white,
    borderRadius: 16,
    padding: 16,
  },
  settingText: { color: ThemeColors.deepPool, fontWeight: "700" },
  chevron: { color: ThemeColors.waterTeal, fontSize: 22, lineHeight: 18 },
  logout: { alignItems: "center", padding: 16, marginTop: 8 },
  logoutText: { color: ThemeColors.buoyCoral, fontWeight: "700" },
});
