import * as RNFS from "expo-file-system";
import {
    FFmpegKit,
    ReturnCode,
    FFmpegKitConfig,
} from "ffmpeg-kit-react-native";

export const FRAME_PER_SEC = 1;
export const FRAME_WIDTH = 80;


interface GetFramesParams {
    localFileName: string;
    videoURI: string;
    frameNumber: number;
    successCallback: (outputImagePath: string) => void;
    errorCallback: () => void;
}

class FFmpegWrapper {
    static getFrames({
        localFileName,
        videoURI,
        frameNumber,
        successCallback,
        errorCallback,
    }: GetFramesParams): void {
        let outputImagePath = `${RNFS.cacheDirectory}/${localFileName}_%4d.png`;
        const ffmpegCommand = `-ss 0 -i ${videoURI} -vf "fps=${FRAME_PER_SEC}/1:round=up,scale=${FRAME_WIDTH}:-2" -vframes ${frameNumber} ${outputImagePath}`;

        FFmpegKit.executeAsync(
            ffmpegCommand,
            async (session) => {
                const state = FFmpegKitConfig.sessionStateToString(
                    await session.getState()
                );
                const returnCode = await session.getReturnCode();
                const failStackTrace = await session.getFailStackTrace();
                const duration = await session.getDuration();

                if (ReturnCode.isSuccess(returnCode)) {
                    console.log(
                        `Encode completed successfully in ${duration} milliseconds;.`
                    );
                    console.log(`Check at ${outputImagePath}`);
                    successCallback(outputImagePath);
                } else {
                    console.log("Encode failed. Please check log for the details.");
                    console.log(
                        `Encode failed with state ${state} and rc ${returnCode}.${(failStackTrace, "\\n")
                        }`
                    );
                    errorCallback();
                }
            },
            (log) => {
                console.log(log.getMessage());
            },
            (statistics) => {
                console.log(statistics);
            }
        ).then((session) =>
            console.log(
                `Async FFmpeg process started with sessionId ${session.getSessionId()}.`
            )
        );
    }
}

export default FFmpegWrapper;
