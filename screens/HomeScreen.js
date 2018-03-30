import React, { Component } from 'react';
import {
    Platform,
    Dimensions,
    StyleSheet,
    Text,
    View,
    ActivityIndicator
} from 'react-native';

import moment from 'moment'
import colors from '../colors'

import ScoreCircle from '../components/ScoreCircle';
import ScoreMedium from '../components/ScoreMedium';
import ScoreSmall from '../components/ScoreSmall';
import DateText from '../components/Date';
import WeatherBlock from '../components/WeatherBlock';

async function getCurrentReadings() {
    try {
        let response = await fetch(
          'https://indoor-air-quality.herokuapp.com/now'
        )
        let response_json = await response.json();
        return response_json
    } catch (error) {
        console.error(error)
    }
}


export default class HomeScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {};
    }

    async componentDidMount(){
        const current = await getCurrentReadings()
        const today = moment().format('dddd, Do MMMM')

        this.setState({
            current,
            today
        }) 
    }

    render() {

        if(!this.state.current){
            return (
                <View style={[styles.container, {justifyContent: 'center'}]}>
                    <ActivityIndicator size="large" color={colors.text} />
                </View>
            )
        }

        const current = this.state.current
        const last_updated = moment(current.timestamp).fromNow()

        return (
            <View style={styles.container}>
                <DateText date={this.state.today} />
                <View style={styles.row}>
                    <View style={styles.overallContainer}>
                        <ScoreCircle score={75} />
                    </View>
                    <View style={[styles.column, {justifyContent: 'space-between', paddingLeft: 30}]}>
                        <ScoreMedium score={current.temp} description="Temperature" symbol="°C" />
                        <ScoreMedium score={current.humidity} description="Humidity" symbol="%" />
                        <ScoreMedium score={current.pressure} description="Pressure" symbol="hPa" />
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.column}>
                        <ScoreSmall score={current.dust} description="Dust Density" symbol="mg/m3" />
                        <ScoreSmall score={current.co} description="CO" symbol="ppm" />
                    </View>
                    <View style={styles.column}>
                        <ScoreSmall score={current.smoke} description="Smoke" symbol="ppm" />
                        <ScoreSmall score={current.lpg} description="LPG" symbol="ppm" />
                    </View>
                </View>
                <View style={[styles.row,{paddingTop: 15}]}>
                    <Text style={styles.smallText}>Last updated {last_updated}</Text>
                </View>
                <View style={styles.row}>
                    <WeatherBlock />
                </View>
                
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        padding: 10,
        justifyContent: 'flex-start',
        // alignItems: 'center',
        backgroundColor: colors.background,
    },
    row: {
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
    },
    column: {
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        flexDirection: 'column',
    },
    overallContainer: {
        paddingLeft: 30,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    smallText: {
        fontSize: 10,
        color: colors.text,
    },
});