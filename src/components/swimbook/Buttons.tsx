import React from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { ThemeColors } from './Theme';

interface BtnProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  selected?: boolean;
}

export const PrimaryButton: React.FC<BtnProps> = ({ title, onPress, disabled, loading }) => (
  <Pressable
    onPress={onPress}
    disabled={disabled || loading}
    style={({ pressed }) => [
      styles.priBtn,
      pressed && { opacity: 0.8 },
      disabled && { backgroundColor: ThemeColors.gray }
    ]}
  >
    {loading ? (
      <ActivityIndicator color={ThemeColors.white} size="small" />
    ) : (
      <Text style={styles.priText}>{title}</Text>
    )}
  </Pressable>
);

export const SecondaryButton: React.FC<BtnProps> = ({ title, onPress, disabled, selected }) => (
  <Pressable
    onPress={onPress}
    disabled={disabled}
    style={({ pressed }) => [
      styles.secBtn,
      selected && { backgroundColor: ThemeColors.waterTeal },
      pressed && { opacity: 0.8 }
    ]}
  >
    <Text style={[styles.secText, selected && { color: ThemeColors.white }]}>{title}</Text>
  </Pressable>
);

export const GhostButton: React.FC<BtnProps> = ({ title, onPress }) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [pressed && { opacity: 0.6 }, { paddingVertical: 6, alignItems: 'center' }]}
  >
    <Text style={{ color: ThemeColors.gray, fontSize: 13, textDecorationLine: 'underline', fontFamily: 'Inter' }}>
      {title}
    </Text>
  </Pressable>
);

export const Badge: React.FC<{ text: string; type?: 'primary' | 'accent' | 'coral' | 'muted' }> = ({ text, type = 'primary' }) => {
  const getC = () => {
    if (type === 'accent') return { bg: '#EAF9F7', txt: ThemeColors.waterTeal };
    if (type === 'coral') return { bg: '#FFF0ED', txt: ThemeColors.buoyCoral };
    if (type === 'muted') return { bg: '#E5EDED', txt: ThemeColors.gray };
    return { bg: ThemeColors.waterTeal, txt: ThemeColors.white };
  };
  const c = getC();
  return (
    <View style={[styles.badge, { backgroundColor: c.bg }]}>
      <Text style={[styles.badgeTxt, { color: c.txt }]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  priBtn: {
    backgroundColor: ThemeColors.waterTeal,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  priText: {
    color: ThemeColors.white,
    fontSize: 15,
    fontWeight: '600',
    fontFamily: 'Space Grotesk',
    letterSpacing: 0.5
  },
  secBtn: {
    borderWidth: 1.5,
    borderColor: ThemeColors.waterTeal,
    paddingVertical: 11,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  secText: {
    color: ThemeColors.waterTeal,
    fontSize: 13,
    fontWeight: '600',
    fontFamily: 'Inter'
  },
  badge: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 12,
    alignSelf: 'flex-start'
  },
  badgeTxt: {
    fontSize: 9,
    fontWeight: '700',
    fontFamily: 'Inter',
    textTransform: 'uppercase'
  }
});