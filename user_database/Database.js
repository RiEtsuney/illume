/**
 * http://usejsdoc.org/
 */

function createConnection(){
	var mysql      = require('mysql');
	return mysql.createConnection({
		  host     : 'localhost',
		  user     : 'root',
		  password : 'illume_password',
		  database : 'illume'
		});
}

function Query(username, password, socket){
	
	var connection = createConnection();
	connection.connect();
	var sql = "select AES_DECRYPT(password, 'key') as origin_password from user_account where username = " + "'" + username + "'";
	
	connection.query(sql, function(err, rows, fields) {
		  if (err) throw err;
		 
		  if(rows[0] == null){
			  socket.emit('login_result', {result: 'non-exist'});
			  console.log('No existing account!');
		  }
		  else{
			  if(rows[0].origin_password == password){
				  socket.emit('login_result', {result: 'pass'});
				  console.log('Account match!');
			  }
			  else{
				  socket.emit('login_result', {result: 'wrong'});
				  console.log('Wrong password!');
			  }
		  }
		});
	connection.end();
}

function Insert(username, password, account_type, socket){
	 
	var connection = createConnection();
	connection.connect();
	
	var sql = "insert into user_account (username, password, account_type) values(" + "'" + username + "', " + "AES_ENCRYPT(" + "'" + password + "', 'key'), " + account_type + ")";
	connection.query(sql, function(err,res) {
		  if (err) {
			  throw err;
		  }
		  else{
			  socket.emit('sign_up_result', {result: 'success'});
			  console.log("Successfully create an account!");
		  }
		});
	connection.end();
}


exports.Query = Query;
exports.Insert = Insert;