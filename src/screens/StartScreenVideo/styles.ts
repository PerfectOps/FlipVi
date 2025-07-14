import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

export const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: colors.primary,
    },
    header: {
        paddingHorizontal: 20,
    },
    header1: {
        
    },
    headerIconBox: {
        paddingTop: 30
    },
    infoIcon: {
        width: 24,
        height: 24
    },
    textHeader: {
        color: colors.text,
        fontSize: 30,
        textAlign: 'left',
        fontFamily: 'Montserrat-Bold'
    },
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 50,
        paddingHorizontal: 15,
    },
    boxButton: {
        backgroundColor: colors.violet,
        width: 280,
        borderRadius: 10,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    textChangeMedia: {
        color: '#FFF9F0',
        fontSize: 20,
        fontFamily: 'Montserrat-Medium',
        textAlign: 'center',
        paddingVertical: 20
    },
    textChangeMediaB: {
        color: colors.text,
        fontSize: 20,
        fontFamily: 'Montserrat-Medium',
        textAlign: 'center',
        paddingVertical: 20,
        textDecorationLine: 'underline'
    },
    mediaOpen: {
        width: '100%',
        height: 200,
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    nextButton: {
        color: colors.text,
        fontSize: 20,
        fontFamily: 'Montserrat-Medium',
        textAlign: 'center',
        paddingVertical: 20,
        backgroundColor: colors.violet,
        padding: 10,
        borderRadius: 15
    }
})