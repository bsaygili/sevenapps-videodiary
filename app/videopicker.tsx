import { useState } from 'react';
import { Button, View, StyleSheet, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEvent } from 'expo';
import FormInputs from '@/components/FormInputs';
import { useVideoStore } from '@/utils/store';
import { router } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Toast } from 'toastify-react-native';




export default function ImagePickerExample() {
    const [mediaPath, setMediaPath] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isNextOpen, setNextIsOpen] = useState<boolean>(false);


    const { addVideo } = useVideoStore();

    const player = useVideoPlayer(mediaPath, (player) => {
        if (mediaPath && !isLoading) {
            player.loop = true;
            player.muted = true;
            player.play();
        } else {
            player.pause();
        }
    });

    const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

    const pickImage = async () => {
        setIsLoading(true);
        if (isPlaying) { setMediaPath(null); }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['videos'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        setIsLoading(false);
        if (!result.canceled) {
            setMediaPath(result.assets[0].uri);
        }
    };
    const next = () => {
        setNextIsOpen(true);
        if (isPlaying) {
            player.pause();
        }
    }

    const handleSubmit = (values: { name: string; description: string }) => {
        if (mediaPath) {
            addVideo(values.name, values.description, mediaPath.toString()).then(() => {
                Toast.success("Memory created!")
                router.dismissTo("/")
            });
        } else {
            console.error('Media path is undefined');
        }
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <View style={styles.container}>
                    <Button title="Pick an video from phone" onPress={pickImage} />
                    {!isNextOpen ? isLoading ?
                        <ActivityIndicator style={styles.activity} size="large" color="#007AFF" /> :
                        mediaPath && <>
                            <View style={styles.contentContainer}>
                                <VideoView style={styles.video} player={player} allowsFullscreen allowsPictureInPicture />
                            </View>
                            <Button title="Next" onPress={next} />
                        </>
                        :
                        <FormInputs handleSubmit={handleSubmit} />
                    }
                </View>
            </SafeAreaView>
        </SafeAreaProvider>

    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 40,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignContent: 'center',
        height: '80%',
    },
    contentContainer: {
        width: '100%',
        height: 500,
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    video: {
        width: '100%',
        height: 250,
    },
    controlsContainer: {
        padding: 10,
    },
    activity: {
        margin: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
