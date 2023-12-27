/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Pressable, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Game} from '../../../../Interfaces/interfaces';
import {useNavigation} from '@react-navigation/native';

interface GamesCardProps {
  game: Game;
}
export const GamesCard = ({game}: GamesCardProps) => {
  const navigation = useNavigation();
  return (
    <Pressable
      style={{
        width: '100%',
        backgroundColor: '#FFF',
        borderRadius: 16,
        marginTop: 2,
        shadowColor: '#c5c5c5',
        shadowOpacity: 0.2,
        marginBottom: 8,
        borderWidth: 0.5,
        height: 200,
        borderColor: '#c5c5c5',
      }}
      onPress={() => {
        navigation.navigate('GameDetailsScreen');
      }}>
      <View
        style={{
          margin: 12,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row'}}>
          <View>
            <FastImage
              source={{
                uri: `https://dev-football-group-management-group-image-bucket.s3.amazonaws.com/groupImage/${game.groupId}`,
              }}
              style={{
                width: 70,
                height: 70,
                borderRadius: 50,
                borderWidth: 0.5,
                borderColor: '#bbbbbb',
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>
          <View
            style={{
              maxWidth: '65%',
              marginLeft: 16,
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 18,
                fontWeight: '500',
              }}>
              {game.Group.name}
            </Text>
          </View>
        </View>
        <View
          style={{
            height: 20,
            width: 20,
            borderWidth: 1,
            borderRadius: 20,
            alignItems: 'flex-end',
          }}
        />
      </View>
      <View style={{flexDirection: 'row'}}>
        <View>
          <View style={{paddingHorizontal: 16, marginTop: 12}}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '100',
              }}>
              Date
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '500',
              }}>
              {game.date}
            </Text>
          </View>
          <View style={{paddingHorizontal: 16, marginTop: 12}}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '100',
              }}>
              Time
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '500',
              }}>
              {game.timeStart}
            </Text>
          </View>
        </View>
        <View>
          <View style={{paddingHorizontal: 16, marginTop: 12}}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '100',
              }}>
              Players
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '500',
              }}>
              {game.PlayerInGroup ? game.PlayerInGames.length ?? 0 : 0} Players
            </Text>
          </View>
          <View style={{paddingHorizontal: 16, marginTop: 12}}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '100',
              }}>
              Time
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '500',
              }}>
              {game.timeStart}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};
