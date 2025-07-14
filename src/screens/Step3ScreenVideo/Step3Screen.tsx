import { Alert, FlatList, Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScreenProps } from "../../types/ScreenProps";
import { observer } from "mobx-react-lite";
import {  useState } from "react";
import { mediaStore } from "../../store/MediaStore";
import { animationOptions } from "../../constants/animationOption";
import { AppHeader } from "../../components/AppHeader";
import { styles } from "./styles";

const Step3Screen: React.FC<ScreenProps> = observer(({navigation}) => {
    const [selectedAnimation, setSelectedAnimation] = useState<{
        id: string | number;
        description: string;
        name: string;
        type: string
    } | null>(null);

    const handleAnimationSelected = (animation: any) => {
        setSelectedAnimation(animation);
        mediaStore.setAnimation(animation);
    };
    
    const handleNext = () => {
        if (selectedAnimation) {
          navigation.navigate('ResultScreen', { animation: selectedAnimation });
        }
    };
    
    const handleInfoPress = () => {
        Alert.alert('Выберите анимацию!', 'Выбирете анимацию перехода между вашими видео, которые вы прикрепили ранее!');
    };
    
    const renderAnimationItem = ({ item }: any) => (
        <View style={{gap: 4}}>
          <TouchableOpacity
            style={[
              styles.animationItem,
              selectedAnimation?.id === item.id && styles.selectedItem,
            ]}
            onPress={() => {
              handleAnimationSelected(item); // Передаем выбранную анимацию
            }}
          >
            <Text style={styles.animationDescription}>{item.description}</Text>
          </TouchableOpacity>
          <Text style={styles.animationName}>{item.name}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.main}>
            <AppHeader
                title="Шаг 3: Выберите переход между видео"
                stepInfo="Шаг 3 из 3"
                onInfoPress={() => handleInfoPress()}
            />
            <View style={styles.body}>
                <FlatList
                    data={animationOptions}
                    renderItem={renderAnimationItem}
                    keyExtractor={(item) => item.id}
                    numColumns={2} // Одна колонка для простоты
                    contentContainerStyle={styles.gallery}
                    columnWrapperStyle={{paddingHorizontal: 30, justifyContent:'space-between', paddingTop: 35}}
                />
            </View>
            <View style={styles.bottom}>
                <TouchableOpacity style={styles.bottomBack} onPress={() => navigation.goBack()}>
                    <Image source={require('../../assets/left.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.bottomNext, selectedAnimation ? {borderWidth: 3, borderColor: '#FFF9F0', paddingVertical: 13} : {} ]} 
                    onPress={() => handleNext()}>
                    <Text style={styles.bottomButtonText}>Далее</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
})

export default Step3Screen;