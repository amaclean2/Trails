import React, {useState} from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {CheckboxIcon, EmptyCheckboxIcon} from '../../Assets/UIGlyphs/Checkbox';
import {colors} from '../../Assets/Colors';

const CheckboxElement = ({onChange, title, checked}: any) => {
  const [isChecked, setIsChecked] = useState(checked ?? false);
  return (
    <Pressable
      style={localStyles.checkboxContainer}
      onPress={() => {
        onChange(!isChecked);
        setIsChecked(!isChecked);
      }}>
      {isChecked ? (
        <CheckboxIcon color={colors.primaryAccentColor} />
      ) : (
        <EmptyCheckboxIcon color={colors.mainOffDark} />
      )}
      <Text>{title}</Text>
    </Pressable>
  );
};

const localStyles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 5,
  },
});

export default CheckboxElement;
