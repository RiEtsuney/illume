var My_username = '71ca16a8-3be4-4f09-bec4-5e0386fcaf91';
var My_password = 'rbVpT3zGVJkC';
var My_cluster_id = 'sc8c73e6a0_41d1_43be_893e_98a63ce7fd2a';
var My_config_name = 'cranfield-solr-config'
var My_rank_id = 'c852bax18-rank-1768';

var watson = require('watson-developer-cloud');
var retrieve_and_rank = watson.retrieve_and_rank({
    username: My_username,
    password: My_password,
    version: 'v1'
});

var params = {
    cluster_id: My_cluster_id,
    collection_name: 'example_collection'
};

//  Use a querystring parser to encode output.
var qs = require('querystring');

// Get a Solr client for indexing and searching documents.
// See https://github.com/watson-developer-cloud/node-sdk/blob/master/services/retrieve_and_rank/v1.js
solrClient = retrieve_and_rank.createSolrClient(params);

var question = 'what is the basic mechanism of the transonic aileron buzz';
var query = qs.stringify({ q: question, ranker_id: My_rank_id, fl: 'id,title' });

solrClient.get('fcselect', query, function (err, searchResponse) {
    if (err) {
        console.log('Error searching for documents: ' + err);
    }
    else {
        console.log(JSON.stringify(searchResponse.response.docs, null, 2));
    }
});

/*
//Search Solr Standard  *****************************************************
var params = {
    cluster_id: My_cluster_id,
    collection_name: 'example_collection',
    wt: 'json'
};

// Get a Solr client for indexing and searching documents.
// See https://github.com/watson-developer-cloud/node-sdk/blob/master/services/retrieve_and_rank/v1.js
solrClient = retrieve_and_rank.createSolrClient(params);

console.log('Searching all documents.');
var query = solrClient.createQuery();
query.q({ '*': '*' });

solrClient.search(query, function (err, searchResponse) {
    if (err) {
        console.log('Error searching for documents: ' + err);
    }
    else {
        console.log('Found ' + searchResponse.response.numFound + ' documents.');
        console.log('First document: ' + JSON.stringify(searchResponse.response.docs[0], null, 2));
    }
});
*/