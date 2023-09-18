import React from 'react';
import {colors} from '../../Assets/Colors';
import {StyleSheet, Text, View} from 'react-native';
import {fieldStyles} from './FieldStyles';
import {Slider} from '@rneui/themed';

const SliderElement = ({
  value,
  name,
  minValue,
  maxValue,
  onChange,
  title,
}: {
  value: number;
  name: string;
  minValue: number;
  maxValue: number;
  onChange: any;
  title: string;
}): JSX.Element => {
  return (
    <View style={localStyles.sliderStyle}>
      <Text style={{...fieldStyles.descriptor, marginStart: 5}}>{title}</Text>
      <Slider
        value={value}
        maximumValue={maxValue}
        minimumValue={minValue}
        allowTouchTrack
        trackStyle={{
          height: 5,
          backgroundColor: colors.primaryAccentColorOpacity,
        }}
        thumbStyle={{
          height: 20,
          width: 20,
          backgroundColor: colors.primaryAccentColor,
        }}
        step={1}
        onValueChange={newValue => onChange({target: {name, value: newValue}})}
      />
    </View>
  );
};

const localStyles = StyleSheet.create({
  sliderStyle: {
    marginHorizontal: 15,
    marginVertical: 5,
  },
});

export default SliderElement;
