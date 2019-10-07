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
  });
   
connection.query(
    "SELECT * FROM products", function (error, results) {
    if (error) throw error;
    for (var i = 0; i < results.length; i++) {
        console.log("Item ID: " + results[i].item_id + "\n" + results[i].product_name + "\n" + "$" + results[i].price)
        console.log("----------------------");
    }
    connection.end();
  });

  inquirer
  .prompt([
    {
      type: 'input',
      name: 'whichItem',
      message: "What's the id for the item you'd like to buy?",
    },
    {
      type: 'input',
      name: 'quantity',
      message: "How many would you like?"
    }
  ])
  .then(function (response) {
    console.log(response.whichItem + "\n" + response.quantity);
  }
    // Use user feedback for... whatever!!
  );