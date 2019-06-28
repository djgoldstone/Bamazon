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
        // promptCustomer();
        runProgram();
    });
};

function runProgram() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: chalk.greenBright("Welcome to Bamazon how can we help you?"),
        choices: [
            "Make a purchase",
            "Exit"
        ]}).then(function(answer) {
        if(answer.action === "Make a purchase") {
            promptCustomer();
        } else if (answer.action === "Exit") {
            console.log(chalk.greenBright("----------------------"));
            console.log(chalk.bold.greenBright("Thank you, come again!"));
            console.log(chalk.greenBright("----------------------"));
            connection.end();
        }
    });
};

function promptCustomer() {
    inquirer.prompt([
        {
            type: "input",
            name: "item_id",
            message: "Please select the item id of the item you would like to purchase: ",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        },
        {
            type: "input",
            name: "quantity",
            message: "How many would you like to purchase?",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
    ]).then(function(data){
        // console.log(data.item_id, data.quantity);
        if (data.item_id <= 11 && data.item_id > 0) {
            fulfillPurchase(data.item_id, data.quantity);
        } else {
            console.log(chalk.greenBright("----------------------------------------------"));
            console.log(chalk.greenBright("That item id does not exist, please try again!"));
            console.log(chalk.greenBright("----------------------------------------------"));
            runProgram();
        }
    });
};

// function fulfillPurchase(id, amount) {
//     connection.query("UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?", 
//     [amount,id],
//     (err) => {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log(chalk.greenBright("--------------------"));
//             console.log(chalk.greenBright("Purchase Successful!"));
//             console.log(chalk.greenBright("--------------------"));
//             inventory();
//         } 
//     });
// };

function fulfillPurchase(id, amount) {
    connection.query("SELECT * FROM products WHERE item_id = " + id, function(err,res){
        if (err){
            console.log(err);
        }
        if (amount <= res[0].stock_quantity) {
            console.log(chalk.greenBright("--------------------"));
            console.log(chalk.bold.greenBright("Purchase Successful!"));
            console.log(chalk.greenBright("--------------------"));
            var customerCost = (res[0].price * amount).toFixed(2);
            console.log(chalk.greenBright("--------------------------------------------------------------------------------------------------"));
            console.log(chalk.bold.greenBright("Your total cost for " + amount + " " + res[0].product_name + " is $" + customerCost + ", thank you!"));
            console.log(chalk.greenBright("--------------------------------------------------------------------------------------------------"));

            connection.query("UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?", [amount, id]);
            inventory();
        } else {
            console.log(chalk.greenBright("-------------------------------------"));
            console.log(chalk.bold.greenBright("Insufficient stock, please try again!"));
            console.log(chalk.greenBright("-------------------------------------"));
            inventory();
        }
    });
};