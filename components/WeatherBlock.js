import React, { Component } from 'react';
import {
    Text,
    TextInput,
    View,
    ActivityIndicator
} from 'react-native';

import ScoreSmall from './ScoreSmall';
import colors from '../colors'

const openweathermap_key = 'e0556e897398dba1c28f1d87c296fb30'
const google_key = 'AIzaSyAgav7ozPXB6VRQh6txn1pPFN3YwRBtLvI'

async function getCurrentWeather() {
    try {
        let response = await fetch(
          `http://api.openweathermap.org/data/2.5/find?q=London&units=metric&appid=${openweathermap_key}`
        )
        let response_json = await response.json();
        return response_json
    } catch (error) {
        console.error(error)
    }
}

async function getCoordinates(location) {
    try {
        let response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${google_key}`
        )
        let response_json = await response.json();
        // console.log(response_json)
        if(response_json.results.length){
            const result = response_json.results[0].geometry.location

            return {
                latitude: result.lat,
                longitude: result.lng  
            }
        } 
        return false
    } catch (error) {
        console.error(error)
    }
}

async function getCurrentPollution(coordinates) {
    let [
        co, 
        no2,
        so2
    ] = await Promise.all([
        getPollution('co', coordinates),
        getPollution('no2', coordinates),
        getPollution('so2', coordinates)
    ])
    console.log(co, no2, so2)
    if(co.data && co.data[0]){
        co = co.data[0].value
    }
    return {
        co,
        no2,
        so2
    }
}

async function getPollution(pollutant, coordinates) {
    coordinates = coordinates.latitude + ',' + coordinates.longitude  
    console.log(coordinates)
    try {
        let response = await fetch(
            `http://api.openweathermap.org/pollution/v1/${pollutant}/${coordinates}/current.json?appid=${openweathermap_key}`
        )
        let response_json = await response.json();
        return response_json
    } catch (error) {
        console.error(error)
    }
}

class WeatherBlock extends Component {
    constructor(props) {
        super(props)
        this.state = {
            city: 'London',
        };
    }

    async componentDidMount(){
        const [
            current_weather, 
            coordinates
        ] = await Promise.all([
            getCurrentWeather(),
            getCoordinates(this.state.city)
        ])

        this.setState({
            weather: current_weather && current_weather.list[0] && current_weather.list[0].main,
            coordinates
        }) 

        if(coordinates){
            const current_pollution = await getCurrentPollution(coordinates)
        }
    }

    render() {

        if(!this.state.weather){
            return (
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator size="large" color={colors.text} />
                </View>
            )
        } 

        if(!this.state.coordinates){ //change this to pollution variable
            return (
                <View style={{flex: 1, paddingTop: 20, paddingBottom: 10}}>
                    <TextInput
                        style={{fontSize: 18, color: colors.text, paddingLeft: 15, height: 40, borderWidth: 0,}}
                        onChangeText={(city) => this.setState({city})}
                        value={this.state.city}
                        underlineColorAndroid='rgba(0,0,0,0)'
                    />    
                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                        <ScoreSmall score={this.state.weather.temp} description="Temperature" symbol="°C"/>
                        <ScoreSmall score={this.state.weather.humidity} description="Humidity" symbol="%"/>
                        <ScoreSmall score={this.state.weather.pressure} description="Air Pressure" symbol="hPa"/>
                    </View>
                </View>
            )
        }

        return (
            <View style={{flex: 1, paddingTop: 20, paddingBottom: 10}}>
                <TextInput
                    style={{fontSize: 18, color: colors.text, paddingLeft: 15, height: 40, borderWidth: 0,}}
                    onChangeText={(city) => this.setState({city})}
                    value={this.state.city}
                    underlineColorAndroid='rgba(0,0,0,0)'
                />    
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
