import React, {useCallback, useMemo, useRef} from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {colors} from '../../Assets/Colors';

const TestNotifications = () => {
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['65%', '95%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  // renders
  return (
    <SafeAreaView style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        <View style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    padding: 24,
    backgroundColor: colors.mainOffDarkOpacity,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default TestNotifications;
