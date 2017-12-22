function load(network_Filepath){
	var fs = require('fs');
	var rawData = fs.readFileSync(network_Filepath).toString();
	var network_JSON = JSON.parse(rawData);
	
	var synaptic = require('synaptic');
	var network = synaptic.Network.fromJSON(network_JSON);
	return network
}

exports.load = load;