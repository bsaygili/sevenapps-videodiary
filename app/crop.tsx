import { useState } from "react";
import { View, Button, Alert, Dimensions } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Slider from "@react-native-community/slider";
import { useVideoPlayer, VideoView } from "expo-video";

export default function CropScreen() {
    const [startTime, setStartTime] = useState(0);
    const { height, width } = Dimensions.get("screen");
    const player = (url: string) => useVideoPlayer(url, player => {
        player.loop = false;
        player.play();
        player.muted = true;
        player.seekBy(startTime)
    });

    const { video } = useLocalSearchParams<{ video: string }>();

    const router = useRouter();

    const handleNext = () => {
        if (!video) {
            Alert.alert("Hata", "Video yüklenemedi.");
            return;
        }

        router.push({
            pathname: "/metadata",
            params: { video, startTime: startTime.toString() },
        });
    };

    return (
        <View className="flex-1 items-center justify-center bg-white">
            {video && (
                <View style={{
                    width: "100%",
                    height: height / 2,
                }}
                >
                    <VideoView
                        className='flex justify-center items-center overflow-hidden mb-1 object-cover'
                        style={{
                            width: "100%",
                            height: height / 2,
                        }}
                        player={player(video)}
                        allowsFullscreen
                        allowsPictureInPicture
                        contentFit="fill"
                    />
                </View>
            )}
            <Slider
                style={{ width: 300, height: 40 }}
                minimumValue={0}
                maximumValue={60}
                step={1}
                value={startTime}
                onValueChange={(value) => setStartTime(value)}
            />
            <Button title="Devam Et" onPress={handleNext} />
        </View>
    );
}
