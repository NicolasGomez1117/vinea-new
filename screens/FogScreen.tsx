// screens/FogScreen.tsx
import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Platform,
    TouchableOpacity,
} from 'react-native'
import {
    FlingGestureHandler,
    Directions,
    State,
} from 'react-native-gesture-handler'


import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

type DreamNavProp = NativeStackNavigationProp<
    RootStackParamList,
    'DreamScreen'
>;



export default function FogScreen() {
    const nav = useNavigation<DreamNavProp>();

    const Content = (
        <View style={styles.container}>
            <Text style={styles.title}>🌫️ Welcome to Vinea!</Text>
            <Text style={styles.subtitle}>Swipe up (or click the arrow) to begin</Text>

            {Platform.OS === 'web' && (
                <TouchableOpacity
                    style={styles.upButton}
                    onPress={() => nav.navigate('DreamScreen' as never)}
                >
                    <Text style={styles.arrow}>⬆️</Text>
                </TouchableOpacity>
            )}
        </View>
    )

    if (Platform.OS !== 'web') {
        return (
            <FlingGestureHandler
                direction={Directions.UP}
                onHandlerStateChange={({ nativeEvent }) => {
                    if (nativeEvent.state === State.ACTIVE) {
                        nav.navigate('DreamScreen' as never)
                    }
                }}
            >
                {Content}
            </FlingGestureHandler>
        )
    }

    return Content
}

const { height } = Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eef0f3',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: height * 0.2,
    },
    title: { fontSize: 24, color: '#555', marginBottom: 12 },
    subtitle: { fontSize: 16, color: '#888' },
    upButton: {
        position: 'absolute',
        bottom: 40,
        padding: 12,
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: 24,
    },
    arrow: { fontSize: 24 },
})
