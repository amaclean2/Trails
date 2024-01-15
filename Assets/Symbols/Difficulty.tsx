import React from 'react';
import {Circle, G, Path, Rect, Svg} from 'react-native-svg';

const DifficultyEasyIcon = () => (
  <Svg
    width="101"
    height="13"
    viewBox="0 0 101 13"
    style={{paddingVertical: 15}}>
    <Rect width="101" height="3" rx="1.5" transform="translate(0 5)" />
    <G transform="translate(4)" fill="#0aff00" stroke="#000" stroke-width="1">
      <Circle cx="6.5" cy="6.5" r="6.5" stroke="none" />
      <Circle cx="6.5" cy="6.5" r="6" fill="none" />
    </G>
  </Svg>
);

const DifficultyMediumIcon = () => (
  <Svg
    width="101"
    height="13"
    viewBox="0 0 101 13"
    style={{paddingVertical: 15}}>
    <Rect width="101" height="3" rx="1.5" transform="translate(0 5)" />
    <G transform="translate(24)" fill="#0089ff" stroke="#000" stroke-width="1">
      <Circle cx="6.5" cy="6.5" r="6.5" stroke="none" />
      <Circle cx="6.5" cy="6.5" r="6" fill="none" />
    </G>
  </Svg>
);

const DifficultyHardIcon = () => (
  <Svg
    width="101"
    height="13"
    viewBox="0 0 101 13"
    style={{paddingVertical: 15}}>
    <Rect width="101" height="3" rx="1.5" transform="translate(0 5)" />
    <G transform="translate(44)">
      <Path
        d="M 6.5 12.5 C 3.191590070724487 12.5 0.5 9.808409690856934 0.5 6.5 C 0.5 3.191590070724487 3.191590070724487 0.5 6.5 0.5 C 9.808409690856934 0.5 12.5 3.191590070724487 12.5 6.5 C 12.5 9.808409690856934 9.808409690856934 12.5 6.5 12.5 Z"
        stroke="none"
      />
      <Path
        d="M 6.5 1 C 3.467289924621582 1 1 3.467289924621582 1 6.5 C 1 9.532710075378418 3.467289924621582 12 6.5 12 C 9.532710075378418 12 12 9.532710075378418 12 6.5 C 12 3.467289924621582 9.532710075378418 1 6.5 1 M 6.5 0 C 10.0898494720459 0 13 2.910149574279785 13 6.5 C 13 10.0898494720459 10.0898494720459 13 6.5 13 C 2.910149574279785 13 0 10.0898494720459 0 6.5 C 0 2.910149574279785 2.910149574279785 0 6.5 0 Z"
        stroke="none"
        fill="#000"
      />
    </G>
  </Svg>
);

const DifficultyExtremeIcon = () => (
  <Svg
    width="101"
    height="13"
    viewBox="0 0 101 13"
    style={{paddingVertical: 15}}>
    <Rect width="101" height="3" rx="1.5" transform="translate(0 5)" />
    <G transform="translate(64)" fill="#5800ff">
      <Path
        d="M 6.5 12.5 C 3.191590070724487 12.5 0.5 9.808409690856934 0.5 6.5 C 0.5 3.191590070724487 3.191590070724487 0.5 6.5 0.5 C 9.808409690856934 0.5 12.5 3.191590070724487 12.5 6.5 C 12.5 9.808409690856934 9.808409690856934 12.5 6.5 12.5 Z"
        stroke="none"
      />
      <Path
        d="M 6.5 1 C 3.467289924621582 1 1 3.467289924621582 1 6.5 C 1 9.532710075378418 3.467289924621582 12 6.5 12 C 9.532710075378418 12 12 9.532710075378418 12 6.5 C 12 3.467289924621582 9.532710075378418 1 6.5 1 M 6.5 0 C 10.0898494720459 0 13 2.910149574279785 13 6.5 C 13 10.0898494720459 10.0898494720459 13 6.5 13 C 2.910149574279785 13 0 10.0898494720459 0 6.5 C 0 2.910149574279785 2.910149574279785 0 6.5 0 Z"
        stroke="none"
        fill="#000"
      />
    </G>
  </Svg>
);

const DifficultyProIcon = () => (
  <Svg
    width="101"
    height="13"
    viewBox="0 0 101 13"
    style={{paddingVertical: 15}}>
    <Rect width="101" height="3" rx="1.5" transform="translate(0 5)" />
    <G transform="translate(84)" fill="#ef2c2c">
      <Path
        d="M 6.5 12.5 C 3.191590070724487 12.5 0.5 9.808409690856934 0.5 6.5 C 0.5 3.191590070724487 3.191590070724487 0.5 6.5 0.5 C 9.808409690856934 0.5 12.5 3.191590070724487 12.5 6.5 C 12.5 9.808409690856934 9.808409690856934 12.5 6.5 12.5 Z"
        stroke="none"
      />
      <Path
        d="M 6.5 1 C 3.467289924621582 1 1 3.467289924621582 1 6.5 C 1 9.532710075378418 3.467289924621582 12 6.5 12 C 9.532710075378418 12 12 9.532710075378418 12 6.5 C 12 3.467289924621582 9.532710075378418 1 6.5 1 M 6.5 0 C 10.0898494720459 0 13 2.910149574279785 13 6.5 C 13 10.0898494720459 10.0898494720459 13 6.5 13 C 2.910149574279785 13 0 10.0898494720459 0 6.5 C 0 2.910149574279785 2.910149574279785 0 6.5 0 Z"
        stroke="none"
        fill="#000"
      />
    </G>
  </Svg>
);

const DifficultyGraphic = ({difficultyLevel = 1}) => {
  switch (difficultyLevel) {
    case 1:
      return <DifficultyEasyIcon />;
    case 2:
      return <DifficultyMediumIcon />;
    case 3:
      return <DifficultyHardIcon />;
    case 4:
      return <DifficultyExtremeIcon />;
    default:
      return <DifficultyProIcon />;
  }
};

export default DifficultyGraphic;
