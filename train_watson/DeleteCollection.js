
var parameters = require('./Parameters');
var watson = require('watson-developer-cloud');
var retrieve_and_rank = watson.retrieve_and_rank({
	username: parameters.MyUsername,
	password: parameters.MyPassword,
	version: 'v1'
});

var params = {
  cluster_id: parameters.My_cluster_id,
  collection_name: parameters.My_collection_name,
  wt: 'json'
};

retrieve_and_rank.deleteCollection(params,
  function (err, response) {
    if (err)
      console.log('error:', err);
    else
      console.log(JSON.stringify(response, null, 2));
});