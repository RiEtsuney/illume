//Test the saved perceptron

var network_path = require('./Paths').perceptron_path;
var loadNetwork = require('./loadNetwork');
var imported = loadNetwork.load(network_path);
var ResultToDec = require('./ResultToDec');
//console.log(imported);
var testingData = [0.1,0.1,0.1,0,0,0,0,0,0,0];
console.log(ResultToDec.convert(imported.activate(testingData)));


