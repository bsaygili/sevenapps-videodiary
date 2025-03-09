import { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import { useVideoStore } from '../utils/store';


const video = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
export default function NotesScreen() {
    const { videos, loadVideos, addVideo, removeVideo } = useVideoStore();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        loadVideos();
    }, []);

    return (
        <View style={{ padding: 20 }}>
            <TextInput
                placeholder="Name"
                value={name}
                onChangeText={setName}
                style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
            />
            <TextInput
                placeholder="Decription"
                value={description}
                onChangeText={setDescription}
                style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
            />
            <Button
                title="Add Note"
                onPress={async () => {
                    await addVideo(name, description, video);
                    setName('');
                    setDescription('');
                }}
            />

            <FlatList
                data={videos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={{ marginTop: 10, padding: 10, borderWidth: 1 }}>
                        <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
                        <Text>{item.description}</Text>
                        <Text>{item.video}</Text>
                        <Button title="Delete" onPress={async () => await removeVideo(item.id)} />
                    </View>
                )}
            />
        </View>
    );
}
