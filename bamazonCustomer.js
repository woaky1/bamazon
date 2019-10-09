// Here we require the outside packages we need to make the program work.
var mysql = require("mysql");
var inquirer = require("inquirer");

// Now we set up the connection to our mySQL database.
var connection = mysql.createConnection({
    host     : 'localhost',
    port: 3306,
    user     : 'root',
    password : 'rootroot',
    database : 'bamazon'
  });


// Next, we connect to the database.
connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
  });

// Now we pose our first query to our db. We're going to get info from the products table so we can show what's available to purchase.
connection.query(
    "SELECT * FROM products", function (error, results) {
    if (error) throw error;
    // Now we display what's for sale in the console.
    for (var i = 0; i < results.length; i++) {
        console.log("Item ID: " + results[i].item_id + "\n" + results[i].product_name + "\n" + "$" + results[i].price)
        console.log("----------------------");
    }
    // We use these inquirer prompts to ask the user what they want and how many do they want.
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'whichItem',
          message: "What's the id for the item you'd like to buy?",
          // Built in some validation so that the user can put in an id tht doesn't exist.
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
          name: 'quantity',
          message: "How many would you like?",
          // More validation to make sure the user doesn't accidentally enter in letters, negative numbers, etc.
          validate: function(value) {
            var pass = parseInt(value);
            if ((pass) && (pass > 0)) {
              return true;
            }
      
            return 'Please enter a positive number.';
          }
        }])
      .then(function (response) {
        // While our item ids start with one, they were sent to us in an array, so to check against the right info, we need to refer to element that is one less than that number.
        var itemIndex = response.whichItem - 1;
          // Now we check to see if the amount requested is less than or equal to the amount in stock. If so, we delete the amount from the stock on the db, then tell the user their sale went through and show them a total cost for their purchase.
          if (response.quantity <= results[itemIndex].stock_quantity) {
            var newQuantity = results[itemIndex].stock_quantity - parseInt(response.quantity);
            connection.query(
              "UPDATE products SET ? WHERE ?", 
              [
                {
                stock_quantity: newQuantity
              },
              {
                item_id: response.whichItem
              }
              ],
              function (error) {
                if (error) throw error;
                console.log("Your order is on it's way!");
                console.log("Total cost of purchase: $" + (results[itemIndex].price * response.quantity))
              }
              // If there isn't enough stock to meet the user's request, we tell them so.
            )} else {
              console.log("Insufficient quantity!");
            }
            // Now we end the connection to the db.
          connection.end();
      });
  });
