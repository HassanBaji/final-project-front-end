/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Game} from '../../../../Interfaces/interfaces';
import {Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';

interface GameStatisticsCardProps {
  team1Goals: number;
  team2Goals: number;
}
export const GameStatisticsCard = ({
  team1Goals,
  team2Goals,
}: GameStatisticsCardProps) => {
  return (
    <View
      style={{
        width: '100%',
        backgroundColor: '#FFF',
        borderRadius: 8,
        marginTop: 2,
        shadowColor: '#c5c5c5',
        shadowOpacity: 0.5,
        marginBottom: 8,
        borderWidth: 0.5,
        padding: 16,
        borderColor: '#c5c5c5',
        shadowRadius: 1,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row'}}></View>
      </View>
      <View
        style={{
          flexDirection: 'row',

          gap: 10,
        }}>
        <View>
          <View>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '100',
              }}>
              Team 1 Goals
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '500',
              }}>
              {team1Goals}
            </Text>
          </View>
          <View style={{marginTop: 12}}>
            <Text
              style={{
                fontSize: 14,
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
          <View style={{marginLeft: 40}}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '100',
              }}>
              Players limit
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '500',
              }}>
              {game.limit} Players
            </Text>
          </View>
          <View style={{marginTop: 12, marginLeft: 40}}>
            <Text
              style={{
                fontSize: 14,
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
    </View>
  );
};
