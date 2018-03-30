import React, { Component } from 'react';
import {
    Text,
    View
} from 'react-native';
import colors from '../colors'


class ScoreMedium extends Component {
    render = () => {
        const { description, score, symbol } = this.props;
        const color = colors.getColor(description.toLowerCase(), score)
        const display_score = score + ' ' + symbol 

        return ( 
            <View style={{marginTop: 10}}>
                <Text style={{fontSize: 15, color: colors.text}}>{description}</Text>
                <Text style={{color: color, fontSize: display_score.length < 10 ? 20 : 18,}}>{display_score}</Text>
            </View>
        );
    }
}

export default ScoreMedium;
