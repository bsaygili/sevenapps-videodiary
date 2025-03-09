import * as React from 'react';

import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    NativeEventEmitter,
    NativeModules,
} from 'react-native';
import { isValidFile, showEditor } from 'react-native-video-trim';
import * as ImagePicker from 'expo-image-picker';
import { useEffect } from 'react';

export default function App() {
    useEffect(() => {
        const eventEmitter = new NativeEventEmitter(NativeModules?.VideoTrim);
        const subscription = eventEmitter.addListener('VideoTrim', (event) => {
            switch (event.name) {
                case 'onLoad': {
                    // on media loaded successfully
                    console.log('onLoadListener', event);
                    break;
                }
                case 'onShow': {
                    console.log('onShowListener', event);
                    break;
                }
                case 'onHide': {
                    console.log('onHide', event);
                    break;
                }
                case 'onStartTrimming': {
                    console.log('onStartTrimming', event);
                    break;
                }
                case 'onFinishTrimming': {
                    console.log('onFinishTrimming', event);
                    break;
                }
                case 'onCancelTrimming': {
                    console.log('onCancelTrimming', event);
                    break;
                }
                case 'onCancel': {
                    console.log('onCancel', event);
                    break;
                }
                case 'onError': {
                    console.log('onError', event);
                    break;
                }
                case 'onLog': {
                    console.log('onLog', event);
                    break;
                }
                case 'onStatistics': {
                    console.log('onStatistics', event);
                    break;
                }
            }
        });

        return () => {
            subscription.remove();
        };
    }, []);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={async () => {
                    const result = await ImagePicker.launchImageLibraryAsync({
                        mediaTypes: ['videos'],
                        aspect: [4, 3],
                        quality: 1,
                    });

                    isValidFile(result.assets![0]?.uri || '').then((res) =>
                        console.log(res)
                    );

                    showEditor(result.assets![0]?.uri || '', {
                        maxDuration: 20,
                    });
                }}
                style={{ padding: 10, backgroundColor: 'red' }}
            >
                <Text>Launch Library</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    isValidFile('invalid file path').then((res) => console.log(res));
                }}
                style={{
                    padding: 10,
                    backgroundColor: 'blue',
                    marginTop: 20,
                }}
            >
                <Text>Check Video Valid</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});