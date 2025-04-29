// PlantSegment.tsx
import React, { useEffect } from 'react';
import { Platform, View } from 'react-native';
import { Canvas, Path, Skia } from '@shopify/react-native-skia';
import {
  useSharedValue,
  useDerivedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { styles } from './PlantSegment.styles';

interface PlantSegmentProps {
  start: { x: number; y: number };
  end: { x: number; y: number };
  delay?: number;
}

export default function PlantSegment({
  start,
  end,
  delay = 0,
}: PlantSegmentProps) {
  if (Platform.OS === 'web') {
    return <View style={{ flex: 1, backgroundColor: 'transparent' }} />;
  }

  const progress = useSharedValue(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      progress.value = withTiming(1, {
        duration: 800,
        easing: Easing.inOut(Easing.cubic),
      });
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const animatedPath = useDerivedValue(() => {
    const p = Skia.Path.Make();
    p.moveTo(start.x, start.y);
    const t = progress.value;
    p.lineTo(
      start.x + (end.x - start.x) * t,
      start.y + (end.y - start.y) * t
    );
    return p;
  });

  const animatedStroke = useDerivedValue(
    () => styles.strokeWidth * progress.value
  );

  return (
    <Canvas style={{ flex: 1 }}>
      <Path
        path={animatedPath}
        color={styles.color}
        style="stroke"
        strokeWidth={animatedStroke}
        strokeCap="round"
      />
    </Canvas>
  );
}
