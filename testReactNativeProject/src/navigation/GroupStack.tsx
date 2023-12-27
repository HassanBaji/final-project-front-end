import React, {useCallback} from 'react';
import {TransitionPresets, createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../screens/Home/HomeScreen';
import {TabBar} from '../componenets/TabBar/TabBar';
import {GroupScreen} from '../screens/Groups/GroupScreen/GroupScreen';
import {Platform, Pressable, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import {horizontalNavOption, isRTL} from '../helpers';
import {useNavigation} from '@react-navigation/native';
import {CreateGroupScreen} from '../screens/Groups/CreateGroupScreen';
import {GroupDetailsScreen} from '../screens/Groups/GroupDetailsScreen';
import {InvitePlayersScreen} from '../screens/Groups/InvitePlayersScreen';

const GroupRootStack = createStackNavigator();

export const GroupStack = () => {
  const navigation = useNavigation();
  const openAddScreen = React.useCallback(
    () => (
      <Pressable
        style={{
          marginRight: 16,

          alignItems: 'center',
        }}
        onPress={() => {
          navigation.navigate('CreateGroupScreen');
        }}>
        <Icon name="plus" size={30} color={'green'} />
        <Text style={{textAlign: 'center', fontSize: 12, color: 'green'}}>
          Create
        </Text>
      </Pressable>
    ),
    [navigation],
  );

  const openInviteScreen = React.useCallback(
    (group: any) => (
      <Pressable
        style={{
          marginRight: 16,

          alignItems: 'center',
        }}
        onPress={() => {
          navigation.navigate('InvitePlayerScreen', {
            group: group,
          });
        }}>
        <IconMaterial name="group-add" size={30} color={'orange'} />
        <Text style={{textAlign: 'center', fontSize: 12, color: 'orange'}}>
          invite
        </Text>
      </Pressable>
    ),
    [navigation],
  );

  return (
    <GroupRootStack.Navigator
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
      <GroupRootStack.Screen
        name="GroupScreen"
        component={GroupScreen}
        options={{
          title: 'Groups',
          headerTitleAlign: 'center',
          headerShown: true,
          headerRight: () => openAddScreen(),
        }}
      />
      <GroupRootStack.Screen
        name="CreateGroupScreen"
        component={CreateGroupScreen}
        options={{
          title: 'Create Group',
          headerTitleAlign: 'left',
          headerTitleStyle: {fontSize: 18, fontWeight: 'bold', marginLeft: -24},
          headerShown: true,
        }}
      />
      <GroupRootStack.Screen
        name="InvitePlayerScreen"
        component={InvitePlayersScreen}
        options={{
          title: 'Invite Players',
          headerTitleAlign: 'left',
          headerTitleStyle: {fontSize: 18, fontWeight: 'bold', marginLeft: -24},
          headerShown: true,
        }}
      />
      <GroupRootStack.Screen
        name="GroupDetailsScreen"
        component={GroupDetailsScreen}
        options={({route}) => (
          console.log('route ' + JSON.stringify(route)),
          {
            title:
              route.params && 'groupName' in route.params
                ? route.params.groupName
                : '',
            headerTitleAlign: 'center',
            headerShown: true,
            headerRight:
              route.params.group.playerId === route.params.playerId
                ? () => openInviteScreen(route.params.group)
                : () => {},
          }
        )}
      />
    </GroupRootStack.Navigator>
  );
};
