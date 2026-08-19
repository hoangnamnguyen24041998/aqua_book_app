import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Badge, PrimaryButton, SecondaryButton } from '@/components/swimbook/Buttons';
import { ThemeColors } from '@/components/swimbook/Theme';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useHomeViewModel } from '@/viewmodels/useHomeViewModel';

import { HomeHeroCard } from './components/HomeHeroCard';
import { HomeMetricCard } from './components/HomeMetricCard';
import { HomeSection } from './components/HomeSection';
import { HomeStatList } from './components/HomeStatList';
import { HomeTopBar } from './components/HomeTopBar';
import { ScreenSkeleton, useMockLoading } from '@/components/swimbook/Skeleton';

export function HomeScreen() {
  const insets = useSafeAreaInsets();
  const vm = useHomeViewModel();
  const isLoading = useMockLoading();

  return (
    <View style={styles.background}>
      <View style={styles.backdrop} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: insets.top + Spacing.three,
            paddingBottom: insets.bottom + BottomTabInset + Spacing.five,
          },
        ]}
      >
        <View style={styles.shell}>
          {isLoading ? <ScreenSkeleton cards={3} /> : <>
          <HomeTopBar userName={vm.userName} />
          <HomeHeroCard
            title="Book your next lane"
            subtitle="Premium swimming sessions, class bookings, and coaching in one calm, focused dashboard."
            statusLabel={vm.weatherState === 'perfect' ? 'Conditions ideal' : 'Weather watch'}
            statusTone={vm.weatherState === 'perfect' ? 'accent' : 'coral'}
          />

          <View style={styles.metricGrid}>
            <HomeMetricCard label="Today" value={vm.todaySession?.title ?? 'No lane booked'} helper={vm.todaySession?.subtitle ?? 'Pick a lane for this afternoon'} />
            <HomeMetricCard label="Class" value={vm.upcomingClass.title} helper={vm.upcomingClass.subtitle} />
          </View>

          <HomeSection
            title="Training snapshot"
            actionLabel="Toggle weather"
            onAction={vm.toggleWeather}
          >
            <HomeStatList stats={vm.progressSnapshot} />
          </HomeSection>

          <HomeSection title="Quick actions">
            <View style={styles.actionsRow}>
              <View style={styles.actionCell}>
                <PrimaryButton title="Reserve lane" onPress={() => vm.handleQuickAction('lane')} />
              </View>
              <View style={styles.actionCell}>
                <SecondaryButton title="Browse classes" onPress={() => vm.handleQuickAction('class')} />
              </View>
            </View>
          </HomeSection>

          <HomeSection title="Now on deck">
            <Pressable onPress={() => vm.handleQuickAction('explore')} style={styles.deckCard}>
              <Badge text={vm.weatherState === 'perfect' ? 'Open water-ready' : 'Indoor recommended'} type={vm.weatherState === 'perfect' ? 'accent' : 'coral'} />
              <View style={styles.deckCardBody}>
                <HomeMetricCard
                  label="Closest pool"
                  value="District 1 Aquatic Center"
                  helper="Indoor · 8 lanes · 1.2 km away"
                  compact
                />
                <HomeMetricCard
                  label="Coach note"
                  value="Freestyle Fundamentals"
                  helper="Tue / Thu · 6:30 PM"
                  compact
                />
              </View>
            </Pressable>
          </HomeSection>
          </>}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: ThemeColors.deepPool,
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(10, 46, 54, 0.88)',
  },
  content: {
    flexGrow: 1,
    alignItems: 'center',
  },
  shell: {
    width: '100%',
    maxWidth: MaxContentWidth,
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
  },
  metricGrid: {
    flexDirection: 'row',
    gap: Spacing.three,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: Spacing.three,
  },
  actionCell: {
    flex: 1,
  },
  deckCard: {
    gap: Spacing.three,
    borderRadius: 28,
    padding: Spacing.four,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  deckCardBody: {
    gap: Spacing.three,
  },
});
