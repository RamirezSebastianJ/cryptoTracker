/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */

import React from 'react';
import {Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import CoinStack from './src/components/coins/CoinsStack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colors from './src/res/colors';
import FavoritesStack from './src/components/favorites/FavoritesStack';


const Tabs = createBottomTabNavigator();

const APP = () => {
  return (
    <NavigationContainer>
      <Tabs.Navigator
        tabBarOptions={{tintColor:'#fefefe', style:{ backgroundColor: Colors.blackPearl}}}
      >
        <Tabs.Screen
          name="Coins"
          component={CoinStack}
          options={
            {
              tabBarIcon: ({size, color}) => (
                <Image
                  style={{tintColor: color, width: size, height: size}}
                  source={require('./src/assets/bank.png')} />
              ),
            }
          }
        />
        <Tabs.Screen
          name="Favorites"
          component={FavoritesStack}
          options={
            {
              tabBarIcon: ({size, color}) => (
                <Image
                  style={{tintColor: color, width: size, height: size}}
                  source={require('./src/assets/star.png')} />
              ),
            }
          }
        />
      </Tabs.Navigator>
    </NavigationContainer>
  );
};

export default APP;
