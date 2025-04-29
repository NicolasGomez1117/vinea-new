import React from 'react'
import { Platform } from 'react-native'
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import type { RootStackParamList } from './types'
import FogScreen from '../screens/FogScreen'
import DreamScreen from '../screens/DreamScreen'
import TrellisScreen from '../screens/TrellisScreen'

const NativeStack = createNativeStackNavigator<RootStackParamList>()
const JSStack     = createStackNavigator<RootStackParamList>()

export default function Navigator() {
  if (Platform.OS === 'web') {
    return (
      <JSStack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: 'vertical',
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      >
        <JSStack.Screen name="FogScreen"   component={FogScreen} />
        <JSStack.Screen name="DreamScreen" component={DreamScreen} />
        <JSStack.Screen
          name="TrellisScreen"
          component={TrellisScreen}
          initialParams={{ flowerCounts: {} as Record<string, number> }}
        />
      </JSStack.Navigator>
    )
  } else {
    return (
      <NativeStack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: 'vertical',
          animation: 'slide_from_bottom',
        }}
      >
        <NativeStack.Screen name="FogScreen"   component={FogScreen} />
        <NativeStack.Screen name="DreamScreen" component={DreamScreen} />
        <NativeStack.Screen
          name="TrellisScreen"
          component={TrellisScreen}
          initialParams={{ flowerCounts: {} as Record<string, number> }}
        />
      </NativeStack.Navigator>
    )
  }
}
