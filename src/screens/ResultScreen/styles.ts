import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

export const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: colors.primary
    },
    header: {
        paddingHorizontal: 20,
        paddingVertical: 30,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headerTop: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    headerStepText: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 16,
        color: colors.text,
        opacity: 0.5
    },
    infoIcon: {
        width: 24,
        height: 24,
        opacity: 0
    },
    textTop: {
        color: colors.text,
        fontSize: 30,
        textAlign: 'left',
        fontFamily: 'Montserrat-Bold'
    },
    body: {
        gap: 45,
        paddingHorizontal: 20,
        justifyContent: 'center'
    },
    textLoading: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'Montserrat-Bold'
    },
    mainAsset: {
        width: '100%',
        height: 280,
    },
    chooseGalleryButton: {
        backgroundColor: '#E83757',
        paddingVertical: 10,
        flexDirection: 'row',
        gap: 15,
        justifyContent: 'center',
        borderRadius: 10,
        marginHorizontal: 60
    },
    chooseGalleryButtonIcon: {
        width: 24,
        height: 24
    },
    chooseGalleryButtonText: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 16,
        color: colors.text,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    bottom: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        gap: 20,
        flex: 1,
        marginBottom: 100
    },
    bottomButtonText: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 18,
        color: colors.text,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    bottomBack: {
        backgroundColor: colors.accent,
        padding: 20,
        borderRadius: 10
    },
    bottomNext: {
        backgroundColor: colors.success,
        borderRadius: 10,
        paddingHorizontal: 30,
        paddingVertical: 18
    }
});