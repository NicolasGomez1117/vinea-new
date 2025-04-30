// screens/DreamScreen.tsx
import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ScrollView,
} from 'react-native'

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

type DreamNavProp = NativeStackNavigationProp<
    RootStackParamList,
    'DreamScreen'
>;


import { PanGestureHandler, State } from 'react-native-gesture-handler'
import DreamInput from '../components/DreamInput/DreamInput'
import Trellis from '../components/Trellis/Trellis'

// pull in your API helpers
import {
  analyzeEmotions,
  mapScoresToFlowers,
} from '../src/api/sentiment'

export default function DreamScreen() {
  const [text, setText] = useState('')
  const [flowerCounts, setFlowerCounts] = useState<Record<string, number>>({})
  const nav = useNavigation<DreamNavProp>();

  // swipe handler (unchanged)
  const handleGesture = ({ nativeEvent }: any) => {
    if (nativeEvent.state === State.END) {
      if (nativeEvent.translationY > 50) {
        nav.goBack()
      } else if (nativeEvent.translationY < -50) {
        nav.navigate('TrellisScreen', { flowerCounts })
      }
    }
  }

  // Run the AI + update preview
  const handlePreview = async () => {
    const scores = await analyzeEmotions(text)
    const counts = mapScoresToFlowers(scores)
    setFlowerCounts(counts)
  }

  // Navigate onward with the latest preview
  const handleContinue = () => {
    nav.navigate('TrellisScreen', { flowerCounts })
  }

  const Content = (
    <View style={styles.container}>
      {/* 1️⃣ Trellis preview */}
      <View style={styles.preview}>
        <Trellis counts={flowerCounts} />
      </View>

      {/* 2️⃣ Prompt & input */}
      <Text style={styles.prompt}>How are you feeling today?</Text>
      <DreamInput value={text} onChangeText={setText} />

      {/* 3️⃣ Buttons */}
      <View style={styles.buttonsRow}>
        <TouchableOpacity style={styles.button} onPress={handlePreview}>
          <Text>Preview</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.nextButton]} onPress={handleContinue}>
          <Text>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

  if (Platform.OS !== 'web') {
    return (
      <PanGestureHandler onHandlerStateChange={handleGesture}>
        {Content}
      </PanGestureHandler>
    )
  }
  return <ScrollView>{Content}</ScrollView>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  preview: {
    height: 200,           // fixed-height preview area
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
  },
  prompt: {
    fontSize: 20,
    marginBottom: 12,
    textAlign: 'center',
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  button: {
    flex: 1,
    padding: 12,
    backgroundColor: '#eef0f3',
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  nextButton: {
    backgroundColor: '#cde4fd',
  },
})
