import { StyleSheet } from "react-native";
import { COLORS, TAB_DIMENSIONS } from "../constants/TabNavigation";

export const styles = StyleSheet.create({
    tabBarContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        left: '16%',
        right: 0,
        height: TAB_DIMENSIONS.CONTAINER_HEIGHT,
        width: TAB_DIMENSIONS.CONTAINER_WIDTH,
        backgroundColor: COLORS.INACTIVE,
        borderRadius: 1000,
    },
    tab: {
        justifyContent: 'center',
        alignItems: 'center',
        height: TAB_DIMENSIONS.HEIGHT,
        marginHorizontal: 2,
        backgroundColor: COLORS.INACTIVE,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
    },
    icon: {
        width: TAB_DIMENSIONS.ICON_SIZE,
        height: TAB_DIMENSIONS.ICON_SIZE,
        tintColor: COLORS.TEXT,
        marginRight: TAB_DIMENSIONS.ICON_MARGIN,
    },
    textContainer: {
        position: 'absolute',
        left: TAB_DIMENSIONS.ICON_SIZE + 10,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
    },
    text: {
        fontSize: 14,
        fontFamily: 'Montserrat-SemiBold',
        color: COLORS.TEXT,
    },
});