const scores = {
	getScoreIndex: function(type, score){

		if(type.includes('temp')){

			if(score > 24 || score < 16) return 0
	        else if (score > 21 && score <= 24) return 1
	        else if (score > 16 && score <= 18) return 1
	        return 2

		} else if (type.includes('humidity')){

			if(score > 70 || score < 25) return 0
	        else if (score > 60 && score <= 70) return 1
	        return 2

		} else if (type.includes('dust')){

			if(score > 1) return 0
			else if(score > 0.5) return 1
			return 2

		} else if (['co', 'smoke', 'lpg'].includes(type)){
			
			if(score > 0.1) return 0
			return 2
			
		} else if (type.includes('pressure')){
			return 2
		}

		return 2
	},

}

module.exports = scores