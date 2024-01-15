import React from 'react';
import {Circle, Path, Svg} from 'react-native-svg';

export const LargeHikerIcon = ({size = 100, color = '#000000'}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100" fill={color}>
      <Path d="M78.52,35.66h0c.63-.07,1.19,.36,1.26,.96l4.68,41.74c.07,.6-.39,1.14-1.01,1.21h0c-.63,.07-1.19-.36-1.26-.96l-4.68-41.74c-.07-.6,.39-1.14,1.01-1.21Z" />
      <Circle cx="52.78" cy="13.06" r="7.6" />
      <Path d="M44.74,23.9c-3.78,6.59-4.22,26.6-.14,27.31,3.6,.8,10.18-21.29,9.31-25.61-.82-4.09-5.83-6.2-9.17-1.7Z" />
      <Path d="M43.98,51.43c3.4,4.31,22.02,13.62,23.02,10.84,1.44-3.54-11.7-16.05-19.07-16.5-4.88-.3-5.7,3.4-3.95,5.66Z" />
      <Path d="M61.98,61.2c-.13,3.94,2.86,23.16,5.03,22.6,2.09-.69,1.43-22.22-.74-24.5-1.34-1.41-4.05,.22-4.29,1.9Z" />
      <Path d="M46.82,26.79c3.71,8.64,16.08,14.45,17.72,13.09,2.01-1.66-8.32-14.6-12.38-17.5-3.32-2.37-6.81-.49-5.34,4.4Z" />
      <Path d="M63.19,39.98c1.55,.59,16.44-1.49,16.55-3.61,.14-2.61-14.96-1.29-16.71-.45-1.92,.92-1.27,3.26,.16,4.07Z" />
      <Path d="M40.11,39.16s-6.08-2.19-6.31-4.58c-.29-2.99,1.05-7.9,2.45-10,1.54-2.32,6.89-1,6.89-1,0,0-1.64,4.06-2.28,7.55-.73,3.96-.75,8.04-.75,8.04Z" />
      <Path d="M39.79,54.27c-6.06,9.87-10.56,38.3-8.86,39.17,2.41,.65,15.36-30.36,15.39-37.15,.02-3.58-4.32-4.67-6.53-2.03Z" />
    </Svg>
  );
};
