import React, { Component } from 'react';
import {
    Dimensions,
    Text,
    View
} from 'react-native';

import { ProgressCircle }  from 'react-native-svg-charts'

import colors from '../colors'


class ScoreCircle extends Component {
    render() {
        const mega_score = this.props.score
    	const {height, width} = Dimensions.get('window')
    	const color = colors.getColor('mega-score', mega_score)

        return (
        	<View style={{justifyContent: 'center', alignItems: 'center',}}>
                <Text style={{color: color, fontSize:35}}>{mega_score}</Text>
	            <ProgressCircle
	                style={ { height: height/3, width: width/3, position: 'absolute'} }
	                progress={mega_score/100}
	                progressColor={color}
	                backgroundColor={colors.tabBarBackground}
	                strokeWidth={4}
	            />
	        </View>
        )
    }

}

export default ScoreCircle;
