/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {Pressable, Text, View} from 'react-native';
import {Group} from '../../../../Interfaces/interfaces';
import FastImage from 'react-native-fast-image';

interface GroupCardProps {
  onPress: (group: {group: Group; isSelected: boolean}) => void;
  group: {
    group: Group;
    isSelected: boolean;
  };
}
export const GroupCard = ({onPress, group}: GroupCardProps) => {
  return (
    <Pressable
      style={{
        alignItems: 'center',
        borderWidth: group.isSelected ? 1 : 0.5,
        borderColor: group.isSelected ? 'green' : 'grey',
        padding: 16,
        borderRadius: 12,
        marginRight: 16,
      }}
      onPress={() => onPress(group)}>
      <View>
        <FastImage
          source={{
            uri: `https://dev-football-group-management-group-image-bucket.s3.amazonaws.com/groupImage/${group.group.id}`,
          }}
          style={{
            width: 70,
            height: 70,
            borderRadius: 50,
            borderWidth: 1,
            borderColor: group.isSelected ? 'green' : '#bbbbbb',
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
      <Text style={{marginTop: 8, fontSize: 14, fontWeight: '500'}}>
        {group.group.name}
      </Text>
    </Pressable>
  );
};
