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
                lowInventory();
                break;
            case "Add to inventory":
                restock();
                break;
            case "Add New product":
                newProduct();
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

function lowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, res) {
        if (err) {
            console.log(err);
        } else {
            console.table(res);
        };
        runProgram();
    });
};

function restock() {
    inquirer.prompt([
        {
            name: "ID",
            type: "input",
            message: "Which item_id would you like to restock?"
        },
        {
            name: "Quantity",
            type: "input",
            message: "How many would you like to add to stock_quantity?"
        }
    ]).then(function(answer) {
        var quantity = answer.Quantity;
        var itemID = answer.ID;
        addInventory(itemID, quantity);
    });
};

function addInventory(id, amount) {
    connection.query("SELECT * FROM products WHERE item_id = " + id, function(err, res) {
        if (err) {
            console.log(err);
        } else {
            connection.query("UPDATE products SET stock_quantity = stock_quantity + ? WHERE item_id = ?", [amount, id]);
            console.log(chalk.greenBright("-----------------------------------------"));
            console.log(chalk.bold.greenBright("You added " + amount + " units to item_id " + id));
            console.log(chalk.greenBright("-----------------------------------------"));
            inventory();
        }
    });
};

function newProduct() {
    inquirer.prompt([
        {
            name: "Name",
            type: "input",
            message: "What is the name of the new product?"
        },
        {
            name: "Category",
            type: "input",
            message: "What is the category of the new product?"
        },
        {
            name: "Price",
            type: "input",
            message: "What is the price of the new product?"
        },
        {
            name: "Quantity",
            type: "input",
            message: "What is the quantity?"
        }
    ]).then(function(answer) {
        var name = answer.Name;
        var category = answer.Category;
        var price = answer.Price;
        var quantity = answer.Quantity;
        addNewProduct(name,category,price,quantity);
    });
};

function addNewProduct(name,category,price,quantity) {
    connection.query("INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES(?,?,?,?);", [name, category, price, quantity]);
    console.log(chalk.greenBright("---------------"));
    console.log(chalk.bold.greenBright("New item added!"));
    console.log(chalk.greenBright("---------------"));
    inventory();
};