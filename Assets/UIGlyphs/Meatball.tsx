import React from 'react';
import {G, Path, Svg} from 'react-native-svg';
import {colors} from '../Colors';

export const Meatball = () => {
  return (
    <Svg
      id="Layer_1"
      data-name="Layer 1"
      width="25"
      height="25"
      viewBox="0 0 20 20">
      <G>
        <Path
          d="M2.3,8a2.3,2.3,0,1,0,2.29,2.3A2.3,2.3,0,0,0,2.3,8Z"
          fill={colors.primaryAccentColor}
        />
        <Path
          d="M10.17,8a2.3,2.3,0,1,0,2.3,2.3A2.3,2.3,0,0,0,10.17,8Z"
          fill={colors.primaryAccentColor}
        />
        <Path
          d="M17.72,8A2.3,2.3,0,1,0,20,10.3,2.3,2.3,0,0,0,17.72,8Z"
          fill={colors.primaryAccentColor}
        />
      </G>
    </Svg>
  );
};
