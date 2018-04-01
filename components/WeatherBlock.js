import React, { Component } from 'react';
import {
    Text,
    TextInput,
    View,
    ActivityIndicator
} from 'react-native';

import ScoreSmall from './ScoreSmall';
import colors from '../colors'
import config from '../config'

const openweathermap_key = config.openweathermap_key
const google_key = config.google_key

async function getCurrentWeather(location) {
    try {
        let response = await fetch(
          `http://api.openweathermap.org/data/2.5/find?q=${location}&units=metric&appid=${openweathermap_key}`
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

    return {
        co: co.data && co.data[0] && co.data[0].value,
        no2: no2.data && no2.data[0] && no2.data[0].value,
        so2: so2.data && so2.data[0] && so2.data[0].value,
    }
}

async function getPollution(pollutant, coordinates) {
    coordinates = coordinates.latitude + ',' + coordinates.longitude  

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

async function getLocationData(location) {
    let pollution 

    const [
        current_weather, 
        coordinates
    ] = await Promise.all([
        getCurrentWeather(location),
        getCoordinates(location)
    ])

    if(coordinates){
        pollution = await getCurrentPollution(coordinates)
    }

    return {
        weather: current_weather && current_weather.list[0] && current_weather.list[0].main,
        coordinates, 
        pollution
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
        const location_data = await getLocationData(this.state.city)

        this.setState({
            weather: location_data.weather,
            coordinates: location_data.coordinates, 
            pollution: location_data.pollution
        }) 
    }

    async updateLocation(location) {
        console.log(location)
        this.setState({
            city: location
        })
        const location_data = await getLocationData(this.state.city)

        this.setState({
            weather: location_data.weather,
            coordinates: location_data.coordinates, 
            pollution: location_data.pollution
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

        if(!this.state.pollution){ 
            return (
                <View style={{flex: 1, paddingTop: 10, paddingBottom: 10}}>
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
            <View style={{flex: 1, paddingTop: 10, paddingBottom: 3}}>
                <TextInput
                    style={{fontSize: 18, color: colors.text, paddingLeft: 15, height: 40, borderWidth: 0,}}
                    onChangeText={(city) => this.setState({city})}
                    onSubmitEditing={(event) => this.updateLocation( event.nativeEvent.text )}
                    value={this.state.city}
                    underlineColorAndroid='rgba(0,0,0,0)'
                />    
                <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                    <ScoreSmall score={this.state.weather.temp} description="Temperature" symbol="°C"/>
                    <ScoreSmall score={this.state.weather.humidity} description="Humidity" symbol="%"/>
                    <ScoreSmall score={this.state.weather.pressure} description="Air Pressure" symbol="hPa"/>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                    <ScoreSmall score={this.state.pollution.co} description="CO" symbol="ppm"/>
                    <ScoreSmall score={this.state.pollution.no2} description="NO2" symbol="ppm"/>
                    <ScoreSmall score={this.state.pollution.so2} description="SO2" symbol="ppm"/>
                </View>
            </View>
        )
    }

}

export default WeatherBlock;
