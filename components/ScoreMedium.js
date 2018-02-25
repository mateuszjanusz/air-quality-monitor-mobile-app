import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';


class ScoreMedium extends Component {
    render = () => {
        const { description, score, color, symbol } = this.props;

        return ( 
            <View style={{marginTop: 10}}>
                <Text style={styles.description}>{description}</Text>
                <Text style={[styles.score, color]}>{score}{symbol}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    description: {
        fontSize: 15,
        color: '#B2BBD1'
    },
    score: {
        // color: '#FF590D',
        fontSize: 20,
    },
})

export default ScoreMedium;
