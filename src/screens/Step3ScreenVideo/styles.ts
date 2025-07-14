import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

export const styles = StyleSheet.create({
    main: {
        backgroundColor: colors.primary,
        flex: 1
    },
    header: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 30,
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
        height: 24
    },
    textTop: {
        color: colors.text,
        fontSize: 30,
        textAlign: 'left',
        fontFamily: 'Montserrat-Bold'
    },
    body: {
        // gap: 45,
        paddingHorizontal: 20,
        flex: 12
    },
    bottom: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        gap: 20,
        flex: 2,
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
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    gallery: {
        
    },
    animationItem: {
        // marginBottom: 50,
        padding: 10,
        borderRadius: 20,
        width: 130,
        height: 200,
        backgroundColor: colors.cardBackground,
        justifyContent: 'center',
    },
    selectedItem: {
        borderColor: colors.text,
        borderWidth: 3,
    },
    animationName: {
        fontSize: 12,
        fontFamily: 'Montserrat-Bold',
        textAlign: 'left',
        color: colors.text,
    },
    animationDescription: {
        fontSize: 12,
        color: '#111111',
        textAlign: 'left',
        fontFamily: 'Montserrat-Regular'
    },
});