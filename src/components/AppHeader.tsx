import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AppHeaderProps } from "../types/AppHeaderProps";
import { colors } from "../constants/colors";

export const AppHeader: React.FC<AppHeaderProps> = ({
        title,
        stepInfo,
        onInfoPress
    }) => {
    return (
        <View style={styles.header}>
            <View style={styles.row}>
                <TouchableOpacity onPress={onInfoPress}>
                    <Image source={require('../assets/info.png')} style={styles.infoIcon} />
                </TouchableOpacity>
                {stepInfo && (<Text style={styles.stepInfo}>{stepInfo}</Text>)}
            </View>
            <Text style={styles.textHeader}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        gap: 14,
    },
    infoIcon: {
        width: 24,
        height: 24
    },
    textHeader: {
        color: '#FFF9F0',
        fontSize: 30,
        textAlign: 'left',
        fontFamily: 'Montserrat-Bold',
        paddingHorizontal: 20
    },
    row: {
        paddingHorizontal: 20,
        paddingTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    stepInfo: {
        color: colors.text,
        opacity: 0.5,
        fontSize: 16,
        fontFamily: 'Montserrat-Medium',
    }
})