import { ImageSourcePropType } from "react-native";

export type RootStackParamList = {
    MainTab: undefined;
};
  
export type MainTabParamList = {
    Main: undefined;
    Gallery: undefined;
    Settings: undefined;
};
  
export type MainStackParamList = {
    StartScreen: undefined;
    Step1Screen: undefined;
    Step2Screen: undefined;
    Step3Screen: undefined;
    Step1ScreenPhoto: undefined;
    Step2ScreenPhoto: undefined;
    Step3ScreenPhoto: undefined;
    ResultScreen: undefined;
};
  
export interface TabItemProps {
    focused: boolean;
    iconSource: ImageSourcePropType;
    label: string;
    onPress: () => void;
}
  
export interface CustomTabBarProps {
    state: {
        routes: Array<{ key: string; name: keyof MainTabParamList }>;
        index: number;
    };
    descriptors: Record<string, { options: any }>;
    navigation: {
        emit: (event: {
            type: string;
            target: string;
            canPreventDefault: boolean;
        }) => { defaultPrevented: boolean };
        navigate: (routeName: keyof MainTabParamList) => void;
    };
}
  
export interface TabIconConfig {
    iconSource: ImageSourcePropType;
    label: string;
}