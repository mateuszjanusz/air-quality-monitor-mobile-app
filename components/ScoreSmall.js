import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';


class ScoreSmall extends Component {
    render = () => {
        const { description, score, color, symbol, overall } = this.props;

        if(overall){
            return ( 
                <View>
                    <Text style={styles.descriptionSmall}>{description}</Text>
                    <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                        <Text style={[styles.score, color]}>{overall}</Text>
                        <Text style={[styles.scoreSmall, color]}>({score} {symbol})</Text>
                    </View>
                </View>
            );
        }

        return ( 
            <View>
                <Text style={styles.descriptionSmall}>{description}</Text>
                <Text style={[styles.score, color]}>{score} {symbol}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    descriptionSmall: {
        fontSize: 10,
        color: '#B2BBD1',
        marginTop: 8
    },
    score: {
        paddingTop: 5,
        fontSize: 15,
    },
    scoreSmall: {
        paddingTop: 5,
        paddingLeft: 5,
        fontSize: 10,
    },
})

export default ScoreSmall;
