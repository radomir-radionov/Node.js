const mysql      = require('mysql');

console.log('hello')
const connection = mysql.createConnection({
  host     : 'database',
  user     : 'root',
  password : 'example',
  port: 3306
});
 
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection);
});