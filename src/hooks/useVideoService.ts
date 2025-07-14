import { useCallback } from 'react';
import { FFmpegKit } from 'ffmpeg-kit-react-native';
import { VideoItem } from '../types/GalleryScreenTypes';
import { generateThumbnailPath } from '../utils/generateThumbnailPath';
import { checkFileExists } from '../utils/checkFileExists';
import { getFileStats } from '../utils/getFileStats';
import { formatDate } from '../utils/formatDate';
import { safeDeleteFile } from '../utils/safeDeleteFile';

export const useVideoService = () => {

    const generateThumbnail = useCallback(async (videoPath: string): Promise<string | null> => {
        try {
        const firstVideoDuration = 1;
        const transitionPoint = Math.max(0, firstVideoDuration - 0.5);
        const outputThumbnailPath = generateThumbnailPath();

        const command = `-ss ${transitionPoint} -i "${videoPath}" -frames:v 1 -q:v 2 "${outputThumbnailPath}"`;
        await FFmpegKit.execute(command);

        const thumbnailExists = await checkFileExists(outputThumbnailPath);
        if (!thumbnailExists) {
            console.warn(`Thumbnail not created for: ${videoPath}`);
            return null;
        }

        return `file://${outputThumbnailPath}`;
        } catch (error) {
        console.error(`Error generating thumbnail for ${videoPath}:`, error);
        return null;
        }
    }, []);

    const processVideo = useCallback(async (videoPath: string, onRemove: (path: string) => Promise<void>): Promise<VideoItem | null> => {
        try {
        const fileExists = await checkFileExists(videoPath);
        if (!fileExists) {
            console.log(`File does not exist: ${videoPath}`);
            await onRemove(videoPath);
            return null;
        }

        const thumbnail = await generateThumbnail(videoPath);
        if (!thumbnail) {
            return null;
        }

        const stats = await getFileStats(videoPath);
        if (!stats) {
            return null;
        }

        const date = formatDate(stats.ctime);

        return {
            path: videoPath,
            thumbnail,
            date,
        };
        } catch (error) {
        console.error(`Error processing video ${videoPath}:`, error);
        return null;
        }
    }, [generateThumbnail]);

    const deleteVideo = useCallback(async (videoPath: string): Promise<boolean> => {
        return await safeDeleteFile(videoPath);
    }, []);

    const loadVideos = useCallback(async (
        videoPaths: string[], 
        onRemove: (path: string) => Promise<void>
    ): Promise<VideoItem[]> => {
        try {
        const processedVideos = await Promise.all(
            videoPaths.map(path => processVideo(path, onRemove))
        );

        return processedVideos
            .filter((item): item is VideoItem => item !== null)
            .reverse(); // Show newest first
        } catch (error) {
        console.error('Error loading videos:', error);
        throw new Error('Failed to load videos');
        }
    }, [processVideo]);

    return {
        generateThumbnail,
        processVideo,
        deleteVideo,
        loadVideos,
    };
};