import React, { Component } from 'react';
import {
    StyleSheet,
    Dimensions,
    Text,
    View
} from 'react-native';

import colors from '../colors'

const {height, width} = Dimensions.get('window')

class ScoreSmall extends Component {
    render = () => {
        const { description, score, symbol, overall } = this.props;
        const color = colors.getColor(description.toLowerCase(), score)

        if(!score && score != 0){
            return ( 
                <View style={{width: width/3, paddingLeft: 25}}>
                    <Text style={styles.descriptionSmall}>{description}</Text>
                    <Text style={[styles.score, {color: color}]}>no data</Text>
                </View>
            );
        }

        if(overall && score){
            return ( 
                <View style={{width: width/3, paddingLeft: 25}}>
                    <Text style={styles.descriptionSmall}>{description}</Text>
                    <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                        <Text style={[styles.score, {color: color}]}>{overall}</Text>
                        <Text style={[styles.scoreSmall, {color: color}]}>({score} {symbol})</Text>
                    </View>
                </View>
            );
        }

        return ( 
            <View style={{width: width/3, paddingLeft: 25}}>
                <Text style={styles.descriptionSmall}>{description}</Text>
                <Text style={[styles.score, {color: color}]}>{score} {symbol}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    descriptionSmall: {
        fontSize: 12,
        color: colors.text,
        marginTop: 8
    },
    score: {
        paddingTop: 5,
        fontSize: 15,
    },
    scoreSmall: {
        paddingTop: 5,
        // paddingLeft: 5,
        fontSize: 10,
    },
})

export default ScoreSmall;
