import React from 'react';
import {KeyboardTypeOptions, Text, TextInput, View} from 'react-native';
import {fieldStyles} from './FieldStyles';

type targetType = {
  name: string;
  value: string;
};

type onChangeType = {target: targetType};

const EditElement = ({
  title,
  name,
  value,
  onChange,
  autoComplete,
  keyboardType,
  hasPlaceholder = false,
  multiline = false,
  numberOfLines = 1,
}: {
  title: string;
  name: string;
  value: string;
  onChange: (event: onChangeType) => void;
  autoComplete: string;
  keyboardType: KeyboardTypeOptions;
  hasPlaceholder: boolean;
  multiline: boolean;
  numberOfLines: number;
}): JSX.Element => {
  return (
    <View style={fieldStyles.textAreaContainer}>
      <Text style={{...fieldStyles.descriptor, marginStart: 5}}>{title}</Text>
      <TextInput
        value={value}
        onChangeText={text => onChange({target: {name, value: text}})}
        autoComplete={autoComplete}
        multiline={multiline}
        numberOfLines={numberOfLines}
        keyboardType={keyboardType}
        placeholder={hasPlaceholder ? title : ''}
        style={fieldStyles.textArea}
      />
    </View>
  );
};

export default EditElement;
