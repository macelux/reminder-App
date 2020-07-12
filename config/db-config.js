'use strict';
const mysql = require('mysql')

class mysqlConnection {

    constructor() {
        this.connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "electronapp"
        });

        this.connection.connect(function(err) {
            if (err) throw err
        })
    }

    insert(sqlQuery) {
        //
        // connection.connect(function(err){
        //     if(err) throw err;
        //     console.log("connected")
        //     var sql = "INSERT INTO customers (name, address) VALUES ('kkdsda','asldkajsd')"; // sql statement
        //     // run the the query
        //     this.connection.query(sql,  function(err, result){ 
        //         if(err) throw err;
        //         //console.log('record inserted')
        //     })
        // });

        var sql = "INSERT INTO customers (name, address) VALUES ('kkdsda','asldkajsd')"; // sql statement
        // run the the query
        this.connection.query(sqlQuery, function(err, result) {
            if (err) throw err;
            //console.log('record inserted')
        })
    }

    fetch(sqlQuery, callback) {

        var connection = this.connection; /// get connection

        // run the the query
        connection.query(sqlQuery, function(err, result, fields) {
            if (err) throw err;
            console.log(result)
            return callback(result)
        })
    }
};

module.exports.mysqlConnection = mysqlConnection;