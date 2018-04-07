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
            <View style={{marginTop: 17}}>
                <Text style={{color: color, fontSize: display_score.length < 10 ? 20 : 17,}}>{display_score}</Text>
                <Text style={{fontSize: 15, color: colors.text, paddingTop: 3}}>{description}</Text>
            </View>
        );
    }
}

export default ScoreMedium;
