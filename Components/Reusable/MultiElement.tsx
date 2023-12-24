import React, {ReactNode} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../../Assets/Colors';

const MultiElement = ({
  children,
  title,
}: {
  children: ReactNode;
  title?: string;
}): JSX.Element => {
  return (
    <View style={localStyles.elementContainer}>
      <Text style={localStyles.title}>{title}</Text>
      <View style={localStyles.editElements}>{children}</View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  title: {
    marginHorizontal: 15,
    marginBottom: 5,
    fontWeight: '700',
    fontSize: 18,
  },
  editElements: {
    flexDirection: 'row',
  },
  elementContainer: {
    marginVertical: 15,
  },
});

export default MultiElement;
