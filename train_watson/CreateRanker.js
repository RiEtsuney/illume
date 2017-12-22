
var parameters = require('./Parameters');
var watson = require('watson-developer-cloud');
var retrieve_and_rank = watson.retrieve_and_rank({
	username: parameters.MyUsername,
	password: parameters.MyPassword,
	version: 'v1'
});

var fs = require('fs');

var params = {
  training_data: fs.createReadStream(parameters.trainning_data_gt),
  //training_metadata: fs.createReadStream('ranker_meta.json')
  training_metadata: fs.createReadStream(parameters.My_training_metadata)
};

retrieve_and_rank.createRanker(params,
  function(err, response) {
    if (err)
      console.log('error: ', err);
    else
      console.log(JSON.stringify(response, null, 2));
});