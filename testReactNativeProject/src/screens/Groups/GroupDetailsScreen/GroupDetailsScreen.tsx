import React from 'react';
import {Group} from '../../../Interfaces/interfaces';
import {useRoute} from '@react-navigation/native';
import {Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {PlayersCard} from './PlayerCard';
import {usePlayerStore} from '../../../Store/PlayerStore';
import {GroupDetailsCard} from './GroupDetailsCard';

export const GroupDetailsScreen = () => {
  const {player} = usePlayerStore();
  const route = useRoute();
  const group =
    route.params && 'group' in route.params
      ? (route.params.group as Group)
      : {id: '', name: '', playerId: '', PlayerInGroup: [], games: []};

  const isOwner = player.id === group.playerId ? true : false;

  return (
    <View style={{backgroundColor: '#FFF', flex: 1}}>
      <View style={{margin: 16, marginTop: 124}}>
        <GroupDetailsCard group={group} />

        <Text style={{fontSize: 18, fontWeight: 'bold'}}>Players</Text>
        <ScrollView style={{marginTop: 4}}>
          <PlayersCard player={player} />
          {group.PlayerInGroup.map(player => (
            <PlayersCard player={player.player} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};
