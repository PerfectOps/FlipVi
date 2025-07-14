// stores/CounterStore.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { makeAutoObservable } from "mobx";

class MediaStore {
    mediaFile1: string | undefined = undefined;
    mediaFile2: string | undefined = undefined;
    mediaResult: string | {id: string, name: string, description: string, type: string | null} | undefined = undefined;
    selectedAnimation: string | {id: string, name: string, description: string, type: string | null} = '';
    galleryVideos: string[] = [];

    constructor() {
        makeAutoObservable(this);
        this.loadGalleryVideos();
    }

    addMediaFile1(fileUri: string | undefined) {
        this.mediaFile1 = fileUri;
    }

    addMediaFile2(fileUri: string | undefined) {
        this.mediaFile2 = fileUri;
    }

    createResult(fileUri: string | undefined) {
        this.mediaResult = fileUri;
        if (fileUri) {
            this.addToGallery(fileUri);
        }
    }

    setAnimation(animationType: string) {
        this.selectedAnimation = animationType;
    }

    deleteMediaFile(index: number) {
        index == 1 ? this.mediaFile1 = undefined : this.mediaFile2 = undefined;
    }

    clearMediaFiles() {
       this.mediaFile1 = undefined;
       this.mediaFile2 = undefined; 
    }

    async loadGalleryVideos() {
        try {
            const storedVideos = await AsyncStorage.getItem('galleryVideos');
            if (storedVideos) {
                this.galleryVideos = JSON.parse(storedVideos);
                console.log('Загруженные видео из галереи:', this.galleryVideos);
            }
        } catch (error) {
            console.log('Ошибка загрузки видео из галереи:', error);
        }
    }

    async addToGallery(videoPath: string) {
        try {
            this.galleryVideos.push(videoPath);
            await AsyncStorage.setItem('galleryVideos', JSON.stringify(this.galleryVideos));
            console.log('Видео добавлено в галерею:', videoPath);
        } catch (error) {
            console.log('Ошибка сохранения видео в галерею:', error);
        }
    }

    async removeFromGallery(videoPath: string) {
        try {
            this.galleryVideos = this.galleryVideos.filter((path) => path !== videoPath);
            await AsyncStorage.setItem('galleryVideos', JSON.stringify(this.galleryVideos));
            console.log('Видео удалено из галереи:', videoPath);
        } catch (error) {
            console.log('Ошибка удаления видео из галереи:', error);
        }
    }
}

export const mediaStore = new MediaStore();
