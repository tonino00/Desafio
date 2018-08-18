import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Icon } from 'native-base';
import { StyleSheet } from 'react-native';


// Stack Navigator

import Home from '../Home';
import Details from '../Details';
import ShoppingCart from '../ShoppingCart';
import Splash from '../../Splash';

export const Root = createStackNavigator({
    Splash: {
      screen: Splash,
    },
    Home: {
      screen: Home,
    },
    Details: {
        screen: Details,
      },
      ShoppingCart: {
        screen: ShoppingCart,
      },
    },
    {
        headerMode: 'none'
    },
);