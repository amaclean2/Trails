import React from 'react';
import {G, Polygon, Svg} from 'react-native-svg';

const calculateRotation = (aspect: string) => {
  switch (aspect) {
    case 'SE':
      return '45deg';
    case 'S':
      return '90deg';
    case 'SW':
      return '135deg';
    case 'W':
      return '180deg';
    case 'NW':
      return '235deg';
    case 'N':
      return '270deg';
    case 'NE':
      return '315deg';
    default:
      return '0deg';
  }
};

export const AspectIcon = ({
  direction = 'N',
}: {
  direction?: string;
}): JSX.Element => (
  <Svg
    id="Layer_1"
    data-name="Layer 1"
    width="32"
    height="32"
    transform={[{rotate: calculateRotation(direction)}]}
    viewBox="0 0 32 32">
    <G>
      <Polygon
        fill="#C5C5C5"
        points="8.58 0.94 0.9 8.53 14.05 14.02 8.58 0.94"
      />
      <Polygon
        fill="#C5C5C5"
        points="21.64 0.13 10.55 0.13 16.05 13.26 21.64 0.13"
      />
      <Polygon
        fill="#C5C5C5"
        points="31.26 8.62 23.58 1.03 18.04 14.04 31.26 8.62"
      />
      <Polygon
        fill="#C5C5C5"
        points="0.82 23.38 8.49 30.97 14.04 17.96 0.82 23.38"
      />
      <Polygon fill="#C5C5C5" points="0 10.45 0 21.43 13.27 15.99 0 10.45" />
      <Polygon
        fill="#C5C5C5"
        points="23.5 31.06 31.17 23.47 18.02 17.98 23.5 31.06"
      />
      <Polygon
        fill="#C5C5C5"
        points="10.43 31.87 21.52 31.87 16.03 18.74 10.43 31.87"
      />
      <Polygon points="32 10.6 18.81 16.01 19.87 16.45 32 21.45 32 10.6" />
      <Polygon points="18.05 15.63 18.04 15.63 18.07 15.64 18.08 15.64 18.05 15.63" />
    </G>
  </Svg>
);
