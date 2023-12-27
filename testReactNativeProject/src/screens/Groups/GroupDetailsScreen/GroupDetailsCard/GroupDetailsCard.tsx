/* eslint-disable react-native/no-inline-styles */
import React, {useMemo} from 'react';
import {Text, View} from 'react-native';

import {Group} from '../../../../Interfaces/interfaces';

interface GroupDetailsCardProps {
  group: Group;
}

export const GroupDetailsCard = ({group}: GroupDetailsCardProps) => {
  const totalGoalsScored = useMemo(() => {
    let total = 0;
    group.games.forEach(game => {
      total += game.goalsScored;
    });
    return total;
  }, [group.games]);

  return (
    <View
      style={{
        width: '100%',
        backgroundColor: '#FFF',
        borderRadius: 16,
        shadowColor: '#c5c5c5',
        shadowOpacity: 0.2,
        marginBottom: 12,
        elevation: 2,
        marginTop: 2,
        borderWidth: 0.5,
        borderColor: '#c5c5c5',
        flexDirection: 'row',
        padding: 16,
        justifyContent: 'space-between',
      }}>
      <View style={{alignItems: 'center', width: '33%', borderRightWidth: 0.3}}>
        <Text style={{fontSize: 18}}>Players</Text>
        <Text style={{fontWeight: 'bold', fontSize: 24, marginTop: 2}}>
          {group.PlayerInGroup.length + 1}
        </Text>
      </View>
      <View style={{alignItems: 'center', width: '33%', borderRightWidth: 0.3}}>
        <Text style={{fontSize: 18}}>Games</Text>
        <Text style={{fontWeight: 'bold', fontSize: 24, marginTop: 2}}>
          {group.games.length}
        </Text>
      </View>
      <View style={{alignItems: 'center', width: '33%'}}>
        <Text style={{fontSize: 18}}>Goals</Text>
        <Text style={{fontWeight: 'bold', fontSize: 24, marginTop: 2}}>
          {totalGoalsScored}
        </Text>
      </View>
    </View>
  );
};
