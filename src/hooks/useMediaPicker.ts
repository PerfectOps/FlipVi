import { useCallback } from "react";
import { launchImageLibrary } from "react-native-image-picker";

export const useMediaPicker = () => {
    const openGallery = (
        mediaType: 'mixed' | 'video' | 'photo',
        onSuccess: (uri: string) => void
    ) => {
        launchImageLibrary({ mediaType }, response => {
            if (response.didCancel || response.errorCode) {
                console.log('User cancelled or error:', response.errorCode);
                return;
            }
            
            const imageUri = response.assets?.[0]?.uri;
            if (imageUri) {
                onSuccess(imageUri);
            }
        });
    };
  
    return { openGallery };
};