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


//Creat Solr Cluster    *****************************************************
retrieve_and_rank.createCluster({
    cluster_size: '1',
    cluster_name: 'illume_cluster_1'
},
    function (err, response) {
        if (err)
            console.log('error:', err);
        else
            console.log(JSON.stringify(response, null, 2));
        console.log(response['solr_cluster_id']);
    });
 

/* 
//Upload Solr Configuration     *****************************************************
var params = {
    cluster_id: My_cluster_id,
    config_name: 'cranfield-solr-config',
    config_zip_path: 'D:/curl_7_50_3_openssl_nghttp2_x64/demo/cranfield-solr-config.zip'
};

retrieve_and_rank.uploadConfig(params,
    function (err, response) {
        if (err)
            console.log('error:', err);
        else
            console.log(JSON.stringify(response, null, 2));
    });
    */

 /*
//Creat Solr Collection     *****************************************************
var params = {
    cluster_id: My_cluster_id,
    config_name: My_config_name,
    collection_name: 'example_collection',
    wt: 'json'
};

retrieve_and_rank.createCollection(params,
    function (err, response) {
        if (err)
            console.log('error:', err);
        else
            console.log(JSON.stringify(response, null, 2));
    });
*/

/*
//Creat Ranker      *****************************************************
var fs = require('fs');

var params = {
    training_data: fs.createReadStream('D:/curl_7_50_3_openssl_nghttp2_x64/demo/cranfield-gt.csv'),
    training_metadata: fs.createReadStream('D:/curl_7_50_3_openssl_nghttp2_x64/demo/ranker_meta.json')
};

retrieve_and_rank.createRanker(params,
    function (err, response) {
        if (err)
            console.log('error: ', err);
        else
            console.log(JSON.stringify(response, null, 2));
    });
*/
