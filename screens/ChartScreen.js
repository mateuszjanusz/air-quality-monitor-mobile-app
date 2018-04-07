import React, { Component } from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    Picker,
    ActivityIndicator
} from 'react-native';

import colors from '../colors'
import LineChart from '../components/LineChart';

const {height, width} = Dimensions.get('window')

async function getTodayReadings() {
    try {
        let response = await fetch(
          'https://indoor-air-quality.herokuapp.com/today'
        )
        let response_json = await response.json();
        return response_json
    } catch (error) {
        console.error(error)
    }
}

async function getLastWeekReadings() {
    try {
        let response = await fetch(
          'https://indoor-air-quality.herokuapp.com/last-week'
        )
        let response_json = await response.json();
        return response_json
    } catch (error) {
        console.error(error)
    }
}

async function getLastMonthReadings() {
    try {
        let response = await fetch(
          'https://indoor-air-quality.herokuapp.com/last-month'
        )
        let response_json = await response.json();
        return response_json
    } catch (error) {
        console.error(error)
    }
}


export default class ChartScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            time_frame: 7,
            top_chart_type: 'temp',
            bottom_chart_type: 'humidity'
        };
    }

    async updateReadings(time_frame, top_chart_type, bottom_chart_type){
        let readings
        console.log(time_frame)
        if(time_frame === 1){
            readings = await getTodayReadings()
        } else if(time_frame === 7){
            readings = await getLastWeekReadings()
        } else if(time_frame === 30){
            readings = await getLastMonthReadings()
        }

        const top_chart_readings = readings.map((day) => day[top_chart_type])
        const bottom_chart_readings = readings.map((day) => day[bottom_chart_type])

        this.setState({
            readings,
            top_chart_readings,
            bottom_chart_readings,
        })
    }

    async componentDidMount(){
        await this.updateReadings(this.state.time_frame, this.state.top_chart_type, this.state.bottom_chart_type)
    }

    render() {
        if(this.state.readings){
            return (
                <View style={styles.container}>

                    <Picker style={styles.picker}
                        selectedValue={this.state.time_frame}
                        onValueChange={(itemValue, itemIndex) => this.setState({time_frame: itemValue})}
                        >
                            <Picker.Item label="Today" value={1} />
                            <Picker.Item label="Last 7 days" value={7} />
                            <Picker.Item label="Last 30 days" value={30} />
                    </Picker>

                    <Picker style={styles.picker}
                        selectedValue={this.state.top_chart_type}
                        onValueChange={(itemValue, itemIndex) => this.setState({top_chart_type: itemValue})}
                        >
                            <Picker.Item label="Temperature" value="temp" />
                            <Picker.Item label="Humidity" value="humidity" />
                            <Picker.Item label="Dust Density" value="dust" />
                    </Picker>
                    <LineChart type={this.state.top_chart_type} readings={this.state.top_chart_readings} />
                    <Picker style={styles.picker}
                        selectedValue={this.state.bottom_chart_type}
                        onValueChange={(itemValue, itemIndex) => this.setState({bottom_chart_type: itemValue})}
                        >
                            <Picker.Item label="Temperature" value="temp" />
                            <Picker.Item label="Humidity" value="humidity" />
                            <Picker.Item label="Dust Density" value="dust" />
                    </Picker>
                    <LineChart type={this.state.bottom_chart_type} readings={this.state.bottom_chart_readings} />

                </View>
            )    
        }


        return (
            <View style={[styles.container, {justifyContent: 'center'}]}>
                <ActivityIndicator size="large" color={colors.text} />
            </View>
        )
        
    }

    async componentWillUpdate(new_props, new_state){
        // console.log(new_state)
        if( new_state.time_frame !== this.state.time_frame
            || new_state.top_chart_type !== this.state.top_chart_type
            || new_state.bottom_chart_type !== this.state.bottom_chart_type
        ){
            await this.updateReadings(new_state.time_frame, new_state.top_chart_type, new_state.bottom_chart_type)
        }
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        justifyContent: 'flex-start',
        // alignItems: 'center',
        backgroundColor: colors.background,
    },
    row: {
        flex: 1,
        paddingLeft: 15,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
    },
    column: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        flexDirection: 'column',
    },
    picker: {
        color: 'white',
        width: width/2,
    },
});