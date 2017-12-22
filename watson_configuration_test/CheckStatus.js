var My_username = 'e35b68c1-d2a6-49af-b554-236316b4cdf9';
var My_password = 'PHpDLF7BmQ4L';
var My_cluster_id = 'sc8c73e6a0_41d1_43be_893e_98a63ce7fd2a';
var My_config_name = 'cranfield-solr-config'
var My_rank_id = 'c852bax18-rank-1768';

var watson = require('watson-developer-cloud');
var retrieve_and_rank = watson.retrieve_and_rank({
    username: My_username,
    password: My_password,
    version: 'v1'
});

//List Solr Cluster     *****************************************************
retrieve_and_rank.listClusters({},
    function (err, response) {
        if (err)
            console.log('error:', err);
        else {
            console.log(response[0]);
            console.log(JSON.stringify(response, null, 2));
        }
  
    });
/*
//List Solr Configuration   *****************************************************
retrieve_and_rank.listConfigs({
    cluster_id: My_cluster_id
},
    function (err, response) {
        if (err)
            console.log('error:', err);
        else
            console.log(JSON.stringify(response, null, 2));
    });

//List Ranker ******************************************************
retrieve_and_rank.listRankers({},
    function (err, response) {
        if (err)
            console.log('error: ', err);
        else
            console.log(JSON.stringify(response, null, 2));
    });

 
// Check Ranker     *****************************************************
var params = {
    ranker_id: My_rank_id,
};

retrieve_and_rank.rankerStatus(params,
    function (err, response) {
        if (err)
            console.log('error:', err);
        else
            console.log(JSON.stringify(response, null, 2));
    });
*/