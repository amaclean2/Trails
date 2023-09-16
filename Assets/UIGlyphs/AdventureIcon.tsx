import React from 'react';
import {Path, Svg} from 'react-native-svg';
import {colors} from '../Colors';
import {View} from 'react-native';

const AdventureIcon = ({color = colors.primaryAccentColor, size = 20}: any) => (
  <View
    style={{
      width: size,
      height: size,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
    <Svg
      id="Component_18_1"
      data-name="Component 18 – 1"
      width={size}
      height={size * (53 / 74)}
      viewBox="0 0 74 53">
      <Path
        id="Polygon_1"
        data-name="Polygon 1"
        d="M27,0,54,53H0Z"
        fill={color}
      />
      <Path
        id="Polygon_2"
        data-name="Polygon 2"
        d="M24.5,0,49,43H0Z"
        transform="translate(25 10)"
        fill={color}
      />
    </Svg>
  </View>
);

export default AdventureIcon;
