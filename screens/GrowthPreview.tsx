// screens/GrowthPreview.tsx
import React, { useMemo } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

interface GrowthPreviewProps {
  feeling: string
}

// A simple mapping from keywords in `feeling` to placeholder plant icons or colors
const plantMappings: { [key: string]: { icon: any; label: string } } = {
  happy: { icon: require('../assets/images/happy-flower.png'), label: 'Sunny Bloom' },
  calm:  { icon: require('../assets/images/calm-leaf.png'),   label: 'Gentle Leaf' },
  tired: { icon: require('../assets/images/tired-vine.png'),  label: 'Drooping Vine' },
  sad:   { icon: require('../assets/images/sad-bud.png'),     label: 'Blue Bud' },
}

export default function GrowthPreview({ feeling }: GrowthPreviewProps) {
  // pick the first matching mapping or a default
  const { icon, label } = useMemo(() => {
    const found = Object.entries(plantMappings).find(
      ([key]) => feeling.toLowerCase().includes(key)
    )
    return found ? found[1] : { icon: require('../assets/images/default-vine.png'), label: 'Fresh Sprout' }
  }, [feeling])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How your plant looks:</Text>
      <Image source={icon} style={styles.image} resizeMode="contain" />
      <Text style={styles.label}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: '#777',
  },
})
