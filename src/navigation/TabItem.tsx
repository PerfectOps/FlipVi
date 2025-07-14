import React from 'react';
import { TouchableOpacity, Image, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { TabItemProps } from '../types/Navigation';
import { useTabAnimation } from '../hooks/useTabAnimation';
import { styles } from './styles';
import { COLORS } from '../constants/TabNavigation';

export const TabItem: React.FC<TabItemProps> = ({ 
  focused, 
  iconSource, 
  label, 
  onPress 
}) => {
  const { animatedStyle, animatedTextStyle } = useTabAnimation(focused);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <Animated.View
        style={[
           styles.tab,
          animatedStyle,
          {
            backgroundColor: focused ? COLORS.ACTIVE : COLORS.INACTIVE,
            borderRadius: 1000,
            paddingHorizontal: 15,
          },
        ]}
      >
        <View style={ styles.content}>
          <Image source={iconSource} style={ styles.icon} />
          <Animated.View style={[ styles.textContainer, animatedTextStyle]}>
            <Text style={ styles.text}>{label}</Text>
          </Animated.View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};