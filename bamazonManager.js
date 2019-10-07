var mysql = require("mysql");
var inquirer = require("inquirer");

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