import {Picker} from '@react-native-picker/picker';
import React, {type ReactNode, useState} from 'react';
import {Pressable, Text, View} from 'react-native';

import {fieldStyles} from './FieldStyles';

const PickerElement = ({
  items,
  onChange = () => {},
  name,
  value,
  title,
}: {
  items: any[];
  onChange: (event: {target: {name: string; value: string}}) => void;
  name: string;
  value: string;
  title: ReactNode;
}): JSX.Element => {
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
          <Text style={{fontSize: 18}}>
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
