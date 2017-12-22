//This code calls the saveNetwork module to save the perceptron
var training_Filepath = require('./Paths').training_file_path;
var neural_network = require('./NeuralNetwork');
var Net = neural_network.buildNetwork(training_Filepath);
var result = Net.activate([0.3,0.1,0.1,0,0,0,0,0,0,0]);
//Change the output value of the perceptron to a decimal number
//console.log(Net);
var ResultToDec = require('./ResultToDec');
var score = ResultToDec.convert(result);

console.log(score);


//Save the perceptron
var filepath = require('./Paths').perceptron_path;
var saveNetwork = require('./SaveNetwork');
saveNetwork.save(Net, filepath);
