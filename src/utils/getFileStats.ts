import RNFS from 'react-native-fs';

export const getFileStats = async (path: string) => {
    try {
        return await RNFS.stat(path);
    } catch (error) {
        console.error(`Error getting file stats: ${path}`, error);
        return null;
    }
};