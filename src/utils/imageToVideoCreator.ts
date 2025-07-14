import { FFmpegKit, ReturnCode } from "ffmpeg-kit-react-native";
import { mediaStore } from "../store/MediaStore";
import RNFS from "react-native-fs";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";

const checkFileExists = async (filePath: string): Promise<boolean> => {
  const cleanPath = filePath.replace("file://", "");
  return RNFS.exists(cleanPath);
};

const imageToVideo = async (imagePath: string, duration: number): Promise<string> => {
  const outputVideoPath = `${RNFS.DocumentDirectoryPath}/temp_video_${Math.random()
    .toString(36)
    .substring(7)}.mp4`;
  const ffmpegCommand = `-loop 1 -i "${imagePath}" -c:v libx264 -t ${duration} -pix_fmt yuv420p -vf scale=1920:1080 "${outputVideoPath}"`;

  const session = await FFmpegKit.execute(ffmpegCommand);
  const returnCode = await session.getReturnCode();

  if (ReturnCode.isSuccess(returnCode)) {
    console.log("Видео из изображения создано:", outputVideoPath);
    return outputVideoPath;
  } else {
    throw new Error("Не удалось конвертировать изображение в видео");
  }
};

export const imageToVideoCreator = async (animationType: string) => {
  if (!mediaStore.mediaFile1 || !mediaStore.mediaFile2) {
    console.log("Не прикреплено одно из изображений");
    return false;
  }

  const image1 = mediaStore.mediaFile1.startsWith("file://")
    ? mediaStore.mediaFile1
    : `file://${mediaStore.mediaFile1}`;
  const image2 = mediaStore.mediaFile2.startsWith("file://")
    ? mediaStore.mediaFile2
    : `file://${mediaStore.mediaFile2}`;
  const outputPath = `${RNFS.DocumentDirectoryPath}/photo_video_${Math.floor(Math.random() * 10000)}.mp4`;

  const image1Exists = await checkFileExists(image1);
  const image2Exists = await checkFileExists(image2);
  if (!image1Exists || !image2Exists) {
    console.log("Ошибка: Одно или оба изображения недоступны");
    return false;
  }

  try {
    const video1Path = await imageToVideo(image1, 3);
    const video2Path = await imageToVideo(image2, 3);

    const transitionDuration = 1;
    const offset = 3 - transitionDuration;
    const targetWidth = 1920;
    const targetHeight = 1080;

    const ffmpegCommand = `-y -i "${video1Path}" -i "${video2Path}" -filter_complex "` +
      `[0:v]scale=${targetWidth}:${targetHeight}:force_original_aspect_ratio=decrease,pad=${targetWidth}:${targetHeight}:(ow-iw)/2:(oh-ih)/2,setsar=1,fps=30[v0];` +
      `[1:v]scale=${targetWidth}:${targetHeight}:force_original_aspect_ratio=decrease,pad=${targetWidth}:${targetHeight}:(ow-iw)/2:(oh-ih)/2,setsar=1,fps=30[v1];` +
      `[v0][v1]xfade=transition=${animationType}:duration=${transitionDuration}:offset=${offset}[outv]" ` +
      `-map "[outv]" -an -c:v mpeg4 -r 30 "${outputPath}"`;

    const session = await FFmpegKit.execute(ffmpegCommand);
    const returnCode = await session.getReturnCode();

    if (ReturnCode.isSuccess(returnCode)) {
      console.log("Видео успешно создано:", `file://${outputPath}`);
      mediaStore.createResult(`file://${outputPath}`);
      try {
        await CameraRoll.saveAsset(`file://${outputPath}`, { type: "video" });
        console.log("Видео сохранено в галерею");
      } catch (error) {
        console.log("Ошибка сохранения в галерею:", error);
      }
      return true;
    } else {
      console.log("Ошибка при создании видео:", await session.getOutput());
      return false;
    }
  } catch (error) {
    console.log("Ошибка выполнения FFmpeg:", error);
    return false;
  }
};