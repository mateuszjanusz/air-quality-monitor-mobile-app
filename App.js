import React, { Component } from 'react';
import {
    Platform,
    Dimensions,
    StyleSheet,
    Text,
    View
} from 'react-native';

// const instructions = Platform.select({
//     ios: 'Press Cmd+R to reload,\n' +
//         'Cmd+D or shake for dev menu',
//     android: 'Double tap R on your keyboard to reload,\n' +
//         'Shake or press menu button for dev menu',
// });
const dimensions = Dimensions.get('window');
const width = dimensions.width
const half_width = width/2
const third_height = dimensions.height/3
type Props = {};

export default class App extends Component {
    
    constructor(props) {
        super(props)
    }

    render() {

        return ( 
            <View style={styles.container}>
                <Text style={styles.header_text}>Air Quality Monitor</Text> 
                <View style={styles.column}>
                    <View style={styles.row}>
                        <View style={styles.box}>
                            <Text>1</Text>
                        </View>
                        <View style={styles.box}>
                            <Text>2</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.box}>
                            <Text>3</Text>
                        </View>
                        <View style={styles.box}>
                            <Text>4</Text>
                        </View>
                    </View>
                    <View style={styles.bottom_box}>
                        <Text>5</Text>
                    </View>
                </View>
                
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    row: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'row',
        backgroundColor: '#F5FCFF',
    },
    column: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'column',
        backgroundColor: '#F5FCFF',
    },
    header_text: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    box: {
        flex: 1,
        backgroundColor: 'lightblue',
        borderWidth: 1,
        width: half_width,
        height: third_height
    },
    bottom_box: {
        flex: 1,
        backgroundColor: 'lightblue',
        borderWidth: 1,
        width: width,
        height: third_height
    },
});