const colors = {
	background: '#2C2E38',
	green: '#4F9B51',
	orange: '#ECB02F',
	red:  '#C03221',
	yellow: '#FFC43D',
	light_blue: '#1B9AAA',
	beige: '#F8FFE5',
	text: '#B2BBD1',

	getColor: function(type, score){
		if(type.includes('temperature')){

			if(score > 24 || score < 16) return this.red
	        else if (score > 21 && score <= 24) return this.orange
	        else if (score > 16 && score <= 18) return this.orange
	        return this.green

		} else if (type.includes('humidity')){

			if(score > 70 || score < 25) return this.red
	        else if (score > 60 && score <= 70) return this.orange
	        return this.green

		} else if (type.includes('dust')){

			if(score > 1) return this.red
			else if(score > 0.5) return this.yellow
			return this.green

		} else if (['co', 'smoke', 'lpg'].includes(type)){
			
			if(score > 0.1) return this.red
			return this.green
			
		} else if (type.includes('pressure')){

			return this.light_blue

		} else if (type.includes('mega-score')){
			if(score > 90) return this.green
			else if(score > 70) return this.orange
			else return this.red
		}


		return this.green
	},

}

module.exports = colors