/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Game} from '../../../Interfaces/interfaces';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ActivityIndicator, Pressable, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {PlayersCard} from '../../Groups/GroupDetailsScreen/PlayerCard';
import {usePlayerStore} from '../../../Store/PlayerStore';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {joinGame, leaveGame} from '../../../core/actions/games';
import {useGroups} from '../../../core/hooks/groups';
import Toast from 'react-native-toast-message';
import Button from 'react-native-button';

export const StartGameScreen = () => {
  const {player} = usePlayerStore();
  const route = useRoute();
  const {refetch: refetchGroups} = useGroups(player.id);
  const game = route.params?.game as Game;
  const navigations = useNavigation();
  const [loading, setLoading] = useState(false);

  const isOwner = player.id === game.Group.playerId;

  const isJoined = useMemo(() => {
    return game.PlayerInGames.find(
      gamePlayer => gamePlayer.player.id === player.id,
    );
  }, [game, player]);

  const isFull = useMemo(() => {
    if (game.PlayerInGroup && game.PlayerInGroup.length >= game.limit) {
      return true;
    } else {
      return false;
    }
  }, [game]);

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Joined game succefully',
    });
  };

  const showToastError = () => {
    Toast.show({
      type: 'error',
      text1: 'Something went wrong',
    });
  };

  const showToastLeft = () => {
    Toast.show({
      type: 'success',
      text1: 'Successfully left the game',
    });
  };

  const FinishGameButtonClicked = () => {
    navigations.navigate('GamesScreen');
  };

  return (
    <View style={{flex: 1}}>
      <View style={{margin: 16, marginTop: 124}}>
        {game.Team && game.Team.length > 0 ? (
          <View style={{marginTop: 8}}>
            {game.Team.map(team => {
              return (
                <View>
                  <Text
                    style={{fontSize: 12, fontWeight: 'bold', marginBottom: 8}}>
                    {team.name}
                  </Text>
                  <ScrollView>
                    {team.player.map(player => (
                      <PlayersCard player={player.player} />
                    ))}
                  </ScrollView>
                </View>
              );
            })}
          </View>
        ) : (
          <ScrollView style={{marginTop: 4}}>
            {game.PlayerInGames &&
              game.PlayerInGames.length > 0 &&
              game.PlayerInGames.map(gamePlayer => (
                <PlayersCard player={gamePlayer.player} />
              ))}
          </ScrollView>
        )}
      </View>

      {isOwner && (
        <View
          style={{
            position: 'absolute',
            width: '100%',
            bottom: 10,
            alignItems: 'center',
          }}>
          <Button
            style={{
              fontSize: 18,
              color: 'white',
              padding: 10,
            }}
            containerStyle={{
              backgroundColor: 'green',
              width: '95%',
              borderRadius: 8,
            }}
            disabled={loading}
            onPress={FinishGameButtonClicked}>
            {loading ? (
              <ActivityIndicator style={{padding: 10}} color={'white'} />
            ) : (
              'Finish Game'
            )}
          </Button>
        </View>
      )}
    </View>
  );
};
