/**
 * achieve UploadConfig((createCollection(AddDocuments(createRanker)))
 */
var My_username = 'e35b68c1-d2a6-49af-b554-236316b4cdf9';
var My_password = 'PHpDLF7BmQ4L';

var My_cluster_id = 'sc4660d32c_e50d_439a_ade4_172d79ed99b1';
var My_config_name = 'cranfield_solr_config_2';
var My_config_zip_path = '/Users/apple/Desktop/Tutorial/cranfield-solr-config.zip';
var My_collection_name = 'cranfield_collection_2';
var doc_pathname = '/Users/apple/Desktop/Tutorial/test.xlsx';
var trainning_data_gt = '/Users/apple/Desktop/Tutorial/cranfield-gt.csv';
var My_training_metadata = '/Users/apple/Desktop/Tutorial/ranker_meta.json';

//function UploadSolrConfiguration(retrieve_and_rank, createCollection){
function UploadSolrConfiguration(createCollection, AddDoc, createRanker) {
    var watson = require('watson-developer-cloud');
    var retrieve_and_rank = watson.retrieve_and_rank({
        username: MyUsername,
        password: MyPassword,
        version: 'v1'
    });

    var params = {
        cluster_id: My_cluster_id,
        config_name: My_config_name,
        config_zip_path: My_config_zip_path
    };

    retrieve_and_rank.uploadConfig(params,
        function (err, response) {
            if (err) {
                console.log('error:', err);
            }
            else {
                console.log(JSON.stringify(response, null, 2));
                createCollection(retrieve_and_rank, AddDoc, createRanker);
            }
        });
}

function CreateSolrCollection(retrieve_and_rank, AddDoc, createRanker) {
    var params = {
        cluster_id: My_cluster_id,
        config_name: My_config_name,
        collection_name: My_collection_name,
        wt: 'json'
    };

    retrieve_and_rank.createCollection(params,
        function (err, response) {
            if (err) {
                console.log('error:', err);
            }
            else {
                console.log(JSON.stringify(response, null, 2));
                AddDoc(retrieve_and_rank, createRanker);
            }
        });
}

function AddDocuments(retrieve_and_rank, createRanker) {
    var params = {
        cluster_id: My_cluster_id,
        collection_name: My_collection_name,
    };

    var Excel = require('./ReadExcel');
    var docs = [];
    docs = Excel.readExcel(doc_pathname);


    solrClient = retrieve_and_rank.createSolrClient(params);

    console.log('Indexing a document...');
    solrClient.add(docs, function (err, response) {
        if (err) {
            console.log('Error indexing document: ', err);
        }
        else {
            console.log('Indexed a document.');
            solrClient.commit(function (err) {
                if (err) {
                    console.log('Error committing change: ' + err);
                }
                else {
                    console.log('Successfully committed changes.');
                    //createRanker(retrieve_and_rank);
                }
            });
        }
    })
}

function createRanker(retrieve_and_rank) {
    var fs = require('fs');

    var params = {
        training_data: fs.createReadStream(trainning_data_gt),
        //training_metadata: fs.createReadStream('ranker_meta.json')
        training_metadata: fs.createReadStream(My_training_metadata)
    };

    retrieve_and_rank.createRanker(params,
        function (err, response) {
            if (err)
                console.log('error: ', err);
            else
                console.log(JSON.stringify(response, null, 2));
        });
}

UploadSolrConfiguration(CreateSolrCollection, AddDocuments, createRanker);