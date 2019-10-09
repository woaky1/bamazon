DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(200) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(10) NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nintendo Switch", "Electronics", 299.99, 100), ("Nintendo Switch Lite", "Electronics", 199.99, 100), ("Whole Wheat Bread", "Food", 3.50, 200), ("Player's Handbook", "Books", 49.95, 25), ("Pillow", "Household", 20.00, 40), ("Bagel Bites", "Food", 2.69, 50), ("Toothpaste", "Pharmacy", 3.50, 64), ("AA batteries (pack of 4)", "Household", 7.00, 87), ("Ladyhawke (DVD)", "Videos", 9.99, 15), ("Elmer's Glue", "Household", 3.99, 250);

select * from products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Jellycakes", "Food", 4.99, 0);

CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(100) NOT NULL,
  over_head_cost DECIMAL (10,2) NOT NULL,
  PRIMARY KEY (department_id)
);

ALTER TABLE products
ADD product_sales DECIMAL(10,2) NOT NULL;

SELECT department_name, SUM(product_sales) FROM products GROUP BY department_name;
SELECT products.department_name, products.product_sales, departments.department_name, departments.department_id, departments.over_head_cost FROM departments LEFT JOIN products ON products.department_name = departments.department_name;

INSERT INTO departments (department_name, over_head_cost)
VALUES ("Electronics", 10000.00), ("Food", 5000.00), ("Books", 1000.00), ("Household", 20000.00), ("Pharmacy", 5000.00), ("Videos", 1000.00);