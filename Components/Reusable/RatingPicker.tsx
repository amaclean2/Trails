import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {RatingEmpty, RatingFull} from '../../Assets/UIGlyphs/Rating';
import {fieldStyles} from './FieldStyles';

const RatingPicker = ({
  title = 'Rating',
  rating,
  setRating,
  color = 'green',
}: {
  title?: string;
  rating: string;
  setRating: (value: string) => void;
  color?: 'blue' | 'green';
}) => {
  return (
    <View style={localStyles.ratingAndTitle}>
      <Text style={localStyles.ratingText}>{title}</Text>
      <View style={localStyles.ratingContainer}>
        <Pressable onPress={() => setRating('1')}>
          {Number(rating) < 1 ? <RatingEmpty /> : <RatingFull color={color} />}
        </Pressable>
        <Pressable onPress={() => setRating('2')}>
          {Number(rating) < 2 ? <RatingEmpty /> : <RatingFull color={color} />}
        </Pressable>
        <Pressable onPress={() => setRating('3')}>
          {Number(rating) < 3 ? <RatingEmpty /> : <RatingFull color={color} />}
        </Pressable>
        <Pressable onPress={() => setRating('4')}>
          {Number(rating) < 4 ? <RatingEmpty /> : <RatingFull color={color} />}
        </Pressable>
        <Pressable onPress={() => setRating('5')}>
          {Number(rating) < 5 ? <RatingEmpty /> : <RatingFull color={color} />}
        </Pressable>
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  ratingText: fieldStyles.descriptor,
  ratingContainer: {
    flexDirection: 'row',
    gap: 5,
    marginVertical: 5,
  },
  ratingAndTitle: {
    marginTop: 15,
  },
});

export default RatingPicker;
