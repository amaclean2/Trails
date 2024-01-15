import React from 'react';
import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {fieldStyles} from './FieldStyles';
import {colors} from '../../Assets/Colors';

type targetType = {
  name: string;
  value: string;
};

type DistanceUnit = 'feet' | 'miles' | 'kilometers' | 'meters' | 'degrees';

type onChangeType = {target: targetType};

const buildUnitAbbrev = (unit: DistanceUnit) => {
  switch (unit) {
    case 'feet':
      return 'ft';
    case 'miles':
      return 'mi';
    case 'kilometers':
      return 'km';
    case 'meters':
      return 'm';
    case 'degrees':
      return `\u00b0`;
  }
};

const DistanceEdit = ({
  value,
  title = 'Distance',
  name = 'distance',
  onChange,
  keyboardType,
  hasPlaceholder = false,
  unit = 'miles',
}: {
  value: string;
  title?: string;
  name?: string;
  onChange: (event: onChangeType) => void;
  autoComplete?: string;
  keyboardType?: KeyboardTypeOptions;
  hasPlaceholder?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  unit?: DistanceUnit;
}): JSX.Element => {
  return (
    <View style={fieldStyles.textAreaContainer}>
      <Text style={{...fieldStyles.descriptor, marginStart: 5}}>{title}</Text>
      <View style={[fieldStyles.textArea, localStyles.distanceContainer]}>
        <TextInput
          value={value}
          onChangeText={text => onChange({target: {name, value: text}})}
          multiline={false}
          keyboardType={'decimal-pad'}
          placeholder={title}
          style={[localStyles.fieldStyle, {flex: 1}]}
        />
        <Text style={localStyles.accentText}>{buildUnitAbbrev(unit)}</Text>
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  fieldStyle: {
    padding: 0,
    fontSize: 18,
  },
  distanceContainer: {
    flexDirection: 'row',
  },
  accentText: {
    fontSize: 18,
    color: colors.mainOffDark,
  },
});

export default DistanceEdit;
