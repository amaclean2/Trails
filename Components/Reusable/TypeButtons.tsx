import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {colors} from '../../Assets/Colors';
import {
  useAdventureStateContext,
  useGetAdventures,
} from '@amaclean2/sundaypeak-treewells';

const TypeButtons = ({style}: {style?: any}) => {
  const {changeAdventureType} = useGetAdventures();
  const {globalAdventureType} = useAdventureStateContext();

  return (
    <View style={[localStyles.buttonContainer, style]}>
      <Pressable
        onPress={() => changeAdventureType({type: 'ski'})}
        style={[
          localStyles.button,
          globalAdventureType === 'ski' && localStyles.activeButton,
        ]}>
        <Text
          style={[
            localStyles.buttonText,
            globalAdventureType === 'ski' && localStyles.activeButtonText,
          ]}>
          Ski
        </Text>
      </Pressable>
      <Pressable
        onPress={() => changeAdventureType({type: 'climb'})}
        style={[
          localStyles.button,
          globalAdventureType === 'climb' && localStyles.activeButton,
        ]}>
        <Text
          style={[
            localStyles.buttonText,
            globalAdventureType === 'climb' && localStyles.activeButtonText,
          ]}>
          Climb
        </Text>
      </Pressable>
      <Pressable
        onPress={() => changeAdventureType({type: 'hike'})}
        style={[
          localStyles.button,
          globalAdventureType === 'hike' && localStyles.activeButton,
        ]}>
        <Text
          style={[
            localStyles.buttonText,
            globalAdventureType === 'hike' && localStyles.activeButtonText,
          ]}>
          Hike
        </Text>
      </Pressable>
    </View>
  );
};

const localStyles = StyleSheet.create({
  buttonContainer: {
    marginBottom: -78,
    height: 30,
    flexDirection: 'row',
    gap: 5,
    paddingEnd: 5,
    justifyContent: 'flex-end',
  },
  button: {
    backgroundColor: colors.mainOffWhite,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  buttonText: {
    color: colors.mainDark,
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  activeButton: {
    backgroundColor: colors.primaryAccentColor,
  },
  activeButtonText: {
    color: colors.mainLight,
  },
});

export default TypeButtons;
