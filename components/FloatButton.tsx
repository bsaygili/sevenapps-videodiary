import Colors from '@/constants/Colors';
import React from 'react'
import { Pressable, StyleSheet } from 'react-native';
import { Link, Tabs } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useColorScheme } from '@/components/useColorScheme';
import { View } from './Themed';

const DURATION = 2000;
const TRANSLATE_Y = -10


const FloatButton = () => {
    const colorScheme = useColorScheme() as 'light' | 'dark';
    return (

        <View style={styles.container}>
            <Link href="/videopicker" asChild>
                <Pressable style={styles.plusBtn}>
                    {({ pressed }) => (
                        <FontAwesome
                            name="crop"
                            size={25}
                            color={Colors[colorScheme ?? 'light'].text}
                        />
                    )}
                </Pressable>
            </Link>
        </View >
    )
}

export default FloatButton

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 50,
        right: 30,
    },
    plusBtn: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2f95dc',
        borderRadius: 30,
    }
})
