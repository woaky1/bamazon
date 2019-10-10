-- Here we drop any bamazon db if there was one that existed before. Use this line with caution less you lose data you need!
DROP DATABASE IF EXISTS bamazon;

-- Now we create the bamazon database
CREATE DATABASE bamazon;

-- We tell mySQL to use the bamazon db in the commands that follow.
USE bamazon;

-- We create the table, products, to hold the data about our fictional wares.
CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(200) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(10) NOT NULL,
  PRIMARY KEY (item_id)
);

-- Speaking of fictional wares, let's put some into the db so we've got something to work with.
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nintendo Switch", "Electronics", 299.99, 100), ("Nintendo Switch Lite", "Electronics", 199.99, 100), ("Whole Wheat Bread", "Food", 3.50, 200), ("Player's Handbook", "Books", 49.95, 25), ("Pillow", "Household", 20.00, 40), ("Bagel Bites", "Food", 2.69, 50), ("Toothpaste", "Pharmacy", 3.50, 64), ("AA batteries (pack of 4)", "Household", 7.00, 87), ("Ladyhawke (DVD)", "Videos", 9.99, 15), ("Elmer's Glue", "Household", 3.99, 250);

-- This command will select all the data in the products table and show it to us in table format. Nice for checking if things are working as expected.
select * from products;