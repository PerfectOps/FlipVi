import { MainTabParamList, TabIconConfig } from '../types/Navigation';

export const getTabIconConfig = (routeName: keyof MainTabParamList): TabIconConfig => {
    const configs: Record<keyof MainTabParamList, TabIconConfig> = {
        Main: {
            iconSource: require('../assets/tabCreate.png'),
            label: 'Создание',
        },
        Gallery: {
            iconSource: require('../assets/tabGallery.png'),
            label: 'Галерея',
        },
        Settings: {
            iconSource: require('../assets/tabSettings.png'),
            label: 'Настройки',
        },
    };

    return configs[routeName];
};