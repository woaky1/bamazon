var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("table");

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
    type: 'list',
    name: 'action',
    message: 'What do you want to do?',
    choices: [
      'View Product Sales by Department',
      'Create New Department'
    ]
  }
]) .then(function (response){
    console.log(response.action);
    if(response.action === 'View Product Sales by Department') {
      console.log("Picked View Sales");
      
      productSales();
    } else {
      // createNewDepartment();
      console.log("Picked New Dept.");
      
    }
    connection.end();
  })
});

function productSales() {
  connection.query()
}
