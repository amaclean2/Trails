import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import Search from '../../Assets/UIGlyphs/Search';
import {colors} from '../../Assets/Colors';

const SearchField = ({
  value = '',
  onChangeText = (text: string) => {
    console.log({text});
  },
  placeholder = '',
  style = {},
}): JSX.Element => {
  return (
    <View style={[style, localStyles.fieldBody]}>
      <Search color={'#999'} size={18} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
      />
    </View>
  );
};

const localStyles = StyleSheet.create({
  fieldBody: {
    flexDirection: 'row',
    gap: 10,
    padding: 10,
    backgroundColor: colors.borderColor,
    marginHorizontal: 15,
    borderRadius: 8,
  },
});

export default SearchField;
