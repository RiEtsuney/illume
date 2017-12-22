
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
};

//  Use a querystring parser to encode output.
var qs = require('querystring');

// Get a Solr client for indexing and searching documents.
// See https://github.com/watson-developer-cloud/node-sdk/blob/master/services/retrieve_and_rank/v1.js
solrClient = retrieve_and_rank.createSolrClient(params);

var ranker_id = parameters.My_ranker_id;
var question  = 'a chewable animal toy that is fluorescent in the darkness';
var query     = qs.stringify({q: question, ranker_id: ranker_id, fl: 'patent_no,title,author,abstract,ranker.confidence'});	//if you want to change the fields shown in the results, just change 'id,title,confidences' 

solrClient.get('fcselect', query, function(err, searchResponse) {
  if(err) {
    console.log('Error searching for documents: ' + err);
  }
    else {
      console.log(JSON.stringify(searchResponse.response.docs, null, 2));
    }
});