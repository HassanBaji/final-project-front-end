import React, {useCallback, useRef, useState} from 'react';
import {TransitionPresets, createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../screens/Home/HomeScreen';
import {TabBar} from '../componenets/TabBar/TabBar';
import {GroupScreen} from '../screens/Groups/GroupScreen/GroupScreen';
import {ActivityIndicator, Platform, Pressable, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import {horizontalNavOption, isRTL} from '../helpers';
import {useNavigation} from '@react-navigation/native';
import {CreateGroupScreen} from '../screens/Groups/CreateGroupScreen';
import {GroupDetailsScreen} from '../screens/Groups/GroupDetailsScreen';
import {InvitePlayersScreen} from '../screens/Groups/InvitePlayersScreen';
import {SignOutBottomSheet} from '../componenets/SignOutBottmSheet';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {signOut} from 'aws-amplify/auth';

const HomeRootStack = createStackNavigator();

export const HomeStack = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const openSignOut = React.useCallback(
    () => (
      <Pressable
        style={{
          marginLeft: 16,

          alignItems: 'center',
        }}
        onPress={() => {
          handleSignOut();
        }}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <View>
            <Icon name="logout" size={30} color={'red'} />
            <Text style={{textAlign: 'center', fontSize: 12, color: 'red'}}>
              log out
            </Text>
          </View>
        )}
      </Pressable>
    ),
    [loading],
  );

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await signOut();
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <HomeRootStack.Navigator
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
      <HomeRootStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Home',
          headerTitleAlign: 'center',
          headerShown: true,
          headerLeft: () => openSignOut(),
        }}
      />
    </HomeRootStack.Navigator>
  );
};
