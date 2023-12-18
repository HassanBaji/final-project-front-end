import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../screens/HomeScreen';
import {TabBar} from '../componenets/TabBar/TabBar';
import {GroupScreen} from '../screens/GroupScreen/GroupScreen';

export const MainStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'TabBar'}
        component={TabBar}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          headerTitleAlign: 'center',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="Group"
        component={GroupScreen}
        options={{
          title: 'Group',
          headerTitleAlign: 'center',
          headerShown: true,
        }}
      />
      {/* <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Profile" component={GroupsScreen} /> */}
    </Stack.Navigator>
  );
};
