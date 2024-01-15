import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import Search from '../../Assets/UIGlyphs/Search';
import {colors} from '../../Assets/Colors';
import {BottomSheetTextInput} from '@gorhom/bottom-sheet';

const SearchField = ({
  value = '',
  onChangeText = () => {},
  placeholder = '',
  style = {},
  isBottomSheet = false,
}: {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  style?: any;
  isBottomSheet?: boolean;
}): JSX.Element => {
  return (
    <View style={[style, localStyles.fieldBody]}>
      <Search color={'#999'} size={18} />
      {isBottomSheet ? (
        <BottomSheetTextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          style={localStyles.searchText}
        />
      ) : (
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          style={localStyles.searchText}
        />
      )}
    </View>
  );
};

const localStyles = StyleSheet.create({
  fieldBody: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: colors.textAreaBackground,
    marginHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
    paddingStart: 15,
    overflow: 'hidden',
  },
  searchText: {
    fontSize: 16,
    flex: 1,
    paddingVertical: 10,
  },
});

export default SearchField;
