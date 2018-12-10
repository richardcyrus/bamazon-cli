/**
 * bamazonCustomer
 *
 * The Coding Boot Camp at UNC Charlotte.
 * (c) 2018 Richard Cyrus <richard.cyrus@rcyrus.com>
 */

const { pool } = require('./database');
const inquirer = require('inquirer');
const Table = require('easy-table');

/**
 * Display the items that are available for sale.
 *
 * @param conn The database pool or connection object.
 */
function displayProducts(conn) {
    const query = [
        'SELECT item_id,',
        'product_name,',
        'price,' +
        'stock_quantity',
        'FROM products',
        'WHERE stock_quantity > 0'
    ].join(' ');

    conn.query(query, function(error, results) {
        if (error) throw error;

        const products = results.map((product) => {
            return {
                id: product.item_id,
                qty: product.stock_quantity,
                price: product.price
            };
        });

        const t = new Table();
        results.forEach((product) => {
            t.cell('Id', product.item_id);
            t.cell('Product', product.product_name);
            t.cell('Price', product.price, Table.number(2));
            // t.cell('Stock', product.stock_quantity);
            t.newRow();
        });

        console.clear();
        console.log('\nProduct List\n');
        console.log(t.toString());

        whatToPurchase(products, conn);
    });
}

/**
 * Provide the purchase workflow for the customer.
 *
 * @param products A subset of the product attributes from the
 *                  displayProducts() call.
 * @param conn The database pool or connection object.
 */
function whatToPurchase(products, conn) {
    const updateStmt = [
        'UPDATE products',
        'SET stock_quantity = stock_quantity - ?',
        'WHERE item_id = ?'
    ].join(' ');

    inquirer
        .prompt([
            {
                type: 'input',
                name: 'itemId',
                message: 'Enter the Id of the item you wish to purchase:',
                validate: function(input) {
                    const found = products.find(function(product) {
                        return parseInt(input) === product.id;
                    });

                    if (found !== undefined) {
                        return true;
                    } else {
                        return [
                            'You have entered an invalid product Id.' +
                            'Try again.',
                        ].join(' ');
                    }
                }
            },
            {
                type: 'input',
                name: 'quantity',
                message: 'How many do you wish to purchase?',
                validate: function(input, answers) {
                    const found = products.find((product) => {
                        return parseInt(answers.itemId) === product.id;
                    });

                    if (found !== undefined && parseInt(input) <= found.qty) {
                        return true;
                    } else {
                        return [
                            'Your requested quantity is greater than the stock',
                            `level (${found.qty}). Try again.`].join(' ');
                    }
                }
            }
        ])
        .then((answers) => {
            const itemId = parseInt(answers.itemId);
            const quantity = parseInt(answers.quantity);

            const item = products.find((product) => {
                return itemId === product.id;
            });

            const total = (quantity * item.price)
                .toLocaleString(
                    'en-US',
                    { style: 'currency', currency: 'USD' }
                );

            conn.query(updateStmt, [quantity, itemId], function(error) {
                if (error) throw error;

                console.log('\nThank you for your purchase!');
                console.log(`Your total is: ${total}`);
                action(conn);
            });
        });
}

/**
 * Determine the next steps after the customer has completed a purchase.
 *
 * @param conn The database pool or connection object.
 */
function action(conn) {
    console.log('\n');
    inquirer
        .prompt([{
            type: 'list',
            name: 'redirect',
            message: 'What would you like to do?',
            choices: [
                { name: 'Make another purchase', value: 'purchase' },
                { name: 'Exit', value: 'exit' }
            ]
        }])
        .then((answer) => {
            switch (answer.redirect) {
                case 'purchase':
                    displayProducts(conn);
                    break;
                case 'exit':
                    conn.end();
                    break;
            }
        });
}

// Start the application interaction.
displayProducts(pool);
