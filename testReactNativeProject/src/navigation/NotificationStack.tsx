import React from 'react';
import {TransitionPresets, createStackNavigator} from '@react-navigation/stack';
import {Platform} from 'react-native';
import {horizontalNavOption, isRTL} from '../helpers';
import {NotificationScreen} from '../screens/Notifications/NotficationScreen';

const NotificationRootStack = createStackNavigator();

export const NotificationStack = () => {
  return (
    <NotificationRootStack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        headerTransparent: true,
        headerBackTitleVisible: false,
        headerTintColor: 'black',
        headerLeftContainerStyle: {marginLeft: Platform.OS === 'ios' ? 8 : 0},
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: (isRTL ? 0.75 : 1) * 35,
          lineHeight: 35 + 4,
        },
        ...horizontalNavOption,
      }}>
      <NotificationRootStack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{
          title: 'Notifications',
          headerTitleAlign: 'center',
          headerShown: true,
        }}
      />
    </NotificationRootStack.Navigator>
  );
};
