/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import {Pressable, Text, View, Animated, PanResponder} from 'react-native';
import {Group, Player} from '../../../../Interfaces/interfaces';
import FastImage from 'react-native-fast-image';

interface PlayersCardSmallProps {
  player: Player;
  onAddLeft: (player: Player) => void;
  onAddRight: (player: Player) => void;
}
export const PlayersCardSmall = ({
  player,
  onAddLeft,
  onAddRight,
}: PlayersCardSmallProps) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const [showDraggable, setShowDraggable] = useState(true);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (e, gesture) => {
        console.log('gesture ' + JSON.stringify(gesture));
        if (isDropAreaLeft(gesture)) {
          Animated.timing(opacity, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false,
          }).start(() => onAddLeft(player));
        } else if (isDropAreaRight(gesture)) {
          Animated.timing(opacity, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false,
          }).start(() => onAddRight(player));
        } else {
          Animated.spring(pan, {
            toValue: {x: 0, y: 0},
            friction: 5,
            useNativeDriver: false,
          }).start();
        }
      },
    }),
  );

  const isDropAreaLeft = gesture => {
    return gesture.moveY > 400 && gesture.moveX < 200;
  };

  const isDropAreaRight = gesture => {
    return gesture.moveY > 400 && gesture.moveX > 200;
  };
  return (
    <Animated.View
      {...panResponder.current.panHandlers}
      style={{
        transform: pan.getTranslateTransform(),
        alignItems: 'center',
        opacity: opacity,
        borderWidth: 0.5,
        borderColor: 'grey',
        padding: 8,
        borderRadius: 12,
        marginRight: 16,
        maxHeight: 90,
        maxWidth: 90,
        marginBottom: 8,
      }}>
      <Text style={{fontSize: 10, fontWeight: '500'}}>{player.fName}</Text>
      <Text style={{fontSize: 10, fontWeight: '500'}}>{player.lName}</Text>
    </Animated.View>
  );
};
