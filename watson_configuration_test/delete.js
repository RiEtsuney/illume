var My_username = '71ca16a8-3be4-4f09-bec4-5e0386fcaf91';
var My_password = 'rbVpT3zGVJkC';
var My_cluster_id = 'sc12982d97_f077_4db2_a77e_01628786241f';
var My_config_name = 'cranfield-solr-config'
var My_rank_id = 'c852bax18-rank-1760';

var watson = require('watson-developer-cloud');
var retrieve_and_rank = watson.retrieve_and_rank({
    username: My_username,
    password: My_password,
    version: 'v1'
});
/*
var params = {
    ranker_id: My_rank_id,
};

retrieve_and_rank.deleteRanker(params,
    function (err, response) {
        if (err)
            console.log('error:', err);
        else
            console.log(JSON.stringify(response, null, 2));
    });

var params2 = {
    cluster_id: My_cluster_id,
    collection_name: 'example_collection',
    wt: 'json'
};

retrieve_and_rank.deleteCollection(params2,
    function (err, response) {
        if (err)
            console.log('error:', err);
        else
            console.log(JSON.stringify(response, null, 2));
    });
    */
    retrieve_and_rank.deleteCluster({
  cluster_id: My_cluster_id
},
  function (err, response) {
    if (err)
      console.log('error:', err);
    else
      console.log(JSON.stringify(response, null, 2));
});