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

const Step2Screen: React.FC<ScreenProps> = observer(({navigation}) => {
    const [isSelectedMedia, setSelectedMedia] = useState<string | undefined>(mediaStore.mediaFile2);
    const { openGallery } = useMediaPicker();
    
    const handleSelectMedia = () => {
        openGallery('mixed', (uri) => {
            mediaStore.addMediaFile2(uri);
            setSelectedMedia(uri);
        });
    };
    
    const handleNext = () => {
        if (isSelectedMedia) {
            navigation.navigate('Step3Screen');
        }
    };
    
    const handleInfoPress = () => {
        Alert.alert('Прикрепите второе видео!', 'Прикрепите свое второе видео для соединения с первым ниже!');
    };

    return (
        <SafeAreaView style={styles.main}>
            <AppHeader
                title="Шаг 2: Загрузите второе видео"
                stepInfo="Шаг 2 из 3"
                onInfoPress={() => handleInfoPress()}
            />
            <View style={styles.body}>
                <View style={{alignItems: 'center'}}>
                    {
                        isSelectedMedia === undefined ? (
                            <Image source={require('../../assets/step1.png')} style={[styles.mainAsset, {width: 280}]} />
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
                    <Image source={require('../../assets/left.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.bottomNext, isSelectedMedia ? {borderWidth: 3, borderColor: '#FFF9F0', paddingVertical: 13} : {} ]} onPress={() => handleNext()}>
                    <Text style={styles.bottomButtonText}>Далее</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
})

export default Step2Screen;

