import React from 'react';
import {
  RatingEmpty,
  RatingFull,
  RatingHalf,
  RatingQuarter,
  RatingThreeQuarter,
} from '../../Assets/Symbols/Rating';
import {StyleSheet, View} from 'react-native';

const RatingView = ({ratingCount = 5}): JSX.Element => {
  const fullStars = Math.floor(ratingCount);
  const remainingStars = ratingCount - fullStars;

  return (
    <View style={localStyles.ratingContainer}>
      {Array(fullStars)
        .fill(1)
        .map(() => (
          <RatingFull />
        ))}
      {remainingStars <= 0.25 && remainingStars > 0 && <RatingQuarter />}
      {remainingStars <= 0.5 && remainingStars > 0.25 && <RatingHalf />}
      {remainingStars <= 0.75 && remainingStars > 0.5 && <RatingThreeQuarter />}
      {remainingStars < 1 && remainingStars > 0.75 && <RatingFull />}
      {Array(Math.floor(5 - ratingCount))
        .fill(1)
        .map(() => (
          <RatingEmpty />
        ))}
    </View>
  );
};

const localStyles = StyleSheet.create({
  ratingContainer: {
    flexDirection: 'row',
    marginHorizontal: 15,
    marginTop: -10,
    gap: 3,
  },
});

export default RatingView;
