import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainStackParamList } from '../types/Navigation';
import StartScreen from '../screens/StartScreenVideo/StartScreen';
import Step1Screen from '../screens/Step1ScreenVideo/Step1Screen';
import Step2Screen from '../screens/Step2ScreenVideo/Step2Screen';
import Step3Screen from '../screens/Step3ScreenVideo/Step3Screen';
import ResultScreen from '../screens/ResultScreen/ResultScreen';

const Stack = createNativeStackNavigator<MainStackParamList>();

export const MainStackNavigator: React.FC = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="StartScreen" component={StartScreen} />
        <Stack.Screen name="Step1Screen" component={Step1Screen} />
        <Stack.Screen name="Step2Screen" component={Step2Screen} />
        <Stack.Screen name="Step3Screen" component={Step3Screen} />
        <Stack.Screen name="ResultScreen" component={ResultScreen} />
    </Stack.Navigator>
);