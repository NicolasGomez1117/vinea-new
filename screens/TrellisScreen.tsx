// screens/TrellisScreen.tsx
import React, { useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
  ScrollView,
} from 'react-native';
import {
  useNavigation,
  useRoute,
  RouteProp,
} from '@react-navigation/native';
import { FlingGestureHandler, Directions, State } from 'react-native-gesture-handler';
import Trellis from '../components/Trellis/Trellis';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

type TrellisNavProp = NativeStackNavigationProp<
  RootStackParamList,
  'TrellisScreen'
>;
type TrellisRouteProp = RouteProp<RootStackParamList, 'TrellisScreen'>;

export default function TrellisScreen() {
  const nav = useNavigation<TrellisNavProp>();
  const route = useRoute<TrellisRouteProp>();
  const goBack = () => nav.goBack();
  const wrapperRef = useRef<View>(null);

  const { flowerCounts } = route.params;

  // On web, allow “wheel down” to go back
  useEffect(() => {
    if (Platform.OS === 'web' && wrapperRef.current) {
      const el = wrapperRef.current as unknown as HTMLElement;
      const onWheel = (e: WheelEvent) => {
        if (e.deltaY > 50) goBack();
      };
      el.addEventListener('wheel', onWheel);
      return () => el.removeEventListener('wheel', onWheel);
    }
  }, [wrapperRef.current]);

  const Header = (
    <View style={styles.header}>
      <TouchableOpacity style={styles.headerButton} onPress={goBack}>
        <Text style={styles.headerText}>
          {Platform.OS === 'web' ? '⬇️ Back to Prompt' : '🔙 Edit Mood'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const Content = (
    <View style={styles.wrapper} ref={wrapperRef}>
      {Header}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Trellis counts={flowerCounts} />
      </ScrollView>
    </View>
  );

  if (Platform.OS !== 'web') {
    return (
      <FlingGestureHandler
        direction={Directions.DOWN}
        onHandlerStateChange={({ nativeEvent }) =>
          nativeEvent.state === State.ACTIVE && goBack()
        }
      >
        {Content}
      </FlingGestureHandler>
    );
  }

  return Content;
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: Platform.OS === 'web' ? 16 : 40,
    paddingBottom: 8,
    alignItems: 'center',
    backgroundColor: '#eef0f3',
    zIndex: 10,
  },
  headerButton: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  headerText: {
    fontSize: 16,
    color: '#333',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 24,
  },
});
