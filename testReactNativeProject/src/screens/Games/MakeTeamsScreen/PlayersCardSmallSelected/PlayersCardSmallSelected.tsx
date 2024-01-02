/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import {Pressable, Text, View, Animated, PanResponder} from 'react-native';
import {Group, Player} from '../../../../Interfaces/interfaces';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface PlayersCardSmallSelectedProps {
  player: Player;
  removePlayer: (player: Player) => void;
}
export const PlayersCardSmallSelected = ({
  player,
  removePlayer,
}: PlayersCardSmallSelectedProps) => {
  return (
    <View
      style={{
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: 'grey',
        padding: 8,
        borderRadius: 12,
        marginRight: 16,
        maxHeight: 90,
        marginBottom: 8,
        minWidth: 110,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <Text style={{fontSize: 12, fontWeight: '500'}}>
        {player.fName} {player.lName}
      </Text>
      <Pressable onPress={() => removePlayer(player)}>
        <Icon name="remove-circle" color={'red'} size={15} />
      </Pressable>
    </View>
  );
};
