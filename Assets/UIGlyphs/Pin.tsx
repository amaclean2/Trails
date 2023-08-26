import React from 'react';
import {Path, Svg} from 'react-native-svg';

export const Pin = ({size = 30}) => {
  return (
    <Svg id="Pin" width={size} height={size * 1.207} viewBox="0 0 30 36.213">
      <Path
        id="Exclusion_2"
        data-name="Exclusion 2"
        d="M21.213,42.426h0L10.607,31.819a15,15,0,1,1,21.213,0L21.214,42.425Zm0-27.212a6,6,0,1,0,6,6A6.006,6.006,0,0,0,21.213,15.214Z"
        transform="translate(-6.213 -6.213)"
        fill="#02ad85"
      />
    </Svg>
  );
};
