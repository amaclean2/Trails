import {Picker} from '@react-native-picker/picker';
import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import {colors} from '../../Assets/Colors';
import {generalStyles} from '../GeneralStyles';
import {fieldStyles} from './FieldStyles';

const PickerElement = ({
  items,
  onChange = () => {},
  name,
  value,
  title,
}: any): JSX.Element => {
  const [isActive, setIsActive] = useState(false);

  const handleChange = (newValue?: string) => {
    setIsActive(!isActive);
    newValue && onChange({target: {name, value: newValue}});
  };

  if (!isActive) {
    return (
      <View style={fieldStyles.textAreaContainer}>
        <Text style={{...fieldStyles.descriptor, marginStart: 5}}>{title}</Text>
        <Pressable style={fieldStyles.textArea} onPress={() => handleChange()}>
          <Text>
            {
              (
                items.find(
                  (item: {label: string; value: string | number}) =>
                    item.value === value,
                ) ?? {label: 'Male'}
              ).label
            }
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={fieldStyles.textAreaContainer}>
      <Text style={{...fieldStyles.descriptor, marginStart: 5}}>{title}</Text>
      <Picker selectedValue={value} onValueChange={handleChange}>
        {items.map(
          (item: {label: string; value: string | number}, key: number) => (
            <Picker.Item
              label={item.label}
              value={item.value}
              key={`picker_item+${key}`}
            />
          ),
        )}
      </Picker>
    </View>
  );
};

export default PickerElement;
