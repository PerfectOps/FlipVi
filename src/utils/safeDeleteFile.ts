import RNFS from 'react-native-fs';

export const safeDeleteFile = async (path: string): Promise<boolean> => {
    try {
        await RNFS.unlink(path);
        return true;
    } catch (error) {
        console.error(`Error deleting file: ${path}`, error);
        return false;
    }
};