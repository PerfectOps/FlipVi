import { ActivityIndicator, Alert, Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScreenProps } from "../../types/ScreenProps";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { videoCreator } from "../../utils/videoCreator";
import Video from "react-native-video";
import { mediaStore } from "../../store/MediaStore";
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import LottieView from "lottie-react-native";
import { styles } from "./styles";
import { AppHeader } from "../../components/AppHeader";

const ResultScreen: React.FC<ScreenProps> = observer(({navigation}) => {
    const [loading, setLoading] = useState(false);
    console.log('animation', mediaStore.selectedAnimation.type)

    useEffect(() => {
        let createResult = videoCreator((mediaStore.selectedAnimation.type));
        createResult.then(() => setLoading(true))
    }, [])

    const onShare = async () => {
        RNFS.stat(mediaStore.mediaResult).then(async result => {
            let filePath = result.path
        
            if(await RNFS.exists(filePath)){
        
            console.log("RNFS.stat: ", filePath)
            
            RNFS.readFile(filePath, 'base64')
            .then(base64 =>{
                console.log("RNFS.readFile: ", base64)
        
                let type = 'video/mp4'
                let base64Data = `data:${type};base64,` + base64;
                let fileData = "file://" + filePath;
        
                console.log("base64Data: ", base64Data)
                console.log("fileData: ", fileData)
        
                let shareOptions = {
                url: base64Data, // NOTE: base64Data can be shared via Instagram and Co.
                type: 'video/mp4',
                }
        
                console.log("Share.open: ", shareOptions)
        
                Share.open(shareOptions)
                .then((res) => {
                    if(res){
            
                        console.log("Share.open#done: ", res)
                    }
                })
                .catch((err) => {
                    if(err && err.error){
            
                        console.log("Share.open#error: ", err)
            
                        var params = { error: err.error, current_screen: "ARScreen"};
                        console.log("share_video_error", params); 
                    }       
                });
            });
            } else {
            console.log("file does not exist: ", mediaStore.mediaResult)
            }
        })
    };

    const saveAndExit = () => {
        mediaStore.clearMediaFiles();
        navigation.navigate('StartScreen');
    }

    return (
        <SafeAreaView style={styles.main}>
            <AppHeader
                title="Результат!"
                onInfoPress={() => {}}
            />
            <View style={styles.body}>
            {
                loading === false ? (
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <LottieView
                            source={require("../../assets/lottie/loadingResult.json")}
                            style={{width: '100%', height: 300}}
                            autoPlay
                            loop
                        />
                        <Text style={styles.textLoading}>Идет соединение....</Text>
                    </View>
                ) : (
                    <Video 
                        source={{uri: mediaStore.mediaResult}} 
                        style={styles.mainAsset} 
                        controls={true}
                    />
                )
            }
            </View>
            <View style={styles.bottom}>
                <TouchableOpacity style={styles.bottomNext} onPress={() => saveAndExit()}>
                    <Text style={styles.bottomButtonText}>Сохранить и выйти</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomBack} onPress={() => onShare()}>
                    <Image source={require('../../assets/share.png')} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
})

export default ResultScreen;