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
    <Svg
      id="Component_17_1"
      width={size}
      height={size * (51 / 53)}
      viewBox="0 0 53 51">
      <Path
        id="Union_1"
        data-name="Union 1"
        d="M0,41H17V51Zm0,0V0L17,10V41Z"
        fill={color}
      />
      <Path
        id="Union_2"
        data-name="Union 2"
        d="M0,41H17L0,51Zm0,0V10L17,0V41Z"
        transform="translate(18)"
        fill={color}
      />
      <Path
        id="Union_3"
        data-name="Union 3"
        d="M0,41H17V51Zm0,0V0L17,10V41Z"
        transform="translate(36)"
        fill={color}
      />
    </Svg>
  </View>
);

export default MapIcon;
