import React, {useEffect, useState} from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {colors} from '../../Assets/Colors';
import {
  useAdventureStateContext,
  useGetAdventures,
} from '@amaclean2/sundaypeak-treewells';
import {LargeSkierIcon} from '../../Assets/Activities/LargeSkierIcon';
import {LargeClimberIcon} from '../../Assets/Activities/LargeClimberIcon';
import {LargeHikerIcon} from '../../Assets/Activities/LargeHikerIcon';

const TypeButtons = ({
  style,
  jumpToUser,
  mapMoved,
  isMapView = false,
}: {
  style?: any;
  jumpToUser?: any;
  mapMoved?: boolean;
  isMapView?: boolean;
}) => {
  const [isUserButtonSelected, setIsUserButtonSelected] = useState(false);
  const {changeAdventureType} = useGetAdventures();
  const {globalAdventureType} = useAdventureStateContext();

  const clickUserButton = () => {
    setIsUserButtonSelected(true);
    jumpToUser?.();
  };

  useEffect(() => {
    mapMoved && setIsUserButtonSelected(false);
  }, [mapMoved]);

  return (
    <SafeAreaView style={[localStyles.buttonContainer, style]}>
      <Pressable
        onPress={() => changeAdventureType({type: 'ski'})}
        style={[
          localStyles.button,
          globalAdventureType === 'ski' && localStyles.activeButton,
        ]}>
        <View style={{marginRight: 2, marginLeft: -2, padding: 9}}>
          <LargeSkierIcon
            size={25}
            color={
              globalAdventureType === 'ski'
                ? colors.mainLight
                : colors.mainOffDark
            }
          />
        </View>
      </Pressable>
      <Pressable
        onPress={() => changeAdventureType({type: 'climb'})}
        style={[
          localStyles.button,
          globalAdventureType === 'climb' && localStyles.activeButton,
        ]}>
        <View
          style={{
            marginRight: 1,
            marginLeft: -1,
            padding: 8,
            paddingHorizontal: 8,
          }}>
          <LargeClimberIcon
            size={27}
            color={
              globalAdventureType === 'climb'
                ? colors.mainLight
                : colors.mainDark
            }
          />
        </View>
      </Pressable>
      <Pressable
        onPress={() => changeAdventureType({type: 'hike'})}
        style={[
          localStyles.button,
          globalAdventureType === 'hike' && localStyles.activeButton,
        ]}>
        <View
          style={{
            marginRight: 1,
            marginLeft: -1,
            padding: 7,
            paddingHorizontal: 7,
          }}>
          <LargeHikerIcon
            size={28}
            color={
              globalAdventureType === 'hike'
                ? colors.mainLight
                : colors.mainDark
            }
          />
        </View>
      </Pressable>
      {isMapView && (
        <Pressable style={localStyles.button} onPress={() => clickUserButton()}>
          <View
            style={[
              localStyles.locationMarker,
              isUserButtonSelected && localStyles.locationMarkerSelected,
            ]}
          />
        </Pressable>
      )}
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'column',
    gap: 10,
    alignItems: 'flex-end',
    width: 43,
    position: 'absolute',
    marginTop: 30,
    top: 0,
    right: 10,
  },
  button: {
    backgroundColor: colors.mainLight,
    borderRadius: 30,
  },
  activeButton: {
    backgroundColor: colors.primaryAccentColor,
  },
  activeButtonText: {
    color: colors.mainLight,
  },
  locationMarker: {
    backgroundColor: colors.mainLight,
    width: 20,
    height: 20,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: colors.mainOffDark,
    margin: 11.2,
  },
  locationMarkerSelected: {
    borderColor: colors.mainOffWhite,
    backgroundColor: colors.primaryAccentColor,
  },
});

export default TypeButtons;
