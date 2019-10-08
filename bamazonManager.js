var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host     : 'localhost',
    port: 3306,
    user     : 'root',
    password : 'rootroot',
    database : 'bamazon'
  });
   
connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected as id ' + connection.threadId);
    inquirer
        .prompt([
        {
            type: "list",
            name: "choice",
            message: "Welcome, manager. What would you like to do?",
            choices: [
                "View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product"
            ]
        }
        ])
        .then(function (response) {
            console.log(response.choice);
            
            switch (response.choice) {
                case "View Products for Sale":
                    productsForSale();
                    break;
                case "View Low Inventory":
                    lowInventory();
                    break;
                case "Add to Inventory":
                    addInventory();
                    break;
                case "Add New Product":
                    addProduct();
                    break;
                default:
                    break;
            }
        });
  });


function productsForSale(){
    connection.query('SELECT * FROM products', function (error, results) {
        if (error) throw error;
        for (var i = 0; i < results.length; i++) {
            console.log(`Item ID: ${results[i].item_id}\nProduct Name: ${results[i].product_name}\nPrice: ${results[i].price}\nQuantity: ${results[i].stock_quantity}`);
            console.log("--------------------------");
        }
        connection.end();
      });
}

function lowInventory() {
    connection.query("SELECT * from products WHERE stock_quantity < 5", function(error, results) {
        if (error) throw error;
        for (var j = 0; j < results.length; j++) {
            console.log(`Item ID: ${results[j].item_id}\nProduct Name: ${results[j].product_name}\nPrice: ${results[j].price}\nQuantity: ${results[j].stock_quantity}`);
            console.log("--------------------------");
        }
        connection.end();
    })
}

function addInventory() {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'itemID',
            message: "What's the Item ID you'd like to add stock to?"
          },
          {
            type: 'input',
            name: 'addedStock',
            message: "How much should be added?"
          }
      ])
      .then(function (response) {
        var stockNum = parseInt(response.addedStock);
        var itemID = parseInt(response.itemID);
        console.log("stockNum: " + stockNum + ", itemID: " + itemID);
        connection.query(
            `UPDATE products SET stock_quantity = stock_quantity + ${stockNum} WHERE item_id = ${itemID}`, function (error, results) {
                if (error) throw error;
                console.log(results.message);
                console.log("Inventory Updated");
                connection.end();
            }
            )
      });
}

function addProduct() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "productName",
                message: "What is the new item called?"
            },
            {
                type: "input",
                name: "departmentName",
                message: "What department does the item belong to?"
            },
            {
                type: "input",
                name: "price",
                message: "How much does the item cost?"
            },
            {
                type: "input",
                name: "quantity",
                message: "How much of the item is in stock?"
            }
        ])
        .then(function(response) {
            var priceFloat = parseFloat(response.price);
            var quantityInt = parseInt(response.quantity);
            // console.log(response);
            connection.query("INSERT INTO products SET ?",
            {
                product_name: response.productName,
                department_name: response.departmentName,
                price: priceFloat,
                stock_quantity: quantityInt
            },
            function(error, results) {
                if (error) throw (error);
                console.log(results);
                console.log("Your item was added");
                connection.end();
            })
        })
}