# Bamazon

___

### Design

This node.js command line application utilized chalk and chalk animation to engage the user and provide color to the interface. Bright green was chosen because it reminded me of the computer terminal my grandparents had on the computer in their business circa the 90's.

### Logic

Bamazon makes use of MySQL in order to create a database called bamazon_db with a table of products. The table was populated columns corresponding to each item's unique id via auto-increment, product_name, department_name, price, and stock_quantity. The table was then populated with 10 mock data items using INSERT INTO with VALUES MySQL syntax. In bamazonCustomer.js I required mysql, inquirer, chalk, and console.table packages from npm. Then a connection was established to mysql database bamazon_db and assigned to variable connection. I declared a function inventory which queries all from the products table and logs the result to the terminal in a readable table format using console.table. A function runProgram was declared that utilizes inquirer prompts to determine if the customer wants to make a purchase or exit the application. If exit is selected, the connection is severed using connection.end(). If "Make a purchase is chosen", the callback function promptCustomer called. PromptCustomer uses inquirer to obtain the item id and quantity the customer desires to purchase and uses the built-in validation feature to ensure an integer is entered. Then a condition statement checks in the data.item_id is within the range of the products table and provides the data.item_id and data.quantity as arguments to the fulfillPurchase callback function. Otherwise the runProgram prompt will be called again and the customer will be informed that the item id does not exist and to please try again. Next, the fulfillPurchse function takes two arguments, id and amount and queries the bamazon_db database by selecting all productss where item_id = the provided id. If the id is within the query result's item_id.length + 1 and the amount is less than or equal to the stock_quantity, the customer will be notified that their purchase was successful via console.log and provided with a total cost for their purchase. The stock quantity is then updated with another query into the database updating the products table to set the stock_quantity to subtract the given amount at the provided item_id and calling inventory once more. Otherwise, the customer will be notified that there is insufficient stock for their purchase and inventory is called once more.

Bamazonmanager.js functions quite similarly to bamazonCustomer.js. When the connection to the database is established, runProgram is run. RunProgram uses inquierer to prompt the manager for one of 5 options: View products for sale, View low inventory, Add to inventory, Add New product, or Exit. The answer is then stored as answer.action and run through a switch statement based on the prompt choices. If View products for sale is selected, the inventory function is called which simply displays all table data from the products table. Else if View low inventory is chosen, the database is queried by selecting all products where the stock_quantity is less than 5 and displaying the results via console.table then calling runProgram to display the menu prompt choices again. If Add to inventory is chosen, the restock function is called which prompts the manager for an item_id and quantity, then stores the answers in corresponding variables which are subsequently provided as arugments to the callback function addInventory. AddInventory takes two arguments, id and amount, then queries the database by selecting all from the products table where the item_id equals the the argument id. If no errors are triggered, the database is queried to update the products table by setting the stock_quantity to equal the stock_quantity + the amount arugment where the item_id equals the argument id. The manager is then informed of the restock data via console.log and inventory is called. If Add new product is chosen, the newProduct function is called which prompts the manager for a new product name, category, price, and quantity. The answers are then stored in variables corresponding to each and provided as arguments to the callback function addNewProduct. AddNewProduct takes 4 arguments, name, category, price, and quantity then queries the database to insert into the products table new values corresponding to the argument variables. The manager is then notified that a new item has been added and inventory prompts with the updated table are called.


## Built With

___

* [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)
* [Node.js](https://nodejs.org/en/docs/)
* [MySQL](https://dev.mysql.com/doc/)
* [console.table](https://www.npmjs.com/package/console.table)
* [chalk](https://www.npmjs.com/package/chalk)
* [inquirer](https://www.npmjs.com/package/inquirer)

![Graph](images/graph.png)
___

![Bamazon screenshot](images/xxx-screenshot.png)



___

## Authors

* Derek Goldstone - [UC Berkeley Extension](https://www.linkedin.com/in/derek-goldstone-482884a3/)

___