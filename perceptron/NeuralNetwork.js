
function buildNetwork(training_Filepath){
	var synaptic = require('synaptic'); // this line is not needed in the browser
	var Neuron = synaptic.Neuron,
	    Layer = synaptic.Layer,
	    Network = synaptic.Network,
	    Trainer = synaptic.Trainer,
	    Architect = synaptic.Architect;
	
	var myNet = new Architect.Perceptron(10,15,4);

	var loadTrainingdata = require('./LoadTrainingdata');
	var trainingSet = loadTrainingdata.load(training_Filepath);
	
	
	var trainingOptions = {
			  rate: .1,
			  iterations: 20000,
			  error: .003,
			}
	myNet.trainer.train(trainingSet, trainingOptions);
	//return myNet.standalone();
	return myNet;
	
}
exports.buildNetwork = buildNetwork;




