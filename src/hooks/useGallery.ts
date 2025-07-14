import { useState, useCallback, useEffect } from 'react';
import { Alert } from 'react-native';
import { VideoItem } from '../types/GalleryScreenTypes';
import { useVideoService } from './useVideoService';
import { UseGalleryProps } from '../types/UseGalleryProps';

export const useGallery = ({ galleryVideos, removeFromGallery }: UseGalleryProps) => {
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [videoItems, setVideoItems] = useState<VideoItem[]>([]);
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const { loadVideos: loadVideoService, deleteVideo: deleteVideoService } = useVideoService();

    const loadVideos = useCallback(async (): Promise<void> => {
        try {
            setIsLoading(true);
            const videos = await loadVideoService(galleryVideos, removeFromGallery);
            setVideoItems(videos);
        } catch (error) {
            console.error('Error loading videos:', error);
            Alert.alert('Ошибка', 'Не удалось загрузить видео');
        } finally {
            setIsLoading(false);
        }
    }, [galleryVideos, removeFromGallery, loadVideoService]);

    const onRefresh = useCallback((): void => {
        setRefreshing(true);
        loadVideos().finally(() => {
            setTimeout(() => {
                setRefreshing(false);
            }, 2000);
        });
    }, [loadVideos]);

    const deleteVideo = useCallback(async (videoPath: string): Promise<void> => {
        Alert.alert(
            'Удалить видео',
            'Вы уверены, что хотите удалить это видео?',
            [
                { text: 'Отмена', style: 'cancel' },
                {
                text: 'Удалить',
                style: 'destructive',
                onPress: async (): Promise<void> => {
                    try {
                        const success = await deleteVideoService(videoPath);
                        if (success) {
                            await removeFromGallery(videoPath);
                            setVideoItems(prev => prev.filter(item => item.path !== videoPath));
                        } else {
                            Alert.alert('Ошибка', 'Не удалось удалить видео');
                        }
                    } catch (error) {
                        console.error(`Error deleting video ${videoPath}:`, error);
                        Alert.alert('Ошибка', 'Не удалось удалить видео');
                    }
                },
                },
            ]
        );
    }, [removeFromGallery, deleteVideoService]);

    const playVideo = useCallback((videoPath: string): void => {
        setSelectedVideo(videoPath);
    }, []);

    const closeVideoModal = useCallback((): void => {
        setSelectedVideo(null);
    }, []);

    useEffect(() => {
        loadVideos();
    }, [loadVideos]);

    return {
        // State
        refreshing,
        videoItems,
        selectedVideo,
        isLoading,
        // Actions
        onRefresh,
        deleteVideo,
        playVideo,
        closeVideoModal,
        loadVideos,
    };
};