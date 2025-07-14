import { useEffect } from "react";
import { Alert, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { StartScreenProps } from "../../types/StartScreenProps";
import { observer } from "mobx-react-lite";
import { mediaStore } from "../../store/MediaStore";
import { AppHeader } from "../../components/AppHeader";
import { styles } from "./styles";

const StartScreen: React.FC<StartScreenProps> = observer(({navigation}) => {

    useEffect(() => {
        mediaStore.addMediaFile1(undefined);
        mediaStore.addMediaFile2(undefined)
    }, [])

    return (
        <SafeAreaView style={styles.main}>
            <AppHeader
                title="Что делаем на этот раз?"
                onInfoPress={() => {Alert.alert('Соединяйте свои видео!', 'Приложение разработано в первую очередь, чтобы Вы могли соединить свои видео для демонстрации результата в формате "до/после"!')}}
            />
            <View style={styles.body}>
                <TouchableOpacity onPress={() => {navigation.navigate('Step1Screen')}} style={styles.boxButton}>
                    <Text style={styles.textChangeMedia}>Объединяем  </Text>
                    <Text style={styles.textChangeMediaB}>видео</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {Alert.alert('В разработке', 'Скоро можно будет соединять фото и получать видео!')}} style={styles.boxButton}>
                    <Text style={styles.textChangeMedia}>Объединяем  </Text>
                    <Text style={styles.textChangeMediaB}>фото</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
});

export default StartScreen;