/*************** search page server ************/
var search_page = require('http').createServer(handler),  
    io = require('socket.io').listen(search_page),  
    fs = require('fs');  

//start HTTP service，port: 3000  
search_page.listen(3000, function(){  
    console.log('listening on *:3000');  
});  

  
function handler (req, res) {  
  
    fs.readFile(__dirname + './web_pages/demo.html',  
        function (err, data) {  
            if (err) {  
                res.writeHead(500);  
                return res.end('Error loading demo.html');  
            }  
  
            res.writeHead(200);  
            res.end(data);  
        });  
}  

//connection event 
io.sockets.on('connection', function (socket) {  
	
	socket.on('query', function (data) {
		var RankSearch = require('./perceptron/RankSearch');
		RankSearch.watson_score(data.query, socket);} 
		);
	});  
/**********************************************/

/****************** login page **********************/ 

var login_page = require('http').createServer(handler2);
var io2 = require('socket.io').listen(login_page);  

//start HTTP service，port: 8080  
login_page.listen(8080, function(){  
console.log('listening on *:8080');  
});  


function handler2 (req, res) {  

fs.readFile(__dirname + './web_pages/sign_in.html',  
    function (err, data) {  
        if (err) {  
            res.writeHead(500);  
            return res.end('Error loading sign_in.html');  
        }  

        res.writeHead(200);  
        res.end(data);  
    });  
}  

//connection event
io2.sockets.on('connection', function (socket) {  

	socket.on('login', function (data) {
		var database = require('./user_database/Database');
		database.Query(data.Username, data.Password, socket);} 
		);
	});

/**********************************************/

/****************** register page **********************/

var sign_up_page = require('http').createServer(handler3);
var io3 = require('socket.io').listen(sign_up_page);  

//start HTTP service，port: 9090  
sign_up_page.listen(9090, function(){  
console.log('listening on *:9090');  
});  


function handler3 (req, res) {  

fs.readFile(__dirname + './web_pages/sign_up.html',  
    function (err, data) {  
        if (err) {  
            res.writeHead(500);  
            return res.end('Error loading sign_up.html');  
        }  

        res.writeHead(200);  
        res.end(data);  
    });  
}  

//connection event 
io3.sockets.on('connection', function (socket) {  

	var database = require('./user_database/Database');
	socket.on('sign_up', function (data) {
		database.Query(data.Username, data.Password, socket);} 
		);
	socket.on('sign_up_2', function (data) {
		var account_type = 0;
		database.Insert(data.Username, data.Password, account_type, socket);} 
		);
	}); 
