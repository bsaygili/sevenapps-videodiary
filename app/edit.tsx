import FormInputs from '@/components/FormInputs';
import { CstmPressable, Text } from '@/components/Themed';
import { router, useLocalSearchParams } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import React from 'react'
import { Dimensions, View } from 'react-native';

export default function EditScreen() {
    const { height, width } = Dimensions.get("window");
    const player = (url: string) => useVideoPlayer(url, player => {
        player.loop = false;
        player.play();
        player.muted = true;
    });
    const { name, description, video } = useLocalSearchParams<{ name: string, description: string, video: string }>();
    const customDimensions = { width, height: height / 3 }

    const handleSubmit = (values: { name: string; description: string }) => {
        console.log(values)
    }

    return (
        <View className="flex-1">
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
                <View className="flex p-10 items-start align-middle gap-2">
                    <FormInputs handleSubmit={handleSubmit} />
                </View>
            </View>

        </View>
    )
}

