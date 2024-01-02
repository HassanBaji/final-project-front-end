/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Game, Group, Player} from '../../../Interfaces/interfaces';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ActivityIndicator, Pressable, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {PlayersCard} from '../../Groups/GroupDetailsScreen/PlayerCard';
import {usePlayerStore} from '../../../Store/PlayerStore';
import {GameDetailsCard} from './GameDetailsCard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {joinGame, leaveGame} from '../../../core/actions/games';
import {useGroups} from '../../../core/hooks/groups';
import Toast from 'react-native-toast-message';
import Button from 'react-native-button';

export const GamesDetailsScreen = () => {
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

  const joinButtonClicked = useCallback(async () => {
    try {
      setLoading(true);
      await joinGame({playerId: player.id, gameId: game.id});
      refetchGroups();
      showToast();
      setLoading(false);
      navigations.goBack();
    } catch (e) {
      setLoading(false);
      showToastError();
      console.log(e);
    }
  }, [game.id, navigations, player.id, refetchGroups]);

  const leaveButtonClicked = useCallback(async () => {
    try {
      setLoading(true);
      await leaveGame({playerId: player.id, gameId: game.id});
      refetchGroups();
      showToastLeft();
      setLoading(false);
      navigations.goBack();
    } catch (e) {
      setLoading(false);
      showToastError();
      console.log(e);
    }
  }, [game.id, navigations, player.id, refetchGroups]);

  const joinGameButton = useCallback(() => {
    return (
      <Pressable
        style={{
          alignItems: 'center',
        }}
        onPress={
          isJoined
            ? leaveButtonClicked
            : !isFull
            ? joinButtonClicked
            : () => {
                return;
              }
        }
        disabled={loading}>
        {loading ? (
          <View style={{alignItems: 'center', marginRight: 20}}>
            <ActivityIndicator />
          </View>
        ) : (
          <View style={{alignItems: 'center', marginRight: 20}}>
            {!isJoined && !isFull ? (
              <View>
                <Icon
                  name="account-multiple-plus-outline"
                  size={32}
                  color={'green'}
                />
                <Text
                  style={{
                    fontSize: 12,
                    color: 'green',
                    textAlign: 'center',
                  }}>
                  Join
                </Text>
              </View>
            ) : isJoined && !isFull ? (
              <View>
                <Icon
                  name="account-multiple-minus-outline"
                  size={32}
                  color={'red'}
                />
                <Text
                  style={{
                    fontSize: 12,
                    color: 'red',
                    textAlign: 'center',
                  }}>
                  Leave
                </Text>
              </View>
            ) : (
              <View>
                <Icon name="account-lock" size={32} color={'red'} />
                <Text
                  style={{
                    fontSize: 12,
                    color: 'red',
                    textAlign: 'center',
                  }}>
                  Full
                </Text>
              </View>
            )}
          </View>
        )}
      </Pressable>
    );
  }, [isFull, isJoined, joinButtonClicked, leaveButtonClicked, loading]);

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
  useEffect(() => {
    navigations.setOptions({
      headerRight: () => joinGameButton(),
    });
  }, [joinGameButton, navigations]);

  return (
    <View style={{flex: 1}}>
      <View style={{margin: 16, marginTop: 124}}>
        <GameDetailsCard game={game} />
        <Text style={{fontSize: 18, fontWeight: 'bold', marginTop: 16}}>
          Registred Players{' '}
          <Text style={{fontSize: 16, fontWeight: '300', fontStyle: 'italic'}}>
            ({game.PlayerInGames.length} player)
          </Text>
        </Text>
        <ScrollView style={{marginTop: 4}}>
          {game.PlayerInGames &&
            game.PlayerInGames.length > 0 &&
            game.PlayerInGames.map(gamePlayer => (
              <PlayersCard player={gamePlayer.player} />
            ))}
        </ScrollView>
      </View>
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
          onPress={() => {
            navigations.navigate('MakeTeamScreen', {
              game: game,
            });
          }}>
          {loading ? (
            <ActivityIndicator style={{padding: 10}} color={'white'} />
          ) : (
            'Make teams'
          )}
        </Button>
      </View>
    </View>
  );
};
