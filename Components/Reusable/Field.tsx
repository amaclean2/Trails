import React, {type ReactNode} from 'react';
import {Text, View} from 'react-native';
import {fieldStyles} from './FieldStyles';

const ViewField = ({
  title,
  content,
}: {
  title: string;
  content: ReactNode;
}): JSX.Element => {
  return (
    <View style={fieldStyles.viewField}>
      <Text style={fieldStyles.descriptor}>{title}</Text>
      {typeof content === 'string' || typeof content === 'number' ? (
        <Text style={fieldStyles.fieldText}>{content}</Text>
      ) : (
        content
      )}
    </View>
  );
};

export default ViewField;
