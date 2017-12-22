function convert(result){
	var score = '';
	for(var j=0; j<result.length; j++){
	  result[j] = Math.round(result[j]);
	  score += result[j];
	}
	score = parseInt(score,2);
	return score;
}
exports.convert = convert;