/* eslint-disable react-native/no-inline-styles */
import {ActivityIndicator, Pressable, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {SwipeListView} from 'react-native-swipe-list-view';
import {Swipeable} from 'react-native-gesture-handler';

interface PlayersCardProps {
  groupName: string;
  groupId: string;
  onPress: (groupId: string, inviteId: string) => Promise<void>;
  loading: boolean;
  inviteId: string;
}
export const InvitesCard = ({
  groupName,
  groupId,
  onPress,
  loading,
  inviteId,
}: PlayersCardProps) => {
  const renderRightActions = (progress, dragX) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        <Pressable
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: 75,
            backgroundColor: 'white',
            marginBottom: 12,
          }}
          onPress={() => {
            // Handle Decline button press
          }}>
          <Icon name="cancel" size={30} color={'red'} />
          <Text style={{color: 'red'}}>Decline</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <Swipeable
      // rightOpenValue={-75} // Width of the Decline button
      overshootRight={false}
      renderRightActions={renderRightActions}>
      <View>
        <View
          style={{
            width: '100%',
            backgroundColor: '#FFF',
            borderRadius: 8,
            shadowColor: '#c5c5c5',
            shadowOpacity: 0.2,
            marginBottom: 12,
            elevation: 2,
            marginTop: 2,
          }}>
          <View
            style={{
              margin: 12,
              flexDirection: 'row',
            }}>
            <View>
              <FastImage
                source={{
                  uri: `https://dev-football-group-management-group-image-bucket.s3.amazonaws.com/groupImage/${groupId}`,
                }}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  borderWidth: 0.5,
                  borderColor: '#bbbbbb',
                }}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
            <View style={{width: '70%', marginLeft: 16}}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '500',
                }}>
                {groupName}
              </Text>
              <Text
                style={{
                  marginTop: 4,
                  fontSize: 13,
                  fontFamily: 'roboto',
                }}>
                Has invited you to join their group
              </Text>
            </View>
            {loading ? (
              <ActivityIndicator size={'large'} />
            ) : (
              <Pressable
                style={{alignItems: 'center'}}
                onPress={() => onPress(groupId, inviteId)}>
                <Icon name="person-add-alt-1" size={30} color={'green'} />
                <Text style={{color: 'green'}}>Accept</Text>
              </Pressable>
            )}
          </View>
        </View>
      </View>
    </Swipeable>
  );
};
