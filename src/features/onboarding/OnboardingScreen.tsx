import { useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";

import { PrimaryButton, SecondaryButton } from "@/components/swimbook/Buttons";
import { ThemeColors } from "@/components/swimbook/Theme";
import { useOnboardingViewModel } from "@/viewmodels/useOnboardingViewModel";
import { AquaBookLogo } from "@/components/swimbook/AquaBookLogo";
import { SafeAreaView } from "react-native-safe-area-context";

const slides = [
  {
    accent: "#0D6D76",
    title: "Your lane. Your pace.",
    subtitle:
      "Elegant lane booking and training-first navigation for members and coaches.",
  },
  {
    accent: "#155A76",
    title: "Train with purpose.",
    subtitle:
      "Track distance, laps, and duration with a premium sports-tech rhythm.",
  },
  {
    accent: "#8D6A55",
    title: "Swim smarter.",
    subtitle:
      "Surface weather, water temperature, and class recommendations before you dive in.",
  },
] as const;

export function OnboardingScreen() {
  const vm = useOnboardingViewModel();
  const router = useRouter();
  const slide = slides[vm.currentStep];
  const progress = useMemo(
    () => vm.currentStep / (slides.length - 1),
    [vm.currentStep],
  );

  return (
    <SafeAreaView style={styles.root}>
      <View style={[styles.hero, { backgroundColor: slide.accent }]}>
        <View style={styles.overlay} />
        <View style={styles.waveOne} />
        <View style={styles.waveTwo} />
        <View style={styles.heroBody}>
          <AquaBookLogo light />
          <Text style={styles.title}>{slide.title}</Text>
          <Text style={styles.subtitle}>{slide.subtitle}</Text>
        </View>
      </View>

      <View style={styles.panel}>
        <View style={styles.dots}>
          {slides.map((_, index) => (
            <Pressable
              key={index}
              onPress={() => vm.handleDotPress(index)}
              style={[styles.dot, index === vm.currentStep && styles.dotActive]}
            />
          ))}
        </View>
        <View style={styles.progressTrack}>
          <View
            style={[styles.progressFill, { width: `${progress * 100}%` }]}
          />
        </View>
        <PrimaryButton
          title={vm.isLastStep ? "Get Started" : "Next"}
          onPress={() => {
            if (vm.isLastStep) {
              router.replace("/register");
            } else {
              vm.handleNext();
            }
          }}
        />
        <SecondaryButton
          title="Already have an account? Log in"
          onPress={() => router.push("/login")}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: ThemeColors.deepPool },
  hero: { flex: 1, justifyContent: "flex-end" },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(10,46,54,0.44)",
  },
  heroBody: { padding: 24, gap: 12 },
  waveOne: {
    position: "absolute",
    right: -70,
    top: 70,
    width: 260,
    height: 260,
    borderRadius: 130,
    borderWidth: 34,
    borderColor: "rgba(255,255,255,0.12)",
  },
  waveTwo: {
    position: "absolute",
    left: -95,
    bottom: 60,
    width: 210,
    height: 210,
    borderRadius: 105,
    borderWidth: 26,
    borderColor: "rgba(95,209,198,0.22)",
  },
  title: {
    color: ThemeColors.white,
    fontSize: 34,
    lineHeight: 40,
    fontWeight: "700",
  },
  subtitle: { color: "rgba(255,255,255,0.82)", fontSize: 16, lineHeight: 24 },
  panel: { padding: 24, gap: 16, backgroundColor: ThemeColors.poolMist },
  dots: { flexDirection: "row", gap: 8 },
  dot: { width: 8, height: 8, borderRadius: 999, backgroundColor: "#B8D7D1" },
  dotActive: { width: 28, backgroundColor: ThemeColors.waterTeal },
  progressTrack: {
    height: 4,
    borderRadius: 999,
    backgroundColor: "#D9E9E6",
    overflow: "hidden",
  },
  progressFill: { height: "100%", backgroundColor: ThemeColors.waterTeal },
});
