import FormInputs from '@/components/FormInputs';
import { useVideoStore } from '@/utils/store';
import { router, useLocalSearchParams } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import React from 'react'
import { Dimensions, ScrollView, View } from 'react-native';

export default function EditScreen() {

    const { updateVideo } = useVideoStore();
    const { height, width } = Dimensions.get("window");
    const player = (url: string) => useVideoPlayer(url, player => {
        player.loop = false;
        player.play();
        player.muted = true;
    });
    const { vid_id, video, name, description } = useLocalSearchParams<{ name: string, description: string, video: string, vid_id: string }>();
    const customDimensions = { width, height: height / 3 }


    const handleSubmit = (values: { name: string; description: string }) => {
        updateVideo(vid_id, values.name, values.description, video).then(() => router.dismissTo("/"))
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} automaticallyAdjustKeyboardInsets>
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
            <FormInputs handleSubmit={handleSubmit} name={name} description={description} />
        </ScrollView>
    )
}
