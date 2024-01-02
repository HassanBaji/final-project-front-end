/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {RefreshControl, Text, View} from 'react-native';
import {useInvitesForPlayer} from '../../../core/hooks/Player';
import {usePlayerStore} from '../../../Store/PlayerStore';
import {InvitesCard} from './InvitesCard';
import {acceptInviteForGroup} from '../../../core/actions/players';
import Toast from 'react-native-toast-message';
import {ScrollView} from 'react-native-gesture-handler';

export const NotificationScreen = () => {
  const {player} = usePlayerStore();
  const {
    invites,
    refetch: refetchInvites,
    isLoading,
  } = useInvitesForPlayer(player.id ?? '');
  const [loading, setLoading] = useState(false);

  const showSuccessfulInviteToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Invite has been accepted',
    });
  };

  const onClickAcceptInvite = async (groupId: string, inviteId: string) => {
    try {
      setLoading(true);
      await acceptInviteForGroup({
        groupId: groupId,
        inviteId: inviteId,
        playerId: player.id,
      });
      await refetchInvites();
      setLoading(false);
      showSuccessfulInviteToast();
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  return (
    <View style={{backgroundColor: '#FFF', flex: 1}}>
      <ScrollView
        style={{margin: 16, marginTop: 124}}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => refetchInvites()}
          />
        }>
        {invites &&
          invites.length > 0 &&
          invites.map(invite => (
            <InvitesCard
              groupName={invite.Group.name}
              loading={loading}
              groupId={invite.groupId}
              onPress={onClickAcceptInvite}
              inviteId={invite.id}
            />
          ))}
      </ScrollView>
    </View>
  );
};
