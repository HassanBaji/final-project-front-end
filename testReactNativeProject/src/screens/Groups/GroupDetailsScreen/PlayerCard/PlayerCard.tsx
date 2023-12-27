/* eslint-disable react-native/no-inline-styles */
import {ActivityIndicator, Pressable, Text, View} from 'react-native';
import {Player} from '../../../../Interfaces/interfaces';
import FastImage from 'react-native-fast-image';
import React from 'react';

interface PlayersCardProps {
  player: Player;
}
export const PlayersCard = ({player}: PlayersCardProps) => {
  const fullName = player.fName + ' ' + player.lName;
  return (
    <View>
      <View
        style={{
          width: '100%',
          backgroundColor: '#FFF',
          borderRadius: 16,
          shadowColor: '#c5c5c5',
          shadowOpacity: 0.2,
          marginBottom: 12,
          elevation: 2,
          marginTop: 2,
          borderWidth: 0.5,
          borderColor: '#c5c5c5',
        }}>
        <View
          style={{
            margin: 12,
            flexDirection: 'row',
          }}>
          <View>
            <FastImage
              source={{
                uri: `https://dev-football-group-management-group-image-bucket.s3.amazonaws.com/groupImage/${player.id}`,
              }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 50,
                borderWidth: 0.5,
                borderColor: '#bbbbbb',
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>
          <View style={{width: '70%', marginLeft: 16}}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '500',
              }}>
              {fullName}
            </Text>
            <Text
              style={{
                marginTop: 4,
                fontSize: 13,
                fontFamily: 'roboto',
              }}>
              {player.email}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
