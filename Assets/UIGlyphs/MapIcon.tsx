import React from 'react';
import {Path, Svg} from 'react-native-svg';
import {colors} from '../Colors';
import {View} from 'react-native';

const MapIcon = ({size = 20, color = colors.primaryAccentColor}: any) => (
  <View
    style={{
      width: size,
      height: size,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
    <Svg width={size} height={size * (51 / 59)} viewBox="0 0 59 51">
      <Path d="M0,41H17V51Zm0,0V0L17,10V41Z" fill={color} />
      <Path
        d="M0,41H17L0,51Zm0,0V10L17,0V41Z"
        transform="translate(21)"
        fill={color}
      />
      <Path
        d="M0,41H17V51Zm0,0V0L17,10V41Z"
        transform="translate(42)"
        fill={color}
      />
    </Svg>
  </View>
);

export default MapIcon;
