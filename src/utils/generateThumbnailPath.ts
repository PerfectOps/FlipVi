import RNFS from 'react-native-fs';

export const generateThumbnailPath = (): string => {
    return `${RNFS.CachesDirectoryPath}/thumb-${Date.now()}.jpg`;
};