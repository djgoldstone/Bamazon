var mysql = require("mysql");
var inquirer = require("inquirer");
var chalk = require("chalk");
require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon_db"
});

connection.connect((err)=>{
    if (err) {
        console.log(err);
    }
    runProgram();
    //callback function that displays current inventory stored in database
});

function runProgram() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: chalk.greenBright("What would you like to do?"),
        choices: [
            "View products for sale",
            "View low inventory",
            "Add to inventory",
            "Add New product",
            "Exit"
        ]}).then(function(answer) {
        switch(answer.action) {
            case "View products for sale":
                inventory();
                break;
            case "View low inventory":
                break;
            case "Add to inventory":
                break;
            case "Add New product":
                break;
            case "Exit":
                    console.log(chalk.greenBright("----------------------"));
                    console.log(chalk.bold.greenBright("Thank you, come again!"));
                    console.log(chalk.greenBright("----------------------"));
                    connection.end();
                } 
    });
};

function inventory() {
    connection.query("SELECT * FROM products", (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.table(res);
            //npm package neatly displays response object from database as a readable table
        };
        runProgram();
    });
};

