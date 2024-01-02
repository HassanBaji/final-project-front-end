/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useMemo} from 'react';
import {ActivityIndicator, Image, Pressable, Text, View} from 'react-native';
import ImagePicker, {Image as ImageType} from 'react-native-image-crop-picker';

import {usePlayerStore} from '../../../Store/PlayerStore';
import {FlatList, ScrollView, TextInput} from 'react-native-gesture-handler';
import {useState} from 'react';
import Button from 'react-native-button';
import {createGroup} from '../../../core/actions/groups';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {useGroups} from '../../../core/hooks/groups';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {GroupCard} from './GroupCard';
import {Group} from '../../../Interfaces/interfaces';
import DatePicker from 'react-native-date-picker';
import RNPickerSelect from 'react-native-picker-select';
import {createGame} from '../../../core/actions/games';

export const CreateGameScreen = () => {
  const {player} = usePlayerStore();
  const {groups, refetch: refetchGroups} = useGroups(player.id);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<string>('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [duration, setDuration] = useState(30);
  const [limit, setLimit] = useState(0);
  const [openDate, setOpenDate] = useState(false);
  const [openTime, setOpenTime] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<Group>();
  const navigation = useNavigation();

  const myGroups = useMemo(() => {
    return groups.map(group => {
      if (group.playerId === player.id) {
        return {
          group: group,
          isSelected: false,
        };
      }
    });
  }, [groups, player.id]);

  const [allGroups, setAllGroups] = useState(myGroups);

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Game created succefully',
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

  const onCreateButtonClick = async () => {
    try {
      if (!location || !duration || !selectedGroup || limit <= 0) {
        showToastNotCompleted();
      } else {
        setLoading(true);
        const timeFinish = time.getTime() + (duration ?? 0) * 60 * 1000;
        const timeFinishDate = new Date(timeFinish);

        await createGame({
          location: location,
          timeStart: time.toLocaleTimeString(),
          timeFinish: timeFinishDate.toLocaleTimeString(),
          date: date.toDateString(),
          groupId: selectedGroup.id,
          limit: limit,
        });

        refetchGroups();

        navigation.navigate('GamesScreen');
        showToast();
        setLoading(false);
      }
    } catch (e) {
      console.log('error ' + e);
      showToastError();
      setLoading(false);
      throw e;
    }
  };

  const onSelectGroup = (group: {group: Group; isSelected: boolean}) => {
    const reset = allGroups.map(updated => {
      if (updated?.isSelected === true) {
        updated.isSelected = false;
      }
      return updated;
    });

    const updated = reset.map(updatedGroup => {
      if (group?.group.id === updatedGroup?.group.id) {
        updatedGroup.isSelected = !updatedGroup.isSelected;
      }
      if (updatedGroup?.isSelected === true) {
        setSelectedGroup(updatedGroup.group);
      }
      return updatedGroup;
    });

    setAllGroups(updated);
  };

  return (
    <View style={{backgroundColor: '#FFF', flex: 1}}>
      <View style={{margin: 16, marginTop: 124}}>
        <View>
          <Text style={{lineHeight: 20}}>
            Choose the group then, Add the game information here to create your
            game
          </Text>
        </View>
        <View>
          <View>
            <Text style={{fontSize: 14, marginTop: 16}}>Choose Group</Text>
            <ScrollView style={{marginTop: 8}} horizontal={true}>
              {allGroups.map(group => {
                if (group) {
                  return (
                    <GroupCard
                      key={group.id}
                      group={group}
                      onPress={onSelectGroup}
                    />
                  );
                }
              })}
            </ScrollView>
          </View>
          <View>
            <Text style={{fontSize: 14, marginTop: 16}}>Field Name</Text>
            <TextInput
              value={location}
              onChangeText={setLocation}
              placeholder="Enter Feild name"
              style={{
                height: 40,
                borderWidth: 0.5,
                padding: 10,
                marginTop: 8,
                borderRadius: 8,
                borderColor: 'grey',
              }}
            />
          </View>
          <View>
            <Text style={{fontSize: 14, marginTop: 16}}>Date</Text>
            <Pressable onPress={() => setOpenDate(true)}>
              <Text
                style={{
                  height: 40,
                  borderWidth: 0.8,
                  padding: 10,
                  marginTop: 8,
                  borderRadius: 8,
                  borderColor: 'grey',
                }}>
                {date.toDateString()}
              </Text>
            </Pressable>
            <DatePicker
              mode="date"
              modal
              open={openDate}
              date={date}
              onConfirm={date => {
                setOpenDate(false);
                setDate(date);
              }}
              onCancel={() => {
                setOpenDate(false);
              }}
            />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{width: '45%'}}>
              <Text style={{fontSize: 14, marginTop: 16}}>Start time</Text>
              <Pressable onPress={() => setOpenTime(true)}>
                <Text
                  style={{
                    height: 40,
                    borderWidth: 0.8,
                    padding: 10,
                    marginTop: 8,
                    borderRadius: 8,
                    borderColor: 'grey',
                  }}>
                  {time.toLocaleTimeString()}
                </Text>
              </Pressable>
              <DatePicker
                modal
                open={openTime}
                date={time}
                mode="time"
                onConfirm={date => {
                  setOpenTime(false);
                  setTime(date);
                }}
                onCancel={() => {
                  setOpenTime(false);
                }}
              />
            </View>
            <View style={{width: '45%'}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{fontSize: 14, marginTop: 16}}>Duration</Text>
                <Text style={{fontSize: 12, marginTop: 16, marginLeft: 2}}>
                  (in minutes)
                </Text>
              </View>

              <RNPickerSelect
                onValueChange={value => setDuration(value)}
                useNativeAndroidPickerStyle={false}
                placeholder={{label: 'Select Duration', value: 0}}
                style={{
                  inputIOS: {
                    height: 40,
                    borderWidth: 0.8,
                    padding: 10,
                    marginTop: 8,
                    borderRadius: 8,
                    borderColor: 'grey',
                  },
                  inputAndroid: {
                    height: 40,
                    borderWidth: 0.8,
                    padding: 10,
                    marginTop: 8,
                    borderRadius: 8,
                    borderColor: 'grey',
                  },
                }}
                items={[
                  {label: '30 minutes', value: 30},
                  {label: '60 minutes', value: 60},
                  {label: '90 minutes', value: 90},
                  {label: '120 minutes', value: 120},
                ]}
              />
            </View>
          </View>

          <View style={{marginTop: 12}}>
            <Text>Players limit</Text>
            <RNPickerSelect
              onValueChange={value => setLimit(value)}
              useNativeAndroidPickerStyle={false}
              placeholder={{label: 'players limit'}}
              style={{
                inputIOS: {
                  height: 40,
                  borderWidth: 0.8,
                  padding: 10,
                  marginTop: 8,
                  borderRadius: 8,
                  borderColor: 'grey',
                },
                inputAndroid: {
                  height: 40,
                  borderWidth: 0.8,
                  padding: 10,
                  marginTop: 8,
                  borderRadius: 8,
                  borderColor: 'grey',
                },
              }}
              items={[
                {label: '10 players', value: 10},
                {label: '12 players', value: 12},
                {label: '14 players', value: 14},
                {label: '16 players', value: 16},
                {label: '18 players', value: 18},
                {label: '20 players', value: 20},
                {label: '22 players', value: 22},
                {label: '24 players', value: 24},
              ]}
            />
          </View>
        </View>
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
            width: '80%',
            borderRadius: 8,
          }}
          disabled={loading}
          onPress={onCreateButtonClick}>
          {loading ? (
            <ActivityIndicator style={{padding: 10}} color={'white'} />
          ) : (
            'Create'
          )}
        </Button>
      </View>
    </View>
  );
};
