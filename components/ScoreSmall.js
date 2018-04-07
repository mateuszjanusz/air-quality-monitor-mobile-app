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
        // const color = colors.getColor(description.toLowerCase(), score)
        const color = colors.text

        if(!score && score != 0){
            return ( 
                <View style={{width: width/3, paddingLeft: 25}}>
                    <Text style={[styles.score, {color: color}]}>no data</Text>
                    <Text style={styles.descriptionSmall}>{description}</Text>
                </View>
            );
        }

        if(overall && score){
            return ( 
                <View style={{width: width/3, paddingLeft: 25}}>
                    <Text style={styles.descriptionSmall}>{description}</Text>
                    <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                        <Text style={[styles.scoreSmall, {color: color}]}>({score} {symbol})</Text>
                        <Text style={[styles.score, {color: color}]}>{overall}</Text>
                    </View>
                </View>
            );
        }

        return ( 
            <View style={{width: width/3, paddingLeft: 25}}>
                <Text style={[styles.score, {color: color}]}>{score} {symbol}</Text>
                <Text style={styles.descriptionSmall}>{description}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    descriptionSmall: {
        fontSize: 12,
        color: colors.darktext,
        marginTop: 3
    },
    score: {
        paddingTop: 10,
        fontSize: 15,
    },
    scoreSmall: {
        paddingTop: 5,
        // paddingLeft: 5,
        fontSize: 10,
    },
})

export default ScoreSmall;
