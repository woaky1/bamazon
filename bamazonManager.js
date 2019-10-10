// Again, we require the outside packages we need to make the program work.
var mysql = require("mysql");
var inquirer = require("inquirer");

// Set up the connection to the database.
var connection = mysql.createConnection({
    host     : 'localhost',
    port: 3306,
    user     : 'root',
    password : 'rootroot',
    database : 'bamazon'
  });
// Now we connect to the db.
connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    // Here we use inquirer to present the user with a list of options.
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
            // The switch will sent the user to the appropriate function depending on which choice they picked. 
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
            }
        });
  });

// This function will show the user what's in the store's db, it's id, price, and quantity.
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
// This function shows any items where stock is less than 5.
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

// This function lets the user add additional stock to an item that's already in the db.
function addInventory() {
    connection.query('SELECT * FROM products', function (error, results) {
        if (error) throw error;
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'itemID',
            message: "What's the Item ID you'd like to add stock to?",
            validate: function(value) {
                var pass = parseInt(value);
                if ((pass) && value <= results.length) {
                  return true;
                }
                return 'Please enter a valid item id number.';
            }
        },
        {
            type: 'input',
            name: 'addedStock',
            message: "How much should be added?",
            validate: function(value) {
                var pass = parseInt(value);
                if ((pass) && (pass > 0)) {
                  return true;
                }
          
                return 'Please enter a positive number.';
            }
        }
      ])
      .then(function (response) {
        var stockNum = parseInt(response.addedStock);
        var itemID = parseInt(response.itemID);
        connection.query(
            `UPDATE products SET stock_quantity = stock_quantity + ${stockNum} WHERE item_id = ${itemID}`, function (error, results) {
                if (error) throw error;
                console.log("Inventory Updated");
                connection.end();
            }
            )
      });
    })
}

// This function let's the user add a new item to the db.
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
            connection.query("INSERT INTO products SET ?",
            {
                product_name: response.productName,
                department_name: response.departmentName,
                price: priceFloat,
                stock_quantity: quantityInt
            },
            function(error, results) {
                if (error) throw (error);
                console.log("Your item was added.");
                connection.end();
            })
        })
}