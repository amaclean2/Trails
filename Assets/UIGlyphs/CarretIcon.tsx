import React from 'react';
import {G, Rect, Svg} from 'react-native-svg';
import {colors} from '../Colors';

export const CarretIcon = (): JSX.Element => (
  <Svg
    viewBox="0 0 21.213 21.213"
    fill={colors.primaryAccentColor}
    style={{width: 25, height: 25}}
    transform={[{rotate: '180deg'}]}>
    <G id="Carret" transform="translate(10.607) rotate(45)">
      <Rect
        id="Rectangle_1"
        data-name="Rectangle 1"
        width="15"
        height="5"
        rx="2"
      />
      <Rect
        id="Rectangle_2"
        data-name="Rectangle 2"
        width="5"
        height="15"
        rx="2"
        transform="translate(10)"
      />
    </G>
  </Svg>
);
