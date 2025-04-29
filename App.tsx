import 'react-native-gesture-handler'
import 'react-native-url-polyfill/auto'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import Stack from './navigation'

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack />
      </NavigationContainer>
    </GestureHandlerRootView>
  )
}
