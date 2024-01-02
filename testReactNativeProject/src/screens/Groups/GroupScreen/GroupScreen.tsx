/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import {useGroups} from '../../../core/hooks/groups';
import {usePlayerStore} from '../../../Store/PlayerStore';
import {ScrollView} from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';

export const GroupScreen = () => {
  const {player} = usePlayerStore();
  const {
    groups,
    isLoading,
    refetch: refetchGroups,
  } = useGroups(player ? player.id : '');
  const navigation = useNavigation();

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <View style={{margin: 16, marginTop: 124}}>
        <Text style={{fontSize: 24, fontWeight: 'bold'}}>My Groups</Text>
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
            style={{marginTop: 14}}
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={() => refetchGroups()}
              />
            }>
            {groups &&
              groups.length > 0 &&
              groups.map(group => (
                <Pressable
                  key={group.id}
                  style={{
                    width: '100%',
                    backgroundColor: '#FFF',

                    borderRadius: 16,
                    marginTop: 2,
                    shadowColor: '#c5c5c5',
                    shadowOpacity: 0.5,
                    marginBottom: 16,
                    borderWidth: 0.5,
                    borderColor: '#c5c5c5',
                  }}
                  onPress={() => {
                    navigation.navigate('GroupDetailsScreen', {
                      groupId: group.id,
                      groupName: group.name,
                      group: group,
                      playerId: player.id,
                    });
                  }}>
                  <View
                    style={{
                      margin: 12,
                      flexDirection: 'row',
                    }}>
                    <View>
                      <FastImage
                        source={{
                          uri: `https://dev-football-group-management-group-image-bucket.s3.amazonaws.com/groupImage/${group.id}`,
                        }}
                        style={{
                          width: 70,
                          height: 70,
                          borderRadius: 50,
                          borderWidth: 0.2,
                          borderColor: '#bbbbbb',
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                      />
                    </View>
                    <View
                      style={{
                        maxWidth: '65%',
                        marginLeft: 16,
                        alignContent: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontSize: 18,
                          fontWeight: 'bold',
                        }}>
                        {group.name}
                      </Text>
                    </View>
                  </View>
                </Pressable>
              ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
};
