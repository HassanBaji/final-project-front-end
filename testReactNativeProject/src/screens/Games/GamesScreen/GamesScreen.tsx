/* eslint-disable react-native/no-inline-styles */
import React, {useMemo} from 'react';
import {ActivityIndicator, Pressable, Text, View} from 'react-native';
import {useGroups} from '../../../core/hooks/groups';
import {usePlayerStore} from '../../../Store/PlayerStore';
import {ScrollView} from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {Game} from '../../../Interfaces/interfaces';
import {GamesCard} from './GamesCard/GamesCard';

export const GamesScreen = () => {
  const {player} = usePlayerStore();
  const {groups, isLoading} = useGroups(player ? player.id : '');
  const navigation = useNavigation();

  const games = useMemo(() => {
    if (!groups || groups.length < 0) {
      return [];
    }
    return groups
      .map(group => group.games)
      .flat()
      .sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
  }, [groups]);

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <View style={{margin: 16, marginTop: 124}}>
        <Text style={{fontSize: 24, fontWeight: 'bold'}}>Upcoming games</Text>
        {isLoading ? (
          <View
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 300,
              bottom: 0,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ActivityIndicator size={'large'} color={'orange'} />
          </View>
        ) : (
          <ScrollView
            style={{marginTop: 14, marginBottom: 32}}
            showsVerticalScrollIndicator={false}>
            {groups &&
              groups.length > 0 &&
              games.map(game => <GamesCard game={game} key={game.id} />)}
          </ScrollView>
        )}
      </View>
    </View>
  );
};
