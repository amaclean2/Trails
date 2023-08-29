import React from 'react';
import {Image} from 'react-native';
import logoColor from './SundayLogos/SundayLogo.png';
import logoBlack from './SundayLogos/SundayLogo_Black.png';
import logoWhite from './SundayLogos/SundayLogo_White.png';

const LogoInline = ({color = 'black', style}: any): JSX.Element => {
  return (
    <Image
      style={style}
      source={
        (color === 'black' && logoBlack) ||
        (color === 'green' && logoColor) ||
        (color === 'white' && logoWhite)
      }
    />
  );
};

export default LogoInline;
