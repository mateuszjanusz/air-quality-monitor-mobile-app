import React, { Component } from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    View
} from 'react-native';


export default class ChartScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {};
    }

    async componentDidMount(){
        
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Hello I am chart view</Text>
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