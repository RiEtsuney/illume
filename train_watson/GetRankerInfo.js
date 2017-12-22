
var parameters = require('./Parameters');
var watson = require('watson-developer-cloud');
var retrieve_and_rank = watson.retrieve_and_rank({
	username: parameters.MyUsername,
	password: parameters.MyPassword,
	version: 'v1'
});

var params = {
  ranker_id: parameters.My_ranker_id,
};

retrieve_and_rank.rankerStatus(params,
  function(err, response) {
    if (err)
      console.log('error:', err);
    else
      console.log(JSON.stringify(response, null, 2));
});
