import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from '../types/Navigation';
import { COLORS } from '../constants/TabNavigation';
import { MainTabNavigator } from './MainTabNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();
  
const Navigation: React.FC = () => (
    <NavigationContainer>
        <StatusBar backgroundColor={COLORS.STATUS_BAR} barStyle="light-content" />

        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MainTab" component={MainTabNavigator} />
        </Stack.Navigator>
    </NavigationContainer>
);

export default Navigation;