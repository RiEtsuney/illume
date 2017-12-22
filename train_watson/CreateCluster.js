
/*create solr cluster*/
/*************************************************************/
var parameters = require('./Parameters');
var watson = require('watson-developer-cloud');
var retrieve_and_rank = watson.retrieve_and_rank({
	username: parameters.MyUsername,
	password: parameters.MyPassword,
	version: 'v1'
});

retrieve_and_rank.createCluster({
	cluster_size: '1',
	cluster_name: 'illume cluster'
},
	function (err, response) {
    	if (err)
    		console.log('error:', err);
    	else
    		console.log(JSON.stringify(response, null, 2));
});
/*************************************************************/