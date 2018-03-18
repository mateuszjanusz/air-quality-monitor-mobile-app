import React, { Component } from 'react';
import {
    Text,
    View,
    ActivityIndicator
} from 'react-native';

import ScoreSmall from './ScoreSmall';
import colors from '../colors'

async function getCurrentWeather() {
    try {
        let response = await fetch(
          'http://api.openweathermap.org/data/2.5/find?q=London&units=metric&appid=e0556e897398dba1c28f1d87c296fb30'
        )
        let response_json = await response.json();
        return response_json
    } catch (error) {
        console.error(error)
    }
}

async function getCurrentPollution() {
    // try {
    //     let response = await fetch(
    //       'http://api.openweathermap.org/data/2.5/find?q=London&units=metric&appid=e0556e897398dba1c28f1d87c296fb30'
    //     )
    //     let response_json = await response.json();
    //     return response_json
    // } catch (error) {
    //     console.error(error)
    // }
}

class WeatherBlock extends Component {
    constructor(props) {
        super(props)
        this.state = {};
    }

    async componentDidMount(){
        const [current_weather, current_pollution] = await Promise.all([
            getCurrentWeather(),
            getCurrentPollution()
        ])

        console.log(current_weather)

        this.setState({
            weather: current_weather && current_weather.list[0] && current_weather.list[0].main
        }) 
    }

    render() {

        if(!this.state.weather){
            return (
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator size="large" color={colors.text} />
                </View>
            )
        }

        return (
            <View style={{flex: 1, paddingTop: 25, paddingBottom: 10}}>
        	    <Text style={{fontSize: 18, color: colors.text, paddingLeft: 15}}>London, UK</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                    <ScoreSmall score={this.state.weather.temp} description="Temperature" symbol="°C"/>
                    <ScoreSmall score={this.state.weather.humidity} description="Humidity" symbol="%"/>
                    <ScoreSmall score={this.state.weather.pressure} description="Air Pressure" symbol="hPa"/>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                    <ScoreSmall score={20} description="CO" symbol="ppm"/>
                    <ScoreSmall score={70} description="NO2" symbol="ppm"/>
                    <ScoreSmall score={1000} description="SO2" symbol="ppm"/>
                </View>
            </View>
        )
    }

}

export default WeatherBlock;
