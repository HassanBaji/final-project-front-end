/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {ActivityIndicator, Image, Pressable, Text, View} from 'react-native';
import ImagePicker, {Image as ImageType} from 'react-native-image-crop-picker';

import {usePlayerStore} from '../../../Store/PlayerStore';
import {TextInput} from 'react-native-gesture-handler';
import {useState} from 'react';
import Button from 'react-native-button';
import {createGroup} from '../../../core/actions/groups';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {useGroups} from '../../../core/hooks/groups';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const CreateGroupScreen = () => {
  const {player} = usePlayerStore();
  const [loading, setLoading] = useState(false);
  const {refetch: refetchGroups} = useGroups(player.id);
  const [name, setName] = useState<string>('');
  const navigation = useNavigation();
  const [image, setImage] = useState<ImageType>();

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Group created succefully',
    });
  };

  const showToastNotCompleted = () => {
    Toast.show({
      type: 'error',
      text1: 'please add and image and a group name',
    });
  };

  const showToastError = () => {
    Toast.show({
      type: 'error',
      text1: 'Something went wrong',
    });
  };

  const chooseImage = async () => {
    const options = {
      width: 100,
      height: 100,
      cropping: true,
      cropperCircleOverlay: true,
      includeBase64: true,
    };
    const myImage = await ImagePicker.openPicker(options);
    if (myImage) {
      console.log('image ' + JSON.stringify(myImage));
      setImage(myImage);
    }
  };

  const onCreateButtonClick = async () => {
    try {
      if (name !== '' && image?.path) {
        setLoading(true);
        await createGroup({
          name: name,
          ownerId: player.id,
          image: image.data ?? '',
          mime: image.mime ?? '',
        });

        await refetchGroups();
        navigation.goBack();
        showToast();
        setLoading(false);
      } else {
        showToastNotCompleted();
      }
    } catch (e) {
      console.log('error ' + e);
      showToastError();
      setLoading(false);
      throw e;
    }
  };

  return (
    <View style={{backgroundColor: '#FFF', flex: 1}}>
      <View style={{margin: 32, marginTop: 124}}>
        <View style={{alignItems: 'center'}}>
          <Pressable
            style={{
              alignItems: 'center',
              borderWidth: 1,
              padding: 12,
              width: '50%',
              borderRadius: 30,
            }}
            onPress={chooseImage}>
            {image?.sourceURL ? (
              <View>
                <Image
                  source={{uri: image?.sourceURL}}
                  style={{width: 100, height: 100, borderRadius: 50}}
                />

                <Text style={{fontSize: 12, marginTop: 8, textAlign: 'center'}}>
                  edit Image
                </Text>
              </View>
            ) : (
              <View>
                <Icon name="image-plus" size={100} />
                <Text style={{fontSize: 12, marginTop: 8, textAlign: 'center'}}>
                  Add Image
                </Text>
              </View>
            )}
          </Pressable>
        </View>
        <Text style={{fontSize: 18, marginTop: 32}}>Group Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
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
