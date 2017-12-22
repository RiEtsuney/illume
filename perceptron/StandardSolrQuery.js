/*
var MyUsername = 'c4292aa0-660d-40e2-b044-67bc2e5df0b8';
var MyPassword = 'a0XiaHk520H8';

var My_cluster_id = 'sc09b7ad96_3e16_4e79_9bdf_c47001dfade2';
var My_collection_name = 'cranfield_collection';
*/

var parameters = require('../train_watson/Parameters');
var watson  = require('watson-developer-cloud');
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
//Get a Solr client for indexing and searching documents.
//See https://github.com/watson-developer-cloud/node-sdk/blob/master/services/retrieve_and_rank/v1.js
solrClient = retrieve_and_rank.createSolrClient(params);

console.log('Searching all documents.');
var query = solrClient.createQuery();
query.q({ '*' : '*' });

solrClient.search(query, function(err, searchResponse) {
if(err) {
 console.log('Error searching for documents: ' + err);
}
 else {
   console.log('Found ' + searchResponse.response.numFound + ' documents.');
   console.log('First document: ' + JSON.stringify(searchResponse.response.docs[0], null, 2));
 }
});

