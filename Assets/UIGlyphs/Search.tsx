import React from 'react';
import {Circle, G, Line, Svg} from 'react-native-svg';

const Search = ({size = 20, color = '#000000'}): JSX.Element => (
  <Svg id="search" width={size} height={size} viewBox="0 0 20.561 20.561">
    <G
      id="Ellipse_21"
      data-name="Ellipse 21"
      fill="none"
      stroke={color}
      stroke-width="3">
      <Circle cx="7.5" cy="7.5" r="7.5" stroke="none" />
      <Circle cx="7.5" cy="7.5" r="6" fill="none" />
    </G>
    <Line
      id="Line_43"
      data-name="Line 43"
      x1="8"
      y1="8"
      transform="translate(11.5 11.5)"
      fill="none"
      stroke={color}
      stroke-width="3"
    />
  </Svg>
);

export default Search;
