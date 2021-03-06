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
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingLeft: 15
    },
    text: {
        color: 'white',
        fontSize: 22,
    },
})

export default Date;

