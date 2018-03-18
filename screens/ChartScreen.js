import React, { Component } from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    Picker
} from 'react-native';
import { LineChart } from 'react-native-svg-charts'


export default class ChartScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            time_frame: 7,
            top_chart_type: 'temp',
            bottom_chart_type: 'humidity'
        };
    }

    async componentDidMount(){
        
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Picker style={styles.picker}
                        selectedValue={this.state.time_frame}
                        onValueChange={(itemValue, itemIndex) => this.setState({time_frame: itemValue})}
                        >
                            <Picker.Item label="Today" value="1" />
                            <Picker.Item label="Last 7 days" value="7" />
                            <Picker.Item label="Last 30 days" value="30" />
                    </Picker>
                </View>

                <Picker style={styles.picker}
                    selectedValue={this.state.top_chart_type}
                    onValueChange={(itemValue, itemIndex) => this.setState({top_chart_type: itemValue})}
                    >
                        <Picker.Item label="Temperature" value="temp" />
                        <Picker.Item label="Humidity" value="humidity" />
                        <Picker.Item label="Dust Density" value="dust" />
                </Picker>

                <Picker style={styles.picker}
                    selectedValue={this.state.bottom_chart_type}
                    onValueChange={(itemValue, itemIndex) => this.setState({bottom_chart_type: itemValue})}
                    >
                        <Picker.Item label="Temperature" value="temp" />
                        <Picker.Item label="Humidity" value="humidity" />
                        <Picker.Item label="Dust Density" value="dust" />
                </Picker>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
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
    picker: {
        color: 'white'
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