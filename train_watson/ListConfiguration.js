
var parameters = require('./Parameters');
var watson = require('watson-developer-cloud');
var retrieve_and_rank = watson.retrieve_and_rank({
	username: parameters.MyUsername,
	password: parameters.MyPassword,
	version: 'v1'
});

retrieve_and_rank.listConfigs({
  cluster_id: parameters.My_cluster_id
},
  function (err, response) {
    if (err)
      console.log('error:', err);
    else
      console.log(JSON.stringify(response, null, 2));
});