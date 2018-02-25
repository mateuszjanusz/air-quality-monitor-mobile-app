import React, { Component } from 'react';
import {
    Platform,
    Dimensions,
    StyleSheet,
    Text,
    View
} from 'react-native';

import ScoreMedium from './components/ScoreMedium';
import ScoreSmall from './components/ScoreSmall';


// const dimensions = Dimensions.get('window');
// const width = dimensions.width
// const half_width = width/2
// const third_height = dimensions.height/3

async function getCurrentReadings() {
    try {
        let response = await fetch(
          'https://indoor-air-quality.herokuapp.com/now'
        )
        let response_json = await response.json();
        return response_json[0]
    } catch (error) {
        console.error(error)
    }
}

type Props = {};

export default class App extends Component {
    
    constructor(props) {
        super(props)
        this.state = {};
    }

    async componentDidMount(){
        const current = await getCurrentReadings()
        console.log(current)
        this.setState({current}) 
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
        const ts = new Date(current.timestamp)
        // let date = ts.getDate() + '/'
        // date += ts.getMonth() < 9 ? '0'+ts.getMonth() : ts.getMonth()
        // date +='/'+ts.getFullYear()
        const date = current.timestamp.replace('T', ' ').slice(0, 19)

        return (
            <View style={styles.container}>
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
                    <Text style={styles.smallText}>Last updated {date}</Text>
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
        alignItems: 'center',
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