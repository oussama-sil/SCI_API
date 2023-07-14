var mysql = require('mysql2');



//! IMPORTING THE DATABASE AUTHENTIFICATION INFOS 
var DB_CONFIG = require('../config/database_config');


var DB_CONNECTION = mysql.createConnection(DB_CONFIG);

DB_CONNECTION.connect(function(err) {
    if (err) {
        console.log("Error while trying to connect to the database ");    
        throw err
    };
    console.log("Connected to the database ");
});


module.exports = DB_CONNECTION;