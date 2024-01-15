import React from 'react';
import {G, Path, Svg} from 'react-native-svg';
import {colors} from '../Colors';
import {View} from 'react-native';

const AddIcon = () => {
  return (
    <View
      style={{
        backgroundColor: colors.primaryAccentColor,
        padding: 4,
        borderRadius: 25,
      }}>
      <Svg
        width={15}
        height={15}
        viewBox="0 0 22.242 22.242"
        fill={colors.mainLight}>
        <G transform="translate(11.121) rotate(45)">
          <Path
            d="M12.461,15.289l-4.6-4.6-4.6,4.6a1.5,1.5,0,0,1-2.121,0L.44,14.582a1.5,1.5,0,0,1,0-2.121l4.6-4.6-4.6-4.6a1.5,1.5,0,0,1,0-2.121L1.147.439a1.5,1.5,0,0,1,2.121,0l4.6,4.6,4.6-4.6a1.5,1.5,0,0,1,2.121,0l.707.707a1.5,1.5,0,0,1,0,2.121l-4.6,4.6,4.6,4.6a1.5,1.5,0,0,1,0,2.121l-.707.707a1.5,1.5,0,0,1-2.121,0Z"
            transform="translate(-0.001 0)"
          />
        </G>
      </Svg>
    </View>
  );
};

export default AddIcon;
