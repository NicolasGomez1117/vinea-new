// screens/DreamScreen.tsx
import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { PanGestureHandler, State } from 'react-native-gesture-handler'
import DreamInput from '../components/DreamInput/DreamInput'

// pull in your API helpers
import {
  analyzeEmotions,
  mapScoresToFlowers,
} from '../src/api/sentiment'

export default function DreamScreen() {
  const [text, setText] = useState('')
  const nav = useNavigation()

  // swipe handler
  const handleGesture = ({ nativeEvent }: any) => {
    if (nativeEvent.state === State.END) {
      if (nativeEvent.translationY > 50) {
        nav.goBack()
      } else if (nativeEvent.translationY < -50) {
        onNext()
      }
    }
  }

  // submit + navigate
  const onNext = async () => {
    const scores = await analyzeEmotions(text)
    const counts = mapScoresToFlowers(scores)
    nav.navigate('TrellisScreen', { flowerCounts: counts })
  }

  const Content = (
    <View style={styles.container}>
      <Text style={styles.prompt}>How are you feeling today?</Text>
      <DreamInput value={text} onChangeText={setText} />
      <Text style={styles.preview}>You said: {text}</Text>

      {(Platform.OS === 'web' || Platform.OS === 'ios') && (
        <TouchableOpacity style={styles.nextButton} onPress={onNext}>
          <Text style={styles.arrow}>⬆️ Next</Text>
        </TouchableOpacity>
      )}
    </View>
  )

  if (Platform.OS !== 'web') {
    return (
      <PanGestureHandler onHandlerStateChange={handleGesture}>
        {Content}
      </PanGestureHandler>
    )
  }
  return Content
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  prompt:    { fontSize: 20, marginBottom: 12, textAlign: 'center' },
  preview:   { fontSize: 16, color: '#666', marginBottom: 24 },
  nextButton:{ alignSelf: 'center', padding: 12, backgroundColor: '#eef0f3', borderRadius: 8 },
  arrow:     { fontSize: 18 },
})
