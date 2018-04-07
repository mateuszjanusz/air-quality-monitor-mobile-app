import React, { Component } from 'react';
import {
    Platform,
    Dimensions,
    StyleSheet,
    Text,
    View,
    Image,
    ActivityIndicator,
    KeyboardAvoidingView
} from 'react-native';

import moment from 'moment'
import _ from 'lodash'

import colors from '../colors'
import scores from '../scores'

import ScoreCircle from '../components/ScoreCircle';
import ScoreMedium from '../components/ScoreMedium';
import ScoreSmall from '../components/ScoreSmall';
import DateText from '../components/Date';
import WeatherBlock from '../components/WeatherBlock';


const {height, width} = Dimensions.get('window')

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

function getMegaScore(readings) {
    let mega_score = 100

    _.forEach(readings, function (score, type) {
        if(!isNaN(score)){
            const score_index = scores.getScoreIndex(type, score)
            if(score_index === 1){
                mega_score -= 5
            } else if(score_index === 0){
                mega_score -= 10
            }
        }
    })

    return mega_score
}


export default class HomeScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mega_score: 100
        };
    }

    async componentDidMount(){
        const current_readings = await getCurrentReadings()
        const mega_score = await getMegaScore(current_readings)

        const today = moment().format('dddd, Do MMMM')

        this.setState({
            current: current_readings,
            mega_score,
            today
        }) 
    }

    render() {

        if(!this.state.current){
            return (
                <View style={[styles.container, {justifyContent: 'space-around', alignItems: 'center'}]}>
                    <Image
                        style={{width: 150, height: 150}}
                        source={require('../img/ic_launcher.png')}
                    />
                    <ActivityIndicator size="large" color={colors.text} />
                </View>
            )
        }

        const current = this.state.current
        const last_updated = moment(current.timestamp).fromNow()

        return (
            <View style={styles.container}>
                <KeyboardAvoidingView behavior="padding">
                    <DateText date={this.state.today} />
                    <View style={[styles.row,{justifyContent: 'flex-start', paddingLeft: 16, paddingTop: 5 }]}>
                        <Text style={styles.smallText}>Last updated {last_updated}</Text>
                    </View>
                    <View style={[styles.row, {paddingTop: 20}]}>
                        <View style={styles.overallContainer}>
                            <ScoreCircle score={this.state.mega_score} />
                        </View>
                        <View style={[styles.column, {width: width/3, justifyContent: 'space-between'}]}>
                            <ScoreMedium score={current.dust} description="Dust Density" symbol="mg/m3" />
                            <ScoreMedium score={current.pressure} description="Pressure" symbol="hPa" />
                            <ScoreMedium score={current.smoke} description="Smoke" symbol="ppm" />
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={[styles.column, {width: width/3, paddingLeft: 15,}]}>
                            <ScoreMedium score={current.temp} description="Temperature" symbol="°C" />
                            <ScoreMedium score={current.humidity} description="Humidity" symbol="%" />

                        </View>
                        <View style={[styles.column, {width: width/3}]}>
                            <ScoreMedium score={current.co} description="CO" symbol="ppm" />
                            <ScoreMedium score={current.lpg} description="LPG" symbol="ppm" />
                        </View>
                    </View>
                    
                    <View style={styles.row}>
                        <WeatherBlock />
                    </View>
                </KeyboardAvoidingView>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        padding: 10,
        justifyContent: 'space-between',
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
        paddingLeft: 10
    },
    overallContainer: {
        width: width/3,
        paddingLeft: 30,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    smallText: {
        fontSize: 10,
        color: colors.text,
    },
});