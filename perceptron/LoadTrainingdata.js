function load(training_Filepath){
	var fs = require('fs');
	var RawTrainingdata = fs.readFileSync(training_Filepath).toString();
	
	var lines = RawTrainingdata.split("\n");
	var trainingSet = [];
	for(var i=0; i<lines.length; i++){
		var datas = [];
		var temp = lines[i].split(" ");
	    for(var j=0; j<temp.length-1; j++){
	    	datas.push(parseFloat(temp[j]));
	    }
	    //convert scores to binary
	    var datas_output = [0,0,0,0];
	    var sample_score = Math.round(parseFloat(temp[temp.length-1]));
	    var bin = sample_score.toString(2);
	    
	    for(var k=0; k<bin.length; k++){
	    	datas_output[3-k] = parseInt(bin.charAt(k));
	    }
	    //
	    trainingSet.push({input: datas, output: datas_output});
	}
	return trainingSet;
}

exports.load = load;