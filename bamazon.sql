DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
item_id INTEGER(50) AUTO_INCREMENT NOT NULL, 
product_name VARCHAR(50) NOT NULL,
department_name VARCHAR(30) NOT NULL,
price DECIMAL(10,2) NOT NULL,
stock_quantity INTEGER (50) NOT NULL,
PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("42"" Flat Screen TV", "Electronics", 450.00, 10),
("Golden State Warriors Jersey", "Sports Apparel", 125.95, 20),
("12 pack toiler paper", "Home Goods", 29.99, 100),
("Playstation 4", "Electronics", 299.99, 10),
("Slaughterhouse 5 by Kurt Vonnegut", "Books", 12.99, 20),
("Men's T-shirt", "Clothing", 19.99, 50), 
("Nike VaporMax", "Shoes", 219.99, 18),
("50 lb. bag of Lucky Charms marshmallows", "Food", 35.00, 10),
("Instant Pot pressure cooker", "Kitchenware", 175.00, 20),
("Amazon Echo Dot", "Electronics", 99.99, 1000);
