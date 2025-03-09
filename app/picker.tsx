// import { FFmpeg } from '@ffmpeg/ffmpeg';
import React from "react";
import { Button, View, Text } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { useVideoPlayer, VideoView } from "expo-video";
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";

export default function VideoTrimmer() {
    const [videoUri, setVideoUri] = React.useState<string | null>(null);
    const [trimmedVideoUri, setTrimmedVideoUri] = React.useState<string | null>(null);
    // const { pickImage, mediaPath, setMediaPath } = usePickImage();


    // const ffmpegRef = React.useRef(new FFmpeg());
    // const { load,/* isLoaded, createFFmpeg */ } = new FFmpeg();

    // React.useEffect(() => {
    //     ffmpegRef.current.load(); // Load FFmpeg on component mount
    // }, []);

    const player = (url: string) => useVideoPlayer(url, player => {
        player.loop = false;
        player.play();
        player.muted = true;
    });

    const pickVideo = async () => {
        const result = await DocumentPicker.getDocumentAsync({ type: "video/*" });
        if (result.assets && result.assets.length > 0) {
            setVideoUri(result.assets[0].uri);
        }
    };

    const trimVideo = async () => {
        // if (!videoUri || !ffmpegRef.current.loaded) return;

        // // const ffmpeg = createFFmpeg({ log: true });
        // const ffmpeg = ffmpegRef.current.create({ log: true });
        // await ffmpeg.load();

        // const inputFilename = "input.mp4";
        // const outputFilename = "output.mp4";
        // const inputUri = videoUri.replace("file://", "");

        // // Read video file
        // const videoData = await FileSystem.readAsStringAsync(inputUri, { encoding: FileSystem.EncodingType.Base64 });

        // // Write to FFmpeg's virtual file system
        // await ffmpeg.writeFile(inputFilename, videoData);

        // // Trim video (0-5 seconds)
        // await ffmpeg.exec([
        //     "-i",
        //     inputFilename,
        //     "-ss",
        //     "00:00:00",
        //     "-to",
        //     "00:00:05",
        //     "-c",
        //     "copy",
        //     outputFilename,
        // ]);

        // // Get the trimmed video file
        // const trimmedVideoData = await ffmpeg.readFile(outputFilename);
        // const trimmedUri = FileSystem.cacheDirectory + "trimmed_video.mp4";

        // // Save the trimmed file
        // await FileSystem.writeAsStringAsync(trimmedUri, trimmedVideoData, { encoding: FileSystem.EncodingType.Base64 });
        // setTrimmedVideoUri(trimmedUri);

    };

    return (
        <View style={{ flex: 1, padding: 20 }}>
            {/* <Button title="Pick Video" onPress={pickImage} /> */}
            {/* {mediaPath && <VideoView player={player(mediaPath)} style={{ width: 300, height: 200 }} nativeControls />} */}
            {/* <Button title="Trim Video" onPress={trimVideo} /> */}
            {/* {trimmedVideoUri && <VideoView player={player(trimmedVideoUri)} style={{ width: 300, height: 200 }} nativeControls />} */}
        </View>
    );
}
