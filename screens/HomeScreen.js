import React, { Component } from 'react';
import {
    Platform,
    Dimensions,
    StyleSheet,
    Text,
    View
} from 'react-native';

import moment from 'moment'

import ScoreMedium from '../components/ScoreMedium';
import ScoreSmall from '../components/ScoreSmall';
import Date from '../components/Date';

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
                <View style={styles.container}>
                    <Text>loading...</Text>
                </View>
            )
        }

        const current = this.state.current
        const last_updated = moment(current.timestamp).fromNow()

        return (
            <View style={styles.container}>
                <Date date={this.state.today} />
                <View style={styles.row}>
                    <View style={styles.overallContainer}>
                        <Text style={[styles.overallScore, styles.yellow]}>80</Text>
                    </View>
                    <View style={[styles.column, {justifyContent: 'space-between'}]}>
                        <ScoreMedium score={current.temp} description="Temperature" symbol="°C" color={styles.green}/>
                        <ScoreMedium score={current.humidity} description="Humidity" symbol="%" color={styles.red}/>
                        <ScoreMedium score={current.pressure} description="Pressure" symbol="hPa" color={styles.green}/>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.column}>
                        <ScoreSmall score={current.dust} description="Dust" symbol="mg/m3" color={styles.yellow}/>
                        <ScoreSmall score={current.dust} description="CO" symbol="ppm" color={styles.green}/>
                    </View>
                    <View style={styles.column}>
                        <ScoreSmall score={current.smoke} overall="GOOD" description="Smoke" symbol="ppm" color={styles.green}/>
                        <ScoreSmall score={current.lpg} overall="OK" description="LPG" symbol="ppm" color={styles.green}/>
                    </View>
                </View>
                <View style={styles.row}>
                    <Text style={styles.smallText}>Last updated {last_updated}</Text>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        padding: 8,
        justifyContent: 'flex-start',
        // alignItems: 'center',
        backgroundColor: '#2C2E38',
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
    overallContainer: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    overallScore: {
        fontSize: 45,
    },

    smallText: {
        fontSize: 10,
        color: '#B2BBD1',
    },
   
    green: {
        color: '#4F9B51'
    },
    yellow: {
        color: '#ECB02F'
    },
    red: {
        color: '#C03221'
    }
});