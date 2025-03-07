import { useState } from "react";
import { Dimensions, Platform, Pressable } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useVideoPlayer, VideoView } from "expo-video";
import { CstmPressable, Text, View } from "@/components/Themed";
import { MonoText } from "@/components/StyledText";

export default function DetailScreen() {
    const { height, width } = Dimensions.get("window");
    const player = (url: string) => useVideoPlayer(url, player => {
        player.loop = false;
        player.play();
        player.muted = true;
    });

    const { video, name, description } = useLocalSearchParams<{ name: string, description: string, video: string }>();
    const customDimensions = { width, height: height / 3 }
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
                    <Text className="text-xl rounded-xl p-4 border">Name: {name}</Text>
                    <MonoText className="text-lg rounded-xl p-4 border">Description: {description}</MonoText>
                </View>
            </View>
            <View className="flex-1 items-center justify-center">
                <CstmPressable className="p-4 rounded-xl"
                    onPress={() => router.push({
                        pathname: `/edit`,
                        params: { name, description, video }
                    })}>
                    <Text>Edit Video Info</Text>
                </CstmPressable>
            </View>
        </View>
    );
}
