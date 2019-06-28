# Bamazon

___

### Design

This node.js command line application utilized chalk and chalk animation to engage the user and provide color to the interface. Bright green was chosen because it reminded me of the computer terminal my grandparents had on the computer in their business circa the 90's.

### Logic

Bamazon makes use of MySQL in order to create a database called bamazon_db with a table of products. The table was populated columns corresponding to each item's unique id via auto-increment, product_name, department_name, price, and stock_quantity. The table was then populated with 10 mock data items using INSERT INTO with VALUES MySQL syntax. In bamazonCustomer.js I required mysql, inquirer, chalk, and console.table packages from npm. Then a connection was established to mysql database bamazon_db and assigned to variable connection. I declared a function which queries all from the products table and logs the result to the terminal in a readable table format using console.table. A function promptCustomer was declared that utilizes inquirer prompts to determine the item id and quantity the customer desires. 


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