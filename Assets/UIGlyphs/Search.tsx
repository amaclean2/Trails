import React from 'react';
import {Image} from 'react-native';

import SearchImage from './Search.png';
import SearchDark from './SearchDark.png';

const Search = ({isDark}: {isDark?: boolean}): JSX.Element => (
  <Image source={isDark ? SearchDark : SearchImage} />
);

export default Search;
