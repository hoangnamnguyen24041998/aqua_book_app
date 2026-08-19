import { StyleSheet, Text, View } from 'react-native';

import { ThemeColors } from '@/components/swimbook/Theme';

export function HomeTopBar({ userName }: { userName: string }) {
  const initials = userName
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <View style={styles.row}>
      <View>
        <Text style={styles.kicker}>AquaBook</Text>
        <Text style={styles.title}>Good session, {userName.split(' ')[0]}</Text>
      </View>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{initials}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  kicker: {
    color: '#92DCD4',
    letterSpacing: 1.8,
    textTransform: 'uppercase',
    fontSize: 12,
    marginBottom: 6,
  },
  title: {
    color: ThemeColors.white,
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '700',
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(95, 209, 198, 0.18)',
    borderWidth: 1,
    borderColor: 'rgba(95, 209, 198, 0.32)',
  },
  avatarText: {
    color: ThemeColors.white,
    fontSize: 15,
    fontWeight: '700',
  },
});
