import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { FlatList, StyleSheet, StatusBar, Dimensions, Pressable } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useVideoPlayer, VideoView } from 'expo-video';
import { router } from 'expo-router';
import { View, Text } from '@/components/Themed';
import { MonoText } from '@/components/StyledText';
import { useVideoStore } from '@/utils/store';


export default function HomeScreen() {

    const { videos, loadVideos, removeVideo } = useVideoStore();
    const { height, width } = Dimensions.get("screen");
    const player = (url: string) => useVideoPlayer(url, player => {
        player.loop = false;
        player.play();
        player.muted = true;
    });

    React.useEffect(() => {
        loadVideos();
    }, []);


    type ItemProps = { id: string, name: string, description: string, video: string };

    const customDimensions = { width: width / 2, height: height / 7 }

    const Item = ({ id, name, description, video }: ItemProps) => (

        <View className='flex-row items-center justify-between align-middle p-2 rounded-lg border-1 m-1 gap-2'>
            <View>
                <VideoView
                    style={customDimensions}
                    player={player(video)}
                    allowsFullscreen
                    allowsPictureInPicture
                    contentFit="fill"
                />
            </View>
            <View className='flex-1'>
                <Pressable onPress={() => router.push({
                    pathname: `/details/[vid_id]`,
                    params: { vid_id: id, name, description, video }
                })
                }>
                    <Text className='py-4'>{name}</Text>
                    <MonoText>{description}</MonoText>
                </Pressable >
            </View>
            <View className='flex-wrap'>
                <Pressable onPress={() => removeVideo(Number(id))}>
                    <FontAwesome
                        name="trash"
                        size={25}
                        color="red"
                    />
                </Pressable >
            </View>
        </View >

    );



    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={videos}
                    renderItem={({ item }) => <Item id={item.id.toString()} name={item.name} description={item.description} video={item.video} />}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{ padding: 10 }}
                    ListEmptyComponent={() => <Text className='pt-4 m-auto'>No videos found</Text>}
                />
            </SafeAreaView>
        </SafeAreaProvider>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
});

