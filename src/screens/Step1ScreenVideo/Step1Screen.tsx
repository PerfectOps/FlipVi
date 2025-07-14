import { Alert, Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScreenProps } from "../../types/ScreenProps";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { mediaStore } from "../../store/MediaStore";
import Video from "react-native-video";
import React from "react";
import { useMediaPicker } from "../../hooks/useMediaPicker";
import { AppHeader } from "../../components/AppHeader";
import { styles } from "./styles";

const Step1Screen: React.FC<ScreenProps> = observer(({navigation}) => {
    const [isSelectedMedia, setSelectedMedia] = useState<string | undefined>(mediaStore.mediaFile1);
    const { openGallery } = useMediaPicker();

    const handleSelectMedia = () => {
        openGallery('mixed', (uri) => {
            mediaStore.addMediaFile1(uri);
            setSelectedMedia(uri);
        });
    };
    
    const handleNext = () => {
        if (isSelectedMedia) {
          navigation.navigate('Step2Screen');
        }
    };
    
    const handleInfoPress = () => {
        Alert.alert('Прикрепите первое видео!', 'Прикрепите свое первое видео для соединения ниже!');
    };

    return (
        <SafeAreaView style={styles.main}>
            <AppHeader
                title="Шаг 1: Загрузите первое видео"
                stepInfo="Шаг 1 из 3"
                onInfoPress={() => handleInfoPress()}
            />
            <View style={styles.body}>
                <View style={{alignItems: 'center'}}>
                    {
                        isSelectedMedia === undefined ? (
                            <Image source={require('../../assets/step1.png')} style={[styles.mainAsset, {width: 250}]} />
                        ) : (
                            <Video 
                                source={{uri: isSelectedMedia}}
                                controls={true}
                                style={styles.mainAsset} 
                            />
                        )
                    }
                </View>
                <TouchableOpacity style={styles.chooseGalleryButton} onPress={() => handleSelectMedia()}>
                    {
                        isSelectedMedia === undefined ? (
                            <>
                                <Image source={require('../../assets/plusRound.png')} style={styles.chooseGalleryButtonIcon} />
                                <Text style={styles.chooseGalleryButtonText}>Выбрать из галереи</Text>
                            </>
                        ) : (
                            <>
                                <Image source={require('../../assets/reload.png')} style={styles.chooseGalleryButtonIcon} />
                                <Text style={styles.chooseGalleryButtonText}>Изменить выбор</Text>
                            </>
                        )
                    }
                    
                </TouchableOpacity>
            </View>
            <View style={styles.bottom}>
                <TouchableOpacity style={styles.bottomBack} onPress={() => navigation.goBack()}>
                    <Image source={require('../../assets/left.png')} style={styles.iconBottom} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.bottomNext, isSelectedMedia ? {borderWidth: 3, borderColor: '#FFF9F0', paddingVertical: 13} : {} ]} onPress={() => handleNext()}>
                    <Text style={styles.bottomButtonText}>Далее</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
})

export default Step1Screen;