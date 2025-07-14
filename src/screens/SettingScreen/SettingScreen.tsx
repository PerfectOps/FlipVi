import { ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { ScreenProps } from "../../types/ScreenProps";
import { observer } from "mobx-react-lite";
import DeviceInfo from "react-native-device-info";
import { styles } from "./styles";

const SettingScreen: React.FC<ScreenProps> = observer(({navigation}) => {
    return (
        <SafeAreaView style={styles.main}>
            <View style={styles.header}>
                <View style={styles.header1}>
                    <TouchableOpacity style={styles.headerIconBox}>
                        <Image source={require('../../assets/info.png')} style={styles.infoIcon} />
                    </TouchableOpacity>
                    <Text></Text>
                </View>
                <Text style={styles.textHeader}>Настройки</Text>
            </View>
            <View style={styles.body}>
                <View style={styles.buttonBody}>
                    <Text style={styles.textButton}>Язык приложения:</Text>
                    <Text style={styles.textButton}>Русский</Text>
                </View>
            </View>
            <View style={styles.bottom}>
                <View style={styles.bottomText}>
                    <Text style={styles.textBottom}>Версия приложения:  </Text>
                    <Text style={styles.textBottom}>{DeviceInfo.getVersion()}</Text>
                </View>
            </View>
        </SafeAreaView>
    )
})

export default SettingScreen;