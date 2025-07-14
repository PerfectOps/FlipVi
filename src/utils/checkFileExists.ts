import RNFS from 'react-native-fs';

export const checkFileExists = async (path: string): Promise<boolean> => {
    try {
        return await RNFS.exists(path);
    } catch (error) {
        console.error(`Error checking file existence: ${path}`, error);
        return false;
    }
};