import React, { Component } from 'react';
import { LineChart, YAxis } from 'react-native-svg-charts'
import {
    View,
} from 'react-native';

import colors from '../colors'

class Chart extends React.Component {
    render() {
        const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]
        const contentInset = { top: 20, bottom: 20 }

        return (
            <View style={ { height: 200, flexDirection: 'row' } }>
                <YAxis
                  data={data}
                  contentInset={ contentInset }
                  svg={{
                      fill: 'grey',
                      fontSize: 10,
                  }}
                  formatLabel={ value => value + this.getSuffix(this.props.type) }
                />
                <LineChart
                    style={ { flex: 1, marginLeft: 16 } }
                    data={data}
                    svg={{ stroke: this.getColor(this.props.type) }}
                    contentInset={ contentInset }
                />
            </View>
        )
    }

    getSuffix(type){
        switch(type) {
            case 'temp':
                return 'ºC'
                break;
            case 'humidity':
                return '%'
                break;
            case 'dust':
                return ' mg/m3'
                break;
            default:
                return ''
        }
    }

    getColor(type){
        switch(type) {
            case 'temp':
                return colors.yellow
                break;
            case 'humidity':
                return colors.light_blue
                break; 
            case 'dust':
                return colors.beige
                break;
            default:
                return colors.yellow
        }
    }


}



export default Chart;
