import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1A1A1A',
    },
    header: {
        marginBottom: 20
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
        color: '#FFF9F0',
        fontSize: 30,
        textAlign: 'left',
        fontFamily: 'Montserrat-Bold'
    },
    listContainer: {
        flex: 12,
        gap: 45,
        paddingHorizontal: 20,
    },
    galleryList: {
        // marginTop: 40,
        marginBottom: 40,
        gap: 30,
        alignItems: 'center',
    },
    card: {
        width: 160,
        height: 160,
        borderRadius: 20,
        marginHorizontal: 15
    },
    thumbnailContainer: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    thumbnail: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
        overflow: 'hidden'
    },
    playIconContainer: {
        position: 'absolute',
        right: 14,
        top: 14,
        width: 40,
        height: 40,
        borderRadius: 50,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    playIcon: {
        width: 24,
        height: 24
    },
    dateText: {
        fontSize: 14,
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Montserrat-Medium',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'absolute',
        bottom: 14,
        left: 14,
        paddingHorizontal: 8,
        borderRadius: 20,
        paddingVertical: 4
    },
    deleteButton: {
        backgroundColor: '#ff4d4d',
        paddingVertical: 10,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    deleteButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '600',
    },
    emptyText: {
        flex: 1,
        textAlign: 'center',
        marginTop: 50,
        fontSize: 18,
        color: '#6c757d',
        fontWeight: '500',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Затемнение фона
    },
    modalContent: {
        width: '90%',
        backgroundColor: '#A06EFB',
        borderRadius: 20,
        padding: 20,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
    videoPlayer: {
        width: '100%',
        height: 250,
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: '#1A1A1A'
    },
    closeButton: {
        marginTop: 25,
        paddingVertical: 15,
        paddingHorizontal: 30,
        backgroundColor: '#00C2B2',
        borderRadius: 20,
        alignSelf: 'center',
    },
    closeButtonText: {
        fontSize: 16,
        color: '#fff',
        fontFamily: 'Montserrat-Medium',
    },
    bottom: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: 20,
        flex: 5,
        marginTop: 15
        // marginBottom: 100
    },
    bottomButtonText: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 18,
        color: '#FFF9F0',
        textAlign: 'center',
    },
    bottomBack: {
        backgroundColor: '#00C2B2',
        padding: 18,
        borderRadius: 10,
        opacity: 0.9
    },
    bottomNext: {
        backgroundColor: '#00C2B2',
        borderRadius: 10,
        paddingHorizontal: 82,
        paddingVertical: 16
    },
    iconBottom: {
        width: 24,
        height: 24,
    }
});