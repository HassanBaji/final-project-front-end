import React, {useCallback} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../screens/Home/HomeScreen';
import {TabBar} from '../componenets/TabBar/TabBar';
import {GroupScreen} from '../screens/Groups/GroupScreen/GroupScreen';
import {Pressable, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {UseInitialize} from '../hooks';

export const MainStack = () => {
  const Stack = createStackNavigator();
  UseInitialize();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'TabBar'}
        component={TabBar}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Home',
          headerTitleAlign: 'center',
          headerShown: true,
        }}
      /> */}
      {/* <Stack.Screen
        name="GroupScreen"
        component={GroupScreen}
        options={{
          title: 'Group',
          headerTitleAlign: 'center',
          headerShown: true,

          headerRight: () => openAddScreen(),
        }}
      /> */}

      {/* <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Profile" component={GroupsScreen} /> */}
    </Stack.Navigator>
  );
};
