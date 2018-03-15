import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';

import HomeScreen from './screens/HomeScreen';
import ChartScreen from './screens/ChartScreen';


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
                tabBarLabel: 'Charts',
                // tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />
            },
        },
    },
    {
        initialRouteName: 'Home',
        tabBarOptions: {
            style: {
                backgroundColor: '#1d252d',
            },
        },
    }
);