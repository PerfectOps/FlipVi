import { useEffect } from 'react';
import { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { ANIMATION_DURATION, TAB_DIMENSIONS } from '../constants/TabNavigation';

export const useTabAnimation = (focused: boolean) => {
    const width = useSharedValue(
        focused ? TAB_DIMENSIONS.FOCUSED_WIDTH : TAB_DIMENSIONS.UNFOCUSED_WIDTH
    );
    const opacity = useSharedValue(1);
    const textOpacity = useSharedValue(focused ? 1 : 0);

    useEffect(() => {
        width.value = withTiming(
            focused ? TAB_DIMENSIONS.FOCUSED_WIDTH : TAB_DIMENSIONS.UNFOCUSED_WIDTH,
            { duration: ANIMATION_DURATION.WIDTH }
        );
        
        textOpacity.value = withTiming(
            focused ? 1 : 0,
            { duration: ANIMATION_DURATION.TEXT_OPACITY }
        );
    }, [focused, width, textOpacity]);

    const animatedStyle = useAnimatedStyle(() => ({
        width: width.value,
        opacity: opacity.value,
    }));

    const animatedTextStyle = useAnimatedStyle(() => ({
        opacity: textOpacity.value,
    }));

    return { animatedStyle, animatedTextStyle };
};