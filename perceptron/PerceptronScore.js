function score(confidences){
	var network_path = require('./Paths').perceptron_path;
	var loadNetwork = require('./LoadNetwork');
	var imported = loadNetwork.load(network_path);
	var ResultToDec = require('./ResultToDec');
	return ResultToDec.convert(imported.activate(confidences));
}
exports.score = score;
//console.log(score([0.5454048708886566,0.20530811168228888,0.14614988465227638,0.09033459346869702,0.08468404920230144,0.08058904715098286,0.0710068823886518,0.06309697049580525,0.060569773357377656,0]));