/* eslint-disable react-native/no-inline-styles */
import React, {useMemo} from 'react';
import {Pressable, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Game, Player} from '../../../../Interfaces/interfaces';
import {useNavigation} from '@react-navigation/native';

interface GamesCardProps {
  game: Game;
  player: Player;
}
export const GamesCard = ({game, player}: GamesCardProps) => {
  const navigation = useNavigation();

  const isJoined = useMemo(() => {
    return game.PlayerInGames.find(
      gamePlayer => gamePlayer.player.id === player.id,
    );
  }, [game, player]);

  return (
    <Pressable
      style={{
        width: '100%',
        backgroundColor: '#FFF',
        borderRadius: 8,
        marginTop: 2,
        shadowColor: '#c5c5c5',
        shadowOpacity: 0.5,
        marginBottom: 16,
        borderWidth: isJoined ? 1 : 0.5,
        height: 200,
        borderColor: isJoined ? 'green' : '#c5c5c5',
        shadowRadius: 1,
      }}
      onPress={() => {
        navigation.navigate('GamesDetailsScreen', {
          game: game,
        });
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
                fontWeight: 'bold',
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
            backgroundColor: isJoined ? 'green' : 'transparent',
          }}
        />
      </View>
      <View style={{flexDirection: 'row'}}>
        <View>
          <View style={{paddingHorizontal: 16, marginTop: 8}}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '100',
              }}>
              Date
            </Text>
            <Text
              style={{
                fontSize: 18,
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
              Time start
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '500',
              }}>
              {game.timeStart}
            </Text>
          </View>
        </View>
        <View>
          <View style={{paddingHorizontal: 16, marginTop: 8}}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '100',
              }}>
              Players
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '500',
              }}>
              {game.PlayerInGames ? game.PlayerInGames.length ?? 0 : 0} Players
            </Text>
          </View>
          <View style={{paddingHorizontal: 16, marginTop: 12}}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '100',
              }}>
              Time finish
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '500',
              }}>
              {game.timeFinish}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};
