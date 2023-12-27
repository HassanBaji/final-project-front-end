import React, {Ref} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';

interface props {
  ref: Ref<BottomSheetModalMethods>;
}
export const SignOutBottomSheet = ({ref}: props) => {
  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <Button title="Present Modal" color="black" />
        <BottomSheetModal ref={ref}>
          <View style={styles.contentContainer}>
            <Text>Awesome 🎉</Text>
          </View>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
