import * as React from 'react';
//import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import {HomeScreen} from '../../screens/Home/HomeScreen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconInon from 'react-native-vector-icons/Ionicons';

import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import {GroupScreen} from '../../screens/Groups/GroupScreen';
import {NotificationScreen} from '../../screens/Notifications/NotficationScreen';
import {Pressable, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {GroupStack} from '../../navigation/GroupStack';
import {HomeStack} from '../../navigation/HomeStack';
import {NotificationStack} from '../../navigation/NotificationStack';
import {GamesStack} from '../../navigation/GamesStack';

export const TabBar = () => {
  const Tab = createBottomTabNavigator();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

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
      })}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeStack}
        options={{
          title: 'Home',
          tabBarLabelStyle: {fontSize: 12},
          tabBarIcon: ({color}) => <Icon name="home" size={28} color={color} />,
        }}
      />
      <Tab.Screen
        name="GamesScreen"
        component={GamesStack}
        options={{
          title: 'Games',
          tabBarLabelStyle: {fontSize: 12},
          tabBarIconStyle: {marginTop: 6},
          tabBarIcon: ({color}) => (
            <Icon name="soccer" size={32} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="GroupScreen"
        component={GroupStack}
        options={{
          title: 'Group',
          tabBarLabelStyle: {fontSize: 12},
          tabBarIconStyle: {marginTop: 4},
          tabBarIcon: ({color}) => (
            <IconMaterial name="group" size={34} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="NotficationsScreen"
        component={NotificationStack}
        options={{
          title: 'Notfications',
          tabBarLabelStyle: {fontSize: 12},
          tabBarIconStyle: {marginTop: 4},
          tabBarIcon: ({color}) => (
            <IconMaterial name="notifications" size={28} color={color} />
          ),
        }}
      />

      {/* <Tab.Screen name="" component={SettingsScreen} /> */}
    </Tab.Navigator>
  );
};
