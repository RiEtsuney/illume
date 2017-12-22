
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

var Excel = require('./ReadExcel');
var docs = [];
docs = Excel.readExcel(parameters.doc_pathname);


solrClient = retrieve_and_rank.createSolrClient(params);

console.log('Indexing a document...');
solrClient.add(docs, function (err, response) {
  if (err) {
    console.log('Error indexing document: ', err);
  }
    else {
      console.log('Indexed a document.');
      solrClient.commit(function(err) {
        if(err) {
          console.log('Error committing change: ' + err);
        }
          else {
            console.log('Successfully committed changes.');
            //createRanker(retrieve_and_rank);
          }
      });
    }
});