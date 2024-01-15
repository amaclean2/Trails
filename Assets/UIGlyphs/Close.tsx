import React from 'react';
import {Path, Svg} from 'react-native-svg';

const CloseIcon = ({color = '#000000', size = 15}) => (
  <Svg width={size} height={size} viewBox="0 0 15.728 15.728">
    <Path
      d="M-339.728-344.578l-4.6-4.6-4.6,4.6a1.5,1.5,0,0,1-2.121,0l-.707-.707a1.5,1.5,0,0,1,0-2.121l4.6-4.6-4.6-4.6a1.5,1.5,0,0,1,0-2.121l.707-.707a1.5,1.5,0,0,1,2.121,0l4.6,4.6,4.6-4.6a1.5,1.5,0,0,1,2.121,0l.706.707a1.5,1.5,0,0,1,0,2.121l-4.6,4.6,4.6,4.6a1.5,1.5,0,0,1,0,2.121l-.706.707a1.5,1.5,0,0,1-1.061.439A1.5,1.5,0,0,1-339.728-344.578Z"
      transform="translate(352.188 359.866)"
      fill={color}
    />
  </Svg>
);

export default CloseIcon;
