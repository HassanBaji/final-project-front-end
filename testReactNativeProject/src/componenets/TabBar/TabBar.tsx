import * as React from 'react';
//import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import {HomeScreen} from '../../screens/HomeScreen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import {GroupScreen} from '../../screens/GroupScreen';
import {NotificationScreen} from '../../screens/NotficationScreen';

export const TabBar = () => {
  const Tab = createBottomTabNavigator();
  const insets = useSafeAreaInsets();

  const tabStyle = React.useMemo(() => {
    return {
      height: Math.max(insets.bottom, 10) + 60,
      borderTopWidth: 0,
      shadowOffset: {width: 0, height: 2},
      shadowColor: 'rgba(0,0,0,0.1)',
      shadowOpacity: 1,
      shadowRadius: 10,
      elevation: 2,
      backgroundColor: '#FFF',
    };
  }, [insets]);
  return (
    <Tab.Navigator
      screenOptions={() => ({
        headerShown: false,
        tabBarActiveTintColor: 'orange',
        tabBarInactiveTintColor: 'grey',
        tabBarStyle: tabStyle,
        tabBarLabelPosition: 'below-icon',
        tabBarTestID: 'aa',
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarLabelStyle: {fontSize: 12},
          headerShown: true,
          tabBarIcon: ({color}) => <Icon name="home" size={28} color={color} />,
        }}
      />
      <Tab.Screen
        name="Group"
        component={GroupScreen}
        options={{
          title: 'Group',
          tabBarLabelStyle: {fontSize: 12},
          headerShown: true,
          tabBarIconStyle: {marginTop: 4},
          tabBarIcon: ({color}) => (
            <IconMaterial name="group" size={34} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Notfications"
        component={NotificationScreen}
        options={{
          title: 'Notfications',
          tabBarLabelStyle: {fontSize: 12},
          headerShown: true,
          tabBarIconStyle: {marginTop: 4},
          tabBarIcon: ({color}) => (
            <IconMaterial name="notifications" size={28} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={NotificationScreen}
        options={{
          title: 'Account',
          tabBarLabelStyle: {fontSize: 12},
          headerShown: true,
          tabBarIconStyle: {marginTop: 6},
          tabBarIcon: ({color}) => (
            <Icon name="account" size={32} color={color} />
          ),
        }}
      />

      {/* <Tab.Screen name="" component={SettingsScreen} /> */}
    </Tab.Navigator>
  );
};
