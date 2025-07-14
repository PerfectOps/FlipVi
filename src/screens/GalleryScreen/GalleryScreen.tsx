import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, View, Text, TouchableOpacity, StyleSheet, Image, Alert, Modal, Dimensions, SafeAreaView, ImageBackground, ScrollView } from 'react-native';
import { observer } from 'mobx-react-lite';
import Video from 'react-native-video';
import { FFmpegKit } from 'ffmpeg-kit-react-native';
import RNFS from 'react-native-fs';
import { mediaStore } from '../../store/MediaStore';
import { ScreenProps } from '../../types/ScreenProps';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppHeader } from '../../components/AppHeader';
import { styles } from './styles';
import { VideoItem } from '../../types/GalleryScreenTypes';

const GalleryScreen: React.FC<ScreenProps> = observer(({navigation}) => {
    const [refreshing, setRefreshing] = React.useState(false);
    const [videoItems, setVideoItems] = useState<VideoItem[]>([]);
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

    const loadVideos = async () => {
        const items: VideoItem[] = [];
        for (const video of mediaStore.galleryVideos) {
            try {
                const videoPath = video;
                const firstVideoDuration = 1;
    
                const fileExists = await RNFS.exists(videoPath);
                if (!fileExists) {
                    console.log(`Файл не существует: ${videoPath}`);
                    await mediaStore.removeFromGallery(videoPath);
                    continue;
                }
    
                if (!firstVideoDuration || isNaN(firstVideoDuration)) {
                    console.warn(`Некорректная длительность: ${firstVideoDuration}`);
                    continue;
                }
    
                const transitionPoint = (firstVideoDuration - 0.5);
                const outputThumbnailPath = `${RNFS.CachesDirectoryPath}/thumb-${Date.now()}.jpg`;
    
                const command = `-ss ${transitionPoint} -i "${videoPath}" -frames:v 1 -q:v 2 "${outputThumbnailPath}"`;
    
                await FFmpegKit.execute(command);
    
                const thumbnailExists = await RNFS.exists(outputThumbnailPath);
                if (!thumbnailExists) {
                    console.warn(`Миниатюра не создана: ${videoPath}`);
                    continue;
                }
    
                const stats = await RNFS.stat(videoPath);
                const date = new Date(stats.ctime).toLocaleDateString('ru-GB', { day: 'numeric', month: 'numeric' }) + ' / ' + new Date(stats.ctime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

                items.push({
                    path: videoPath,
                    thumbnail: `file://${outputThumbnailPath}`,
                    date,
                });
            } catch (error) {
                console.log(`Ошибка видео:`, error);
            }
        }

        setVideoItems(items.reverse());
    };

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        loadVideos();
        setTimeout(() => {
          setRefreshing(false);
        }, 2000);
    }, []);

    useEffect(() => {
        loadVideos();
    }, [mediaStore.galleryVideos]);

    const deleteVideo = async (videoPath: string) => {
        Alert.alert(
        'Удалить видео',
        'Вы уверены, что хотите удалить это видео?',
        [
            { text: 'Отмена', style: 'cancel' },
            {
            text: 'Удалить',
            style: 'destructive',
            onPress: async () => {
                try {
                await RNFS.unlink(videoPath);
                await mediaStore.removeFromGallery(videoPath);
                setVideoItems(videoItems.filter((item) => item.path !== videoPath));
                } catch (error) {
                console.log(`Ошибка удаления видео ${videoPath}:`, error);
                }
            },
            },
        ]
        );
    };

    const playVideo = (videoPath: string) => {
        setSelectedVideo(videoPath);
    };

    const onLoad = (data: any) => {
        console.log(data)
    }

    const renderVideoItem = ({ item }: { item: VideoItem }) => (
        <TouchableOpacity onPress={() => playVideo(item.path)} style={styles.card}>
            <ImageBackground source={{ uri: item.thumbnail }} style={styles.thumbnail}>
                <Text style={styles.dateText}>{item.date}</Text>
            </ImageBackground>
        </TouchableOpacity>
    );

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                {videoItems.length === 0 ? (
                    <>
                        <View style={styles.header}>
                            <AppHeader
                                title="В галерее еще пусто"
                                onInfoPress={() => Alert.alert('Раздел галерея', 'Здесь хранятся все ваши работы!')}
                            />
                        </View>
                    <View style={styles.listContainer} />
                    </>
                ) : (
                    <>
                        <View style={styles.header}>
                            <AppHeader
                                title="Галерея"
                                onInfoPress={() => Alert.alert('Раздел галерея', 'Здесь хранятся все ваши работы!')}
                            />
                        </View>
                        <View style={styles.listContainer}>
                            <FlatList
                                refreshControl={
                                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                                }
                                data={videoItems}
                                renderItem={renderVideoItem}
                                keyExtractor={(item) => item.path}
                                numColumns={2}
                                contentContainerStyle={styles.galleryList}
                            />
                        </View>
                    </>
                )}
                <View style={styles.bottom}>
                    <TouchableOpacity style={styles.bottomNext} onPress={() => {navigation.navigate('Main')}}>
                        <Text style={styles.bottomButtonText}>+ Создать новый</Text>
                    </TouchableOpacity>
                </View>

            <Modal
                visible={!!selectedVideo}
                onRequestClose={() => setSelectedVideo(null)}
                animationType="fade"
                transparent
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalOverlay} />
                    <View style={styles.modalContent}>
                        {selectedVideo && (
                        <Video
                            source={{ uri: selectedVideo }}
                            style={styles.videoPlayer}
                            controls
                            resizeMode="contain"
                            onEnd={() => setSelectedVideo(null)}
                            onError={(error) => console.log('Ошибка воспроизведения:', error)}
                        />
                        )}
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setSelectedVideo(null)}
                        >
                            <Text style={styles.closeButtonText}>Закрыть</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    </SafeAreaProvider>
    );
});

export default GalleryScreen;