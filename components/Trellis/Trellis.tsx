// components/Trellis/Trellis.tsx
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

interface TrellisProps {
  counts: Record<string, number>
}

const flowerEmojiMap: Record<string, string> = {
  joy:      '🌻',
  sadness:  '🔵',
  anger:    '🌷',
  fear:     '🌸',
  surprise: '🦋',
  neutral:  '⚪️',
}

export default function Trellis({ counts }: TrellisProps) {
  return (
    <View style={styles.container}>
      {Object.entries(counts).map(([emotion, count]) => (
        <View key={emotion} style={styles.row}>
          <Text style={styles.emotion}>{emotion.charAt(0).toUpperCase() + emotion.slice(1)}</Text>
          <Text style={styles.flowers}>
            {flowerEmojiMap[emotion] ?? '🌱'} x {count}
          </Text>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#eef0f3',
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
  },
  emotion: {
    flex: 1,
    fontSize: 16,
    textTransform: 'capitalize',
  },
  flowers: {
    fontSize: 20,
  },
})
