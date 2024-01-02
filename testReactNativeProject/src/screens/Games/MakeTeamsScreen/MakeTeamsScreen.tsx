/* eslint-disable react-native/no-inline-styles */
import React, {useMemo} from 'react';
import {ActivityIndicator, Pressable, Text, View} from 'react-native';

import {usePlayerStore} from '../../../Store/PlayerStore';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {useState} from 'react';
import Button from 'react-native-button';

import {useNavigation, useRoute} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {useGroups} from '../../../core/hooks/groups';

import {Game, Group, Player} from '../../../Interfaces/interfaces';
import DatePicker from 'react-native-date-picker';
import RNPickerSelect from 'react-native-picker-select';
import {createGame, createTeam} from '../../../core/actions/games';
import {PlayersCardSmall} from './PlayersCardSmall';
import {PlayersCardSmallSelected} from './PlayersCardSmallSelected';

export const MakeTeamScreen = () => {
  const {player} = usePlayerStore();
  const {refetch: refetchGroups} = useGroups(player.id);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const game = route.params?.game as Game;
  const [leftTeam, setLeftTeam] = useState<Player[]>([]);
  const [rightTeam, setRightTeam] = useState<Player[]>([]);
  const [allPlayers, setAllPlayers] = useState(game.PlayerInGames);

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Team created succefully',
    });
  };

  const showToastNotCompleted = () => {
    Toast.show({
      type: 'error',
      text1: 'make sure to add all the information',
    });
  };

  const showToastError = () => {
    Toast.show({
      type: 'error',
      text1: 'Something went wrong',
    });
  };

  const onAddLeft = (player: Player) => {
    const myPlayers = leftTeam.map(player => player);
    myPlayers.push(player);
    const updatedPlayers = game.PlayerInGames.filter(
      newPlayer => newPlayer.player.id !== player.id,
    );
    setAllPlayers(updatedPlayers);
    setLeftTeam(myPlayers);
  };

  const onAddRight = (player: Player) => {
    const myPlayers = rightTeam.map(player => player);
    myPlayers.push(player);
    const updatedPlayers = game.PlayerInGames.filter(
      newPlayer => newPlayer.player.id !== player.id,
    );

    setAllPlayers(updatedPlayers);
    setRightTeam(myPlayers);
  };

  const removeLeftPlayer = (player: Player) => {
    const myPlayers = allPlayers.map(player => player);
    myPlayers.push({player: player, goalsScored: '0'});
    setAllPlayers(myPlayers);
    const newLeftTeam = leftTeam.filter(
      newPlayer => newPlayer.id !== player.id,
    );

    setLeftTeam(newLeftTeam);
  };

  const removeRightPlayer = (player: Player) => {
    const myPlayers = allPlayers.map(player => player);
    myPlayers.push({player: player, goalsScored: '0'});
    setAllPlayers(myPlayers);
    const newRightTeam = rightTeam.filter(
      newPlayer => newPlayer.id !== player.id,
    );

    setRightTeam(newRightTeam);
  };

  const onClickCreateTeam = async () => {
    if (
      !leftTeam ||
      !rightTeam ||
      leftTeam.length <= 0 ||
      rightTeam.length <= 0
    ) {
      showToastNotCompleted();
    } else {
      console.log('length right ' + rightTeam.length);
      const team1 = leftTeam.map(player => ({
        playedId_gameId: {
          playedId: player.id,
          gameId: game.id,
        },
      }));

      const team2 = rightTeam.map(player => ({
        playedId_gameId: {
          playedId: player.id,
          gameId: game.id,
        },
      }));
      const teams = {
        team1: team1,
        team2: team2,
      };
      try {
        await createTeam({teams: teams, gameId: game.id});
        navigation.navigate('GamesScreen');
        await refetchGroups();
        showToast();
      } catch (e) {
        showToastError();
        console.log(e);
      }
    }
  };

  return (
    <View style={{backgroundColor: '#FFF', flex: 1}}>
      <View style={{margin: 16, marginTop: 124}}>
        <View>
          <Text style={{fontWeight: 'bold', fontStyle: 'italic'}}>
            Drag and drop the players to make teams
          </Text>
        </View>
        <View>
          <View>
            <Text style={{fontSize: 14, marginTop: 16}}>Players</Text>
            <View
              style={{
                marginTop: 8,
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              {allPlayers &&
                allPlayers.length > 0 &&
                allPlayers.map(player => (
                  <PlayersCardSmall
                    player={player.player}
                    onAddLeft={onAddLeft}
                    onAddRight={onAddRight}
                  />
                ))}
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 16,
              }}>
              <View
                style={{
                  width: '50%',
                  borderRightWidth: 0.2,
                  height: 350,
                }}>
                <Text style={{textAlign: 'center'}}>Left Team</Text>
                <ScrollView style={{marginTop: 8}}>
                  {leftTeam &&
                    leftTeam.length > 0 &&
                    leftTeam.map(player => (
                      <PlayersCardSmallSelected
                        removePlayer={removeLeftPlayer}
                        player={player}
                      />
                    ))}
                </ScrollView>
              </View>
              <View
                style={{
                  width: '50%',
                  borderLeftWidth: 0.2,
                  height: 350,
                  alignItems: 'center',
                }}>
                <Text style={{textAlign: 'center'}}>Right Team</Text>
                <ScrollView style={{marginTop: 8}}>
                  {rightTeam &&
                    rightTeam.length > 0 &&
                    rightTeam.map(player => (
                      <PlayersCardSmallSelected
                        removePlayer={removeRightPlayer}
                        player={player}
                      />
                    ))}
                </ScrollView>
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            position: 'absolute',
            width: '100%',
            bottom: -100,
          }}>
          <Button
            style={{
              fontSize: 18,
              color: 'white',
              padding: 10,
            }}
            containerStyle={{
              backgroundColor: 'green',
              width: '100%',
              borderRadius: 8,
              position: 'absolute',
            }}
            disabled={loading}
            onPress={onClickCreateTeam}>
            {loading ? (
              <ActivityIndicator style={{padding: 10}} color={'white'} />
            ) : (
              'Create'
            )}
          </Button>
        </View>
      </View>
    </View>
  );
};
