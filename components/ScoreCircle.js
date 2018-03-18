import React from 'react'
import {
    Dimensions,
    Text,
    View
} from 'react-native';

import { ProgressCircle }  from 'react-native-svg-charts'

class ScoreCircle extends React.PureComponent {
    render() {
    	const {height, width} = Dimensions.get('window')
    	const color = '#ECB02F'

        return (
        	<View style={{justifyContent: 'center', alignItems: 'center',}}>
                <Text style={{color: color, fontSize:30}}>{this.props.score}</Text>
	            <ProgressCircle
	                style={ { height: height/2.5, width: width/2.5, position: 'absolute'} }
	                progress={this.props.score/100}
	                progressColor={color}
	                backgroundColor={'#1d252d'}
	                strokeWidth={4}
	            />
	        </View>
        )
    }

}

export default ScoreCircle;
