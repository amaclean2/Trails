import React from 'react';
import {Path, Svg} from 'react-native-svg';

const ConversationIcon = ({color = '#000000', size = 20}) => {
  return (
    <Svg
      id="Component_23_1"
      width={size}
      height={size * (57 / 74)}
      viewBox="0 0 74 57.001">
      <Path
        id="Subtraction_5"
        data-name="Subtraction 5"
        d="M74,54H0V0L37,29,74,0V54Z"
        transform="translate(0 3)"
        fill={color}
      />
      <Path
        id="Polygon_4"
        data-name="Polygon 4"
        d="M32,0,64,25H0Z"
        transform="translate(69 25) rotate(180)"
        fill={color}
      />
    </Svg>
  );
};

export default ConversationIcon;
