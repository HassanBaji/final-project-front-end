import React, {useCallback} from 'react';
import {TransitionPresets, createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../screens/Home/HomeScreen';
import {TabBar} from '../componenets/TabBar/TabBar';
import {GroupScreen} from '../screens/Groups/GroupScreen/GroupScreen';
import {Button, Platform, Pressable, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import {horizontalNavOption, isRTL} from '../helpers';
import {useNavigation} from '@react-navigation/native';
import {CreateGroupScreen} from '../screens/Groups/CreateGroupScreen';
import {GroupDetailsScreen} from '../screens/Groups/GroupDetailsScreen';
import {InvitePlayersScreen} from '../screens/Groups/InvitePlayersScreen';
import {GamesScreen} from '../screens/Games/GamesScreen';
import {CreateGameScreen} from '../screens/Games/CreateGamesScreen';
import {GamesDetailsScreen} from '../screens/Games/GamesDetailsScreen';
import {MakeTeamScreen} from '../screens/Games/MakeTeamsScreen';
import {StartGameScreen} from '../screens/Games/StartGameScreen';

const GamesRootStack = createStackNavigator();

export const GamesStack = () => {
  const navigation = useNavigation();
  const openAddScreen = React.useCallback(
    () => (
      <Pressable
        style={{
          marginRight: 16,

          alignItems: 'center',
        }}
        onPress={() => {
          navigation.navigate('CreateGamesScreen');
        }}>
        <Icon name="plus" size={30} color={'green'} />
        <Text style={{textAlign: 'center', fontSize: 12, color: 'green'}}>
          Create
        </Text>
      </Pressable>
    ),
    [navigation],
  );

  return (
    <GamesRootStack.Navigator
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
      <GamesRootStack.Screen
        name="GamesScreen"
        component={GamesScreen}
        options={{
          title: 'Games',
          headerTitleAlign: 'center',
          headerShown: true,
          headerRight: () => openAddScreen(),
        }}
      />
      <GamesRootStack.Screen
        name="CreateGamesScreen"
        component={CreateGameScreen}
        options={{
          title: 'Create Games',
          headerTitleAlign: 'left',
          headerTitleStyle: {fontSize: 18, fontWeight: 'bold', marginLeft: -24},
          headerShown: true,
        }}
      />
      <GamesRootStack.Screen
        name="GamesDetailsScreen"
        component={GamesDetailsScreen}
        options={({route}) => ({
          title: `${route.params.game.Group.name} Game`,
          headerTitleAlign: 'center',
          headerTitleStyle: {fontSize: 18, fontWeight: 'bold'},
          headerShown: true,
          // headerRight: () => <Button title="Update count" />,
        })}
      />
      <GamesRootStack.Screen
        name="MakeTeamScreen"
        component={MakeTeamScreen}
        options={({route}) => ({
          title: `${route.params.game.Group.name} Game teams`,
          headerTitleAlign: 'center',
          headerTitleStyle: {fontSize: 18, fontWeight: 'bold'},
          headerShown: true,
          // headerRight: () => <Button title="Update count" />,
        })}
      />
      <GamesRootStack.Screen
        name="StartGameScreen"
        component={StartGameScreen}
        options={({route}) => ({
          title: `${route.params.game.Group.name} Game start`,
          headerTitleAlign: 'center',
          headerTitleStyle: {fontSize: 18, fontWeight: 'bold'},
          headerShown: true,
          // headerRight: () => <Button title="Update count" />,
        })}
      />
    </GamesRootStack.Navigator>
  );
};
