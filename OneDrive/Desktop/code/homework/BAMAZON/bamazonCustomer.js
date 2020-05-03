var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    port: 3306,
    user: 'root',
    password: '',
    database: 'bamazon'
});

connection.connect(function(err) {
    if(err) throw err;
    start();
});

function validateInputs(value) {
    var int = Number.isInteger(parseFloat(value));
    var sign = Math.sign(value);
    if (int && (sign ===1)) {
        return true;
    } else {
        return 'Please enter a number';
    }
}



function start() {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'item_id',
            message: 'Enter the Id number of the product you will like to purchase',
            validate: validateInputs,
            filter: Number
        },
        {
            type: 'input',
            name: 'stock_quantity',
            message: 'How many would you like to purchase',
            validate: validateInputs,
            filter: Number
        }
    ])
    .then(function(input) {
        var itemId = input.item_id;
        var stockQuantity = input.stock_quantity;
        var queryString = 'SELECT * FROM products WHERE ?';

        connection.query(queryString, {item_id: itemId}, function(err, data) {
            if (err) throw err;
            if (data.length === 0) {
                console.log('ERROR: Please enter a valid ID number' + err);
                displayTable();
            } else {
                var productData = data[0];

                if (stockQuantity <= productData.stock_quantity) {
                    console.log('The product was successfully purchased!');

                    var updateQueryString = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - stockQuantity) + 
                    'WHERE item_id = ' + itemId;

                    connection.query(updateQueryString, function(err, data) {
                        if (err) throw err;

                        console.log('Your order has been placed successfully! Your total is $' + productData.price * stockQuantity);
                        console.log('Thanks you');
                        console.log("\n---------------------------------------------------\n");

                        connection.end();
                    })
                }
                else {
                    console.log('Sorry, there is not enough products in stock');
                    console.log('Please try again');
                    console.log('\n--------------------------------------------------------\n')

                    displayTable();
                }
            }
        })
    })
}

function displayTable() {
    queryString = 'SELECT * FROM products';

    connection.query(queryString, function(err, data) {
        if (err) throw err;

        console.log('Existing Products: ');
        console.log('-------------------\n');

        var str = '';
        for (var i = 0; i < data.length; i++) {
            str = '';
            str += 'Item Id: ' + data[i].item_id + ' // ';
            str += 'Product Name: ' + data[i].product_name + ' // ';
            str += 'Department: ' + data[i].department_name + ' // ';
            str += 'Price: ' + data[i].price + '\n';

            console.log(str);
        }

        console.log('----------------------------\n');

        start();
    })
}

function run() {

    displayTable();
}

run();
