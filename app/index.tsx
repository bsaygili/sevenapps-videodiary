import React from 'react'
import { FlatList, StyleSheet, StatusBar, Dimensions, Pressable, Platform } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useVideoPlayer, VideoView } from 'expo-video';
import { router } from 'expo-router';
import { View, Text } from '@/components/Themed';
import { MonoText } from '@/components/StyledText';


export default function HomeScreen() {

    const { height, width } = Dimensions.get("screen");
    const player = (url: string) => useVideoPlayer(url, player => {
        player.loop = false;
        player.play();
        player.muted = true;
    });


    const DATA = [
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            name: "BigBuckBunny",
            description: "BigBuckBunny is a game",
            uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
        },
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            name: "ElephantsDream",
            description: "ElephantsDream is a video",
            uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
        },

        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            name: "DesigningForGoogleCast",
            description: "DesigningForGoogleCast is a Google Cast",
            uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/DesigningForGoogleCast.mp4'
        },
        // {
        //     id: '58694a0f-3da1-471f-bd96-145571e29d5451',
        //     name: "Aybars-Okul",
        //     description: "23 Nisan Gösterisi",
        //     uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
        // },
        // {
        //     id: '58694a0f-3da1-471f-bd96-145571e29d5452',
        //     name: "Aybars-Okul",
        //     description: "23 Nisan Gösterisi",
        //     uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
        // },
        // {
        //     id: '58694a0f-3da1-471f-bd96-145571e29d5455',
        //     name: "Aybars-Okul",
        //     description: "23 Nisan Gösterisi",
        //     uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
        // },
        // {
        //     id: '58694a0f-3da1-471f-bd96-145571e29d54516',
        //     name: "Aybars-Okul",
        //     description: "23 Nisan Gösterisi Lorem10 asdşalsdjklşm lşkasjdlkş",
        //     uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
        // },
    ];


    type ItemProps = { name: string, description: string, url: string };

    const customDimensions = Platform.OS === "ios" ? { width: width / 2, height: height / 7 } : { width: width / 5, height: height / 5 }

    const Item = ({ name, description, url }: ItemProps) => (

        <View className='flex-row  items-center justify-items-start align-middle p-2 rounded-lg border-1 m-1 gap-2'>
            <View>
                <VideoView
                    style={customDimensions}
                    player={player(url)}
                    allowsFullscreen
                    allowsPictureInPicture
                    contentFit="fill"
                />
            </View>
            <View className='flex-wrap w-[160px]'>
                <Pressable onPress={() => router.push({
                    pathname: `/${name}`,
                    params: { name, description, video: url }
                })
                }>
                    <Text className='py-4'>{name}</Text>
                    <MonoText>{description}</MonoText>
                </Pressable >
            </View>
        </View >

    );



    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={DATA}
                    renderItem={({ item }) => <Item name={item.name} description={item.description} url={item.uri} />}
                    keyExtractor={item => item.id}
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

