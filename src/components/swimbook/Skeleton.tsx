import { useEffect, useRef, useState } from 'react';
import { Animated, StyleProp, StyleSheet, ViewStyle } from 'react-native';

import { ThemeColors } from './Theme';

export function useMockLoading(delay = 520) {
  const started = useRef(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const timeout = setTimeout(() => setLoading(false), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  return loading;
}

export function Skeleton({ style }: { style?: StyleProp<ViewStyle> }) {
  const opacity = useRef(new Animated.Value(0.45)).current;
  useEffect(() => {
    const animation = Animated.loop(Animated.sequence([
      Animated.timing(opacity, { toValue: 0.95, duration: 700, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 0.45, duration: 700, useNativeDriver: true }),
    ]));
    animation.start();
    return () => animation.stop();
  }, [opacity]);
  return <Animated.View style={[styles.block, { opacity }, style]} />;
}

export function ScreenSkeleton({ cards = 3 }: { cards?: number }) {
  return <><Skeleton style={styles.kicker} /><Skeleton style={styles.title} /><Skeleton style={styles.subtitle} />{Array.from({ length: cards }).map((_, index) => <Skeleton key={index} style={styles.card} />)}</>;
}

const styles = StyleSheet.create({
  block: { backgroundColor: ThemeColors.border, borderRadius: 14 },
  kicker: { height: 12, width: 84 }, title: { height: 34, width: '90%' },
  subtitle: { height: 18, width: '72%', marginBottom: 8 }, card: { height: 124, width: '100%' },
});
