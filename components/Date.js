import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';


class Date extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{this.props.date}</Text>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container : {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginLeft: 10
    },
    text: {
        color: 'white',
        fontSize: 25,
    },
})

export default Date;

