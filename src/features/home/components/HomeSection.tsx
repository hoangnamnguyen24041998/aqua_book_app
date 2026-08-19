import { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ThemeColors } from '@/components/swimbook/Theme';
import { Spacing } from '@/constants/theme';

export function HomeSection({
  title,
  children,
  actionLabel,
  onAction,
}: {
  title: string;
  children: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {actionLabel ? (
          <Pressable onPress={onAction}>
            <Text style={styles.action}>{actionLabel}</Text>
          </Pressable>
        ) : null}
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: Spacing.three,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: ThemeColors.white,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '700',
  },
  action: {
    color: '#92DCD4',
    fontSize: 13,
    fontWeight: '600',
  },
});
