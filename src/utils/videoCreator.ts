import { FFmpegKit, ReturnCode } from 'ffmpeg-kit-react-native';
import { mediaStore } from '../store/MediaStore';
import RNFS from 'react-native-fs';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { getVideoDuration } from 'react-native-video-duration';

const getVideoDimensions = async (videoPath: string): Promise<{ width: number; height: number }> => {
  try {
    const command = `-i "${videoPath}" -show_entries stream=width,height -v quiet -of json`;
    const session = await FFmpegKit.execute(command);
    const output = await session.getOutput();
    const data = JSON.parse(output);
    const stream = data.streams?.find((s: any) => s.width && s.height);
    const width = stream?.width || 1920;
    const height = stream?.height || 1080;
    return { width, height };
  } catch {
    return { width: 1920, height: 1080 };
  }
};

const checkFileExists = async (filePath: string): Promise<boolean> => {
  const cleanPath = filePath.replace('file://', '');
  return RNFS.exists(cleanPath);
};

export const videoCreator = async (animationType: string | null = null) => {
  if (!mediaStore.mediaFile1 || !mediaStore.mediaFile2) return false;

  const video1 = mediaStore.mediaFile1.startsWith('file://') ? mediaStore.mediaFile1 : `file://${mediaStore.mediaFile1}`;
  const video2 = mediaStore.mediaFile2.startsWith('file://') ? mediaStore.mediaFile2 : `file://${mediaStore.mediaFile2}`;
  const outputPath = `${RNFS.DocumentDirectoryPath}/flipvi${Math.floor(Math.random() * 10000)}.mp4`;

  const video1Exists = await checkFileExists(video1);
  const video2Exists = await checkFileExists(video2);
  if (!video1Exists || !video2Exists) return false;

  const { width, height } = await getVideoDimensions(video1);
  const targetWidth = width % 2 === 0 ? width : width - 1;
  const targetHeight = height % 2 === 0 ? height : height - 1;

  let ffmpegCommand: string;

  if (animationType) {
    const duration1: any = await getVideoDuration(video1);
    const duration2 = await getVideoDuration(video2);
    const transitionDuration = 1;
    const offset = duration1 - transitionDuration;
    console.log('Длительность 1 и оффсет: ', duration1, offset)

    if (offset < 0) return false;

    ffmpegCommand = `-y -i "${video1}" -i "${video2}" -filter_complex "` +
      `[0:v]scale=${targetWidth}:${targetHeight}:force_original_aspect_ratio=decrease,pad=${targetWidth}:${targetHeight}:(ow-iw)/2:(oh-ih)/2,setsar=1,fps=30,setpts=PTS-STARTPTS[v0];` +
      `[1:v]scale=${targetWidth}:${targetHeight}:force_original_aspect_ratio=decrease,pad=${targetWidth}:${targetHeight}:(ow-iw)/2:(oh-ih)/2,setsar=1,fps=30,setpts=PTS-STARTPTS[v1];` +
      `[v0][v1]xfade=transition=${animationType}:duration=${transitionDuration}:offset=${offset}[outv]" ` +
      `-map "[outv]" -an -c:v mpeg4 -r 30 "${outputPath}"`;
  } else {
    ffmpegCommand = `-y -i "${video1}" -i "${video2}" -filter_complex "` +
      `[0:v]scale=${targetWidth}:${targetHeight}:force_original_aspect_ratio=decrease,pad=${targetWidth}:${targetHeight}:(ow-iw)/2:(oh-ih)/2,setsar=1,fps=30[v0];` +
      `[1:v]scale=${targetWidth}:${targetHeight}:force_original_aspect_ratio=decrease,pad=${targetWidth}:${targetHeight}:(ow-iw)/2:(oh-ih)/2,setsar=1,fps=30[v1];` +
      `[v0][v1]concat=n=2:v=1[outv]" ` +
      `-map "[outv]" -an -c:v mpeg4 -r 30 "${outputPath}"`;
  }

  const session = await FFmpegKit.execute(ffmpegCommand);
  const returnCode = await session.getReturnCode();

  if (ReturnCode.isSuccess(returnCode)) {
    mediaStore.createResult(`file://${outputPath}`);
    try {
      await CameraRoll.saveAsset(`file://${outputPath}`, { type: 'video' });
    } catch {}
    return true;
  }

  return false;
};
