import React, { useCallback } from 'react';
import { View } from 'react-native';
import { CustomTabBarProps, MainTabParamList } from '../types/Navigation';
import { TabItem } from './TabItem';
import { getTabIconConfig } from '../utils/navigationConfig';
import { styles } from './styles';

export const CustomTabBar: React.FC<CustomTabBarProps> = ({ 
  state, 
  navigation 
}) => {
  const handleTabPress = useCallback((
    route: { key: string; name: keyof MainTabParamList }, 
    index: number
  ) => {
    const isFocused = state.index === index;

    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name);
    }
  }, [state.index, navigation]);

  const renderTabItem = useCallback((
    route: { key: string; name: keyof MainTabParamList }, 
    index: number
  ) => {
    const isFocused = state.index === index;
    const { iconSource, label } = getTabIconConfig(route.name);

    return (
      <TabItem
        key={route.key}
        focused={isFocused}
        iconSource={iconSource}
        label={label}
        onPress={() => handleTabPress(route, index)}
      />
    );
  }, [state.index, handleTabPress]);

  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map(renderTabItem)}
    </View>
  );
};