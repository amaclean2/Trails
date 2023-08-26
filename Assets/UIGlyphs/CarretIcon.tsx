import React from 'react';
import {SvgCss} from 'react-native-svg';

export const CarretIcon = ({
  color = '#000000',
  size = '21.213',
  className = '',
}) => {
  const xml = `
	<svg
    xmlns="http://www.w3.org/2000/svg"
    width={${size}}
    height={${size}}
    viewBox="0 0 21.213 21.213"
    class={${className}}
    fill={${color}}>
    <g id="Carret" transform="translate(10.607) rotate(45)">
      <rect
        id="Rectangle_1"
        data-name="Rectangle 1"
        width="15"
        height="5"
        rx="2"
      />
      <rect
        id="Rectangle_2"
        data-name="Rectangle 2"
        width="5"
        height="15"
        rx="2"
        transform="translate(10)"
      />
    </g>
  </svg>
	`;
  return <SvgCss xml={xml} />;
};
