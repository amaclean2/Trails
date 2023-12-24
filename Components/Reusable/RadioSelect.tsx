import React from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import {colors} from '../../Assets/Colors';

const RadioSelect = ({
  options,
  onPress,
  selectedValue,
}: {
  options: {label: string; value: string | number}[];
  onPress: (value: string | number) => void;
  selectedValue?: string | number;
}) => {
  return (
    <FlatList
      data={options}
      contentContainerStyle={localStyles.radioList}
      renderItem={({item}) => (
        <Pressable
          onPress={() => onPress(item.value)}
          style={localStyles.listElement}>
          {item.value === selectedValue ? (
            <View
              style={[localStyles.radio, localStyles.radioSelectedExternal]}>
              <View style={localStyles.radioSelectedInternal} />
            </View>
          ) : (
            <View style={localStyles.radio} />
          )}
          <Text style={localStyles.radioFont}>{item.label}</Text>
        </Pressable>
      )}
    />
  );
};

const localStyles = StyleSheet.create({
  listElement: {
    flexDirection: 'row',
    gap: 10,
  },
  radio: {
    borderWidth: 3,
    borderColor: colors.borderColor,
    borderRadius: 25,
    width: 25,
    height: 25,
  },
  radioSelectedExternal: {
    borderColor: colors.primaryAccentColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelectedInternal: {
    backgroundColor: colors.primaryAccentColor,
    width: 12,
    height: 12,
    borderRadius: 12,
  },
  radioFont: {
    fontSize: 18,
  },
  radioList: {
    flexDirection: 'column',
    gap: 10,
    margin: 10,
    marginVertical: 20,
  },
});

export default RadioSelect;
