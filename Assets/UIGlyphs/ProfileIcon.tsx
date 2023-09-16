import React from 'react';
import {View} from 'react-native';
import {Circle, Path, Svg} from 'react-native-svg';

const ProfileIcon = ({size = 20, color}: any) => (
  <View
    style={{
      width: size,
      height: size,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
    <Svg
      id="Component_19_1"
      width={size}
      height={(8 / 7) * size}
      viewBox="0 0 69.457 79">
      <Path
        id="Intersection_2"
        data-name="Intersection 2"
        d="M10.272,73.619a35,35,0,0,1,69.457,0,45,45,0,0,1-69.457,0Z"
        transform="translate(-10.272 -11)"
        fill={color}
      />
      <Circle
        id="Ellipse_24"
        data-name="Ellipse 24"
        cx="15"
        cy="15"
        r="15"
        transform="translate(19.728)"
        fill={color}
      />
    </Svg>
  </View>
);

export default ProfileIcon;
