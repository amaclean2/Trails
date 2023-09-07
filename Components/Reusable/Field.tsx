import React, {type ReactNode} from 'react';
import {StyleSheet, Text, View} from 'react-native';

const ViewField = ({
  title,
  content,
}: {
  title: string;
  content: ReactNode;
}): JSX.Element => {
  return (
    <View style={styles.viewField}>
      <Text style={styles.fieldHeader}>{title}</Text>
      {typeof content === 'string' || typeof content === 'number' ? (
        <Text style={styles.fieldText}>{content}</Text>
      ) : (
        content
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  viewField: {
    flexDirection: 'column',
    paddingVertical: 10,
  },
  fieldHeader: {
    fontSize: 10,
  },
  fieldText: {
    fontSize: 18,
    fontWeight: '400',
    paddingVertical: 5,
  },
});

export default ViewField;
