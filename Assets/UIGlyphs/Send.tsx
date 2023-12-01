import React from 'react';
import {Path, Svg} from 'react-native-svg';

const SendIcon = ({color = '#000', size = 30}) => {
  return (
    <Svg width={size * (25.8 / 30)} height={size} viewBox="0 0 25.799 30">
      <Path
        d="M11.142,28.242V11.486L6.364,16.264a3,3,0,0,1-4.243-4.243l9.843-9.843a3,3,0,0,1,4.347-.008l9.851,9.851a3,3,0,1,1-4.243,4.242l-4.778-4.778V28.242a3,3,0,0,1-6,0Z"
        transform="translate(-1.242 -1.242)"
        fill={color}
      />
    </Svg>
  );
};

export default SendIcon;
