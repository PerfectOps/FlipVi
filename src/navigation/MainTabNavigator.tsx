import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../types/Navigation';
import { CustomTabBar } from './CustomTabBar';
import { MainStackNavigator } from './MainStackNavigator';
import GalleryScreen from '../screens/GalleryScreen/GalleryScreen';
import SettingScreen from '../screens/SettingScreen/SettingScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabNavigator: React.FC = () => (
    <Tab.Navigator
        initialRouteName="Main"
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{
            headerShown: false,
            tabBarHideOnKeyboard: true,
        }}
    >
        <Tab.Screen name="Main" component={MainStackNavigator} />
        <Tab.Screen name="Gallery" component={GalleryScreen} />
        <Tab.Screen name="Settings" component={SettingScreen} />
    </Tab.Navigator>
);