import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';

import HomeScreen from './screens/HomeScreen';
import ChartScreen from './screens/ChartScreen';

import colors from './colors'


export default TabNavigator(
    {
        Home: { 
            screen: HomeScreen,
            navigationOptions: {
                tabBarLabel: 'Now',
                // tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />
            },
        },
        Chart: { 
            screen: ChartScreen,
            navigationOptions: {
                tabBarLabel: 'Changelog',
                // tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />
            },
        },
    },
    {
        initialRouteName: 'Home',
        tabBarOptions: {
            style: {
                backgroundColor: colors.tabBarBackground,
            },
        },
    }
);