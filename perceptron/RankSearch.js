function watson_score(My_question, socket){
	var parameters = require('../train_watson/Parameters');
	var watson  = require('watson-developer-cloud');
	var retrieve_and_rank = watson.retrieve_and_rank({
	  username: parameters.MyUsername,
	  password: parameters.MyPassword,
	  version: 'v1'
	});
	
	var params = {
	  cluster_id: parameters.My_cluster_id,
	  collection_name: parameters.My_collection_name
	};
	//  Use a querystring parser to encode output.
	var qs = require('querystring');
	
	// Get a Solr client for indexing and searching documents.
	// See https://github.com/watson-developer-cloud/node-sdk/blob/master/services/retrieve_and_rank/v1.js
	solrClient = retrieve_and_rank.createSolrClient(params);
	
	var query = qs.stringify({q: My_question, ranker_id: parameters.My_ranker_id, fl: 'patent_no,title,author,abstract,ranker.confidence'});	
	
	solrClient.get('fcselect', query, function(err, searchResponse) {
	  if(err) {
	    console.log('Error searching for documents: ' + err);
	  }
	  else {
	    var search_results = [];   
	   
	    var Perceptron_Score = require('./PerceptronScore');
	    var confidences = [];
	    for(var i=0; i<searchResponse.response.docs.length; i++) {
	    	confidences[i] = searchResponse.response.docs[i]["ranker.confidence"];
	    	search_results[i] = (i+1) + '. ' + searchResponse.response.docs[i]["patent_no"] + ": " + searchResponse.response.docs[i]["title"] + "<br>" + "Iventor: " + searchResponse.response.docs[i]["author"] + '<br>' + "Abstract: " + searchResponse.response.docs[i]["abstract"];
	    }
	    var score = Perceptron_Score.score(confidences);
	    
	    socket.emit('result', {result: search_results, grade: score});
	    
	  }
	});
}
exports.watson_score = watson_score;
