import React from 'react';
import {SvgCss} from 'react-native-svg';

const Hamburger = () => {
  const xml = `
  <svg
      id="Hamburger"
      class="hamburger"
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="21"
      viewBox="0 0 21 21">
      <rect
        id="Rectangle_708"
        data-name="Rectangle 708"
        width="21"
        height="3"
        rx="1"
      />
      <rect
        id="Rectangle_709"
        data-name="Rectangle 709"
        width="21"
        height="3"
        rx="1"
        transform="translate(0 9)"
      />
      <rect
        id="Rectangle_710"
        data-name="Rectangle 710"
        width="21"
        height="3"
        rx="1"
        transform="translate(0 18)"
      />
    </svg>
  `;
  return <SvgCss xml={xml} />;
};

export default Hamburger;
