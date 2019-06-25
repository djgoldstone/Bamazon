DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
item_id INTEGER(11) AUTO_INCREMENT NOT NULL, 
product_name VARCHAR(30) NOT NULL,
department_name VARCHAR(30) NOT NULL,
price DECIMAL(10,2) NOT NULL,
stock_quantity INTEGER (50) NOT NULL,
PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("42"" Flat Screen TV", "Electronics", 450.00, 10);