import React from 'react';
import {SvgCss} from 'react-native-svg';

export const LargeSkierIcon = ({
  size = 100,
  className = '',
  color = '#000000',
}) => {
  const xml = `<svg
    id="Layer_1"
    data-name="Layer 1"
    xmlns="http://www.w3.org/2000/svg"
    width={${size}}
    height={${size}}
    viewBox="0 0 100 100"
    class={${className}}
    fill={${color}}>
    <circle cx="81.19" cy="8.75" r="7.66" />
    <path d="M70.06,14.16c-7.51,1.5-23,14.44-20.83,18,1.78,3.26,22.91-6.39,25.62-9.91,2.56-3.34,.85-8.54-4.79-8.09Z" />
    <path d="M45.89,38.61c1.35,5.37,14.63,21.61,16.7,19.47,2.79-2.66-4.14-19.59-10.73-23.04-4.36-2.29-6.64,.77-5.97,3.58Z" />
    <path d="M59.52,54.29c-3.81,1.12-21.27,10.04-20.05,11.95,1.32,1.78,21.72-5.64,23.22-8.44,.93-1.73-1.49-3.81-3.17-3.51Z" />
    <path d="M69.07,18.07c-2.66,9.1,3.25,21.55,5.4,21.55,2.63,0,2.88-16.69,1.58-21.55-1.07-3.97-4.98-4.74-6.97,0Z" />
    <path d="M71.52,38.58c.83,1.45,13.78,9.32,15.22,7.73,1.77-1.95-10.86-10.55-12.76-11.01-2.08-.51-3.07,1.73-2.46,3.28Z" />
    <path d="M85.26,95.84s-5.09,.07-5.53-.22S8.82,48.28,8.82,48.28c-.75-.51-1.78-.32-2.29,.43s-.32,1.78,.43,2.29l70.98,47.38c.3,.16,1.13,.49,1.85,.49l5.47,.03c.91,0,1.64-.74,1.64-1.64s-.74-1.43-1.65-1.43Z" />
    <path d="M28.73,13.69h0c.45-.79,1.46-1.07,2.25-.62l55.08,31.33c.79,.45,1.07,1.46,.62,2.25h0c-.45,.79-1.46,1.07-2.25,.62L29.35,15.94c-.79-.45-1.07-1.46-.62-2.25Z" />
    <path d="M55.29,20.73s-2.4-6.05-.74-7.83c2.07-2.21,6.68-4.47,9.2-4.82,2.78-.38,5.35,4.54,5.35,4.54,0,0-4.16,1.47-7.23,3.31-3.48,2.09-6.58,4.79-6.58,4.79Z" />
  </svg>`;

  return <SvgCss xml={xml} />;
};
