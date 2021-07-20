/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import CoinStack from './src/components/coins/CoinsStack';

const APP = () => {
  return (
    <NavigationContainer>
      <CoinStack></CoinStack>
    </NavigationContainer>
  );
};

export default APP;
