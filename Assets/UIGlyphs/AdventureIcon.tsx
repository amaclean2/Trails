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
    <Svg width={size} height={size * (53 / 74)} viewBox="0 0 74 53">
      <Path
        d="M-113-433h-14l-16.659-32.191L-137.5-476l24.5,43Z"
        transform="translate(187 486)"
        fill={color}
      />
      <Path d="M27,0,54,53H0Z" fill={color} />
    </Svg>
  </View>
);

export default AdventureIcon;
