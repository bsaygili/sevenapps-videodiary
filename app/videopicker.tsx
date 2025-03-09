import { useState } from 'react';
import { Button, Image, View, StyleSheet, ActivityIndicator, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEvent } from 'expo';
import FormInputs from '@/components/FormInputs';
import { useVideoStore } from '@/utils/store';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

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
        // No permissions request is necessary for launching the image library
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
            addVideo(values.name, values.description, mediaPath.toString()).then(() => router.dismissTo("/"));
        } else {
            console.error('Media path is undefined');
        }
    }
    return (
        <View style={styles.container}>
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
            <Button title="Pick an image from camera roll" onPress={pickImage} />
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
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
        height: 450,
    },
    controlsContainer: {
        padding: 10,
    },
    activity: {
        margin: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
