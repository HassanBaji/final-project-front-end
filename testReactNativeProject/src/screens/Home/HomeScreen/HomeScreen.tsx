/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {usePlayerStore} from '../../../Store/PlayerStore';

import {ScrollView} from 'react-native-gesture-handler';
import {UseInitialize} from '../../../hooks';
import {SignOutBottomSheet} from '../../../componenets/SignOutBottmSheet';

export const HomeScreen = () => {
  const {player} = usePlayerStore();

  return (
    <View style={{backgroundColor: '#FFF', flex: 1}}>
      <View style={{margin: 16, marginTop: 124}}>
        {player && (
          <Text style={{fontSize: 24, fontWeight: 'bold'}}>
            Welcome {player.fName} {player.lName},
          </Text>
        )}

        <Text style={{fontSize: 18, fontWeight: 'bold', marginTop: 32}}>
          Upcoming Games
        </Text>
        <ScrollView></ScrollView>
      </View>
    </View>
  );
};
