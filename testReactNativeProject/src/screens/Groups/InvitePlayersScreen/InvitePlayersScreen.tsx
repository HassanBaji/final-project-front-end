/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {ActivityIndicator, Text, TextInput, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useSearchPlayers} from '../../../core/hooks/Player';
import {useDebounce} from '@uidotdev/usehooks';
import {PlayersCard} from './PlayersCard';
import {useRoute} from '@react-navigation/native';
import {Group} from '../../../Interfaces/interfaces';
import {sendInvite} from '../../../core/actions/groups';
import Toast from 'react-native-toast-message';

export const InvitePlayersScreen = () => {
  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounce(search, 300);
  const {players, isLoading} = useSearchPlayers(debouncedSearch);
  const route = useRoute();
  const group =
    route.params && 'group' in route.params
      ? (route.params.group as Group)
      : {id: '', name: '', playerId: '', PlayerInGroup: []};
  const [loading, setLoading] = useState<boolean>(false);

  const showSuccessfulInviteToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Player Invited Successfully',
    });
  };

  const onInviteButtonCliecked = async (playerId: string) => {
    try {
      setLoading(true);
      setSearch('');
      await sendInvite({playerId: playerId, groupId: group.id});
      showSuccessfulInviteToast();
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  return (
    <View style={{backgroundColor: '#FFF', flex: 1}}>
      <View style={{marginTop: 124, margin: 16}}>
        <Text style={{fontSize: 18, fontWeight: '500'}}>
          Search Player Email
        </Text>

        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="search for players"
          style={{
            height: 40,
            borderWidth: 0.5,
            padding: 10,
            marginTop: 8,
            borderRadius: 8,
            borderColor: 'grey',
          }}
        />
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
          <ScrollView style={{marginTop: 16}}>
            {players &&
              players.length > 0 &&
              players.map(player => {
                if (
                  player.id !== group.playerId &&
                  !group.PlayerInGroup.find(
                    myPlayer => myPlayer.player.id === player.id,
                  )
                ) {
                  return (
                    <PlayersCard
                      player={player}
                      onPress={onInviteButtonCliecked}
                      loading={loading}
                    />
                  );
                }
              })}
          </ScrollView>
        )}
      </View>
    </View>
  );
};
