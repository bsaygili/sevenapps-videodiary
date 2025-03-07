import FormInputs from '@/components/FormInputs';
import { CstmPressable, Text } from '@/components/Themed';
import { router, useLocalSearchParams } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import React from 'react'
import { Dimensions, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function EditScreen() {
    const { height, width } = Dimensions.get("window");
    const player = (url: string) => useVideoPlayer(url, player => {
        player.loop = false;
        player.play();
        player.muted = true;
    });
    const { video } = useLocalSearchParams<{ name: string, description: string, video: string }>();
    const customDimensions = { width, height: height / 3 }

    const handleSubmit = (values: { name: string; description: string }) => {
        console.log(values)
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} automaticallyAdjustKeyboardInsets>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Edit Video</Text>
            <View className="flex items-center justify-center">
                {video && (
                    <View style={customDimensions}
                    >
                        <VideoView
                            className='flex justify-center items-center overflow-hidden mb-1 object-cover'
                            style={customDimensions}
                            player={player(video)}
                            allowsFullscreen
                            allowsPictureInPicture
                            contentFit="fill"
                        />
                    </View>
                )}
            </View>
            <FormInputs handleSubmit={handleSubmit} />
        </ScrollView>
    )
}
