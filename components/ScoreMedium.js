import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import colors from '../colors'

class ScoreMedium extends Component {
    render = () => {
        const { description, score, symbol } = this.props;
        const color = colors.getColor(description.toLowerCase(), score)

        return ( 
            <View style={{marginTop: 10}}>
                <Text style={styles.description}>{description}</Text>
                <Text style={[styles.score, {color: color}]}>{score}{symbol}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    description: {
        fontSize: 18,
        color: colors.text
    },
    score: {
        fontSize: 28,
    },
})

export default ScoreMedium;
