var mysql = require("mysql");
require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon_db"
});
//login credentials to mysql database

connection.connect((err)=>{
    if (err) {
        console.log(err);
    }
    inventory();
    //callback function that displays current inventory stored in database
});


function inventory() {
    connection.query("SELECT * FROM products", (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.table(res);
            //npm package neatly displays response object from database as a readable table
        };
    });
};