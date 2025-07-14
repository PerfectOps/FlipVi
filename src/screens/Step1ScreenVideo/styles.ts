import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

export const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: colors.primary,
    },
    header: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
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
        height: 24
    },
    textTop: {
        color: colors.text,
        fontSize: 30,
        textAlign: 'left',
        fontFamily: 'Montserrat-Bold'
    },
    body: {
        flex: 12,
        gap: 45,
        paddingHorizontal: 20,
        justifyContent: 'center'
    },
    mainAsset: {
        width: '100%',
        height: 250,
    },
    chooseGalleryButton: {
        backgroundColor: colors.secondary,
        paddingVertical: 10,
        flexDirection: 'row',
        gap: 15,
        justifyContent: 'center',
        borderRadius: 10,
        marginHorizontal: 50
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
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: 20,
        flex: 4,
        // marginBottom: 100
    },
    bottomButtonText: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 18,
        color: colors.text,
        textAlign: 'center',
    },
    bottomBack: {
        backgroundColor: colors.secondary,
        padding: 18,
        borderRadius: 10,
        opacity: 0.9
    },
    bottomNext: {
        backgroundColor: colors.accent,
        borderRadius: 10,
        paddingHorizontal: 82,
        paddingVertical: 16
    },
    iconBottom: {
        width: 24,
        height: 24,
    }
})