import React from 'react';
import {Path, Svg} from 'react-native-svg';
import {colors} from '../Colors';

const Trash = ({color = colors.mainOffDark, size = 51}) => {
  return (
    <Svg width={size} height={size * (52 / 64)} viewBox="0 0 52.314 63.999">
      <Path
        d="M13,63a5.006,5.006,0,0,1-5-5V10H4.343a.5.5,0,0,1-.113-.986L24.557,4.27V2a3,3,0,0,1,3-3h5a3,3,0,0,1,3,3V4.3L55.77,9.014a.5.5,0,0,1-.113.986H52V58a5.005,5.005,0,0,1-5,5ZM38,16.593V54.249a1,1,0,0,0,1,1h2a1,1,0,0,0,1-1V16.593a1,1,0,0,0-1-1H39A1,1,0,0,0,38,16.593Zm-10,0V54.249a1,1,0,0,0,1,1h2a1,1,0,0,0,1-1V16.593a1,1,0,0,0-1-1H29A1,1,0,0,0,28,16.593Zm-10,0V54.249a1,1,0,0,0,1,1h2a1,1,0,0,0,1-1V16.593a1,1,0,0,0-1-1H19A1,1,0,0,0,18,16.593ZM30.114,3.027l3.443.8V2a1,1,0,0,0-1-1h-5a1,1,0,0,0-1,1V3.8l3.329-.777a.487.487,0,0,1,.228,0Z"
        transform="translate(-3.843 1)"
        fill={color}
      />
    </Svg>
  );
};

export default Trash;
