import { StyleSheet, Text, View } from 'react-native';

import { ThemeColors } from '@/components/swimbook/Theme';
import { MaxContentWidth, Spacing } from '@/constants/theme';

export function PlaceholderScreen({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <View style={styles.root}>
      <View style={styles.shell}>
        <Text style={styles.kicker}>SwimBook</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: ThemeColors.poolMist,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.four,
  },
  shell: {
    width: '100%',
    maxWidth: MaxContentWidth,
    gap: Spacing.three,
  },
  kicker: {
    color: ThemeColors.waterTeal,
    textTransform: 'uppercase',
    letterSpacing: 1.8,
    fontSize: 12,
  },
  title: {
    color: ThemeColors.deepPool,
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '700',
  },
  subtitle: {
    color: ThemeColors.gray,
    fontSize: 16,
    lineHeight: 24,
  },
});
