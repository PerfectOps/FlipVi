import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor:'#1A1A1A'
    },
    header: {
        paddingHorizontal: 20,
        marginBottom: 20
    },
    header1: {
        
    },
    headerIconBox: {
        paddingTop: 30
    },
    infoIcon: {
        width: 24,
        height: 24,
        opacity: 0
    },
    textHeader: {
        color: '#FFF9F0',
        fontSize: 30,
        textAlign: 'left',
        fontFamily: 'Montserrat-Bold'
    },
    body: {
        gap: 25,
        marginTop: 40
    },
    buttonBody: {
        backgroundColor: '#00C2B2',
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderRadius: 20
    },
    textButton: {
        color: 'white',
        fontFamily: 'Montserrat-Medium',
        fontSize: 16
    },
    textBottom: {
        color: 'white',
        fontFamily: 'Montserrat-Medium',
        fontSize: 16,
        opacity: 0.3
    },
    bottomText: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: 15
    },
    bottom: {
        justifyContent: 'flex-end',
        flex: 1,
        marginBottom: 100
    }
});