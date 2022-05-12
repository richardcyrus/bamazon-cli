/**
 * bamazonCustomer
 *
 * The Coding Boot Camp at UNC Charlotte.
 * (c) 2018 Richard Cyrus <richard.cyrus@rcyrus.com>
 */

const Table = require('easy-table');
const figlet = require('figlet');
const inquirer = require('inquirer');

const { pool, fconfig } = require('./config');

/**
 * Display the items that are available for sale.
 */
function displayProducts() {
  const query = [
    'SELECT item_id,',
    'product_name,',
    'price,' + 'stock_quantity',
    'FROM products',
    'WHERE stock_quantity > 0',
  ].join(' ');

  pool.query(query, function (error, results) {
    if (error) throw error;

    const products = results.map((product) => {
      return {
        id: product.item_id,
        qty: product.stock_quantity,
        price: product.price,
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
    console.log(figlet.textSync('Bamazon Customer', fconfig));
    console.log('\nProduct List\n');
    console.log(t.toString());

    whatToPurchase(products);
  });
}

/**
 * Provide the purchase workflow for the customer.
 *
 * @param products A subset of the product attributes from the
 *                  displayProducts() call.
 */
function whatToPurchase(products) {
  const updateStmt = [
    'UPDATE products',
    'SET stock_quantity = stock_quantity - ?,',
    'product_sales = product_sales + ?',
    'WHERE item_id = ?',
  ].join(' ');

  const ask = 'Enter the Id of the item you wish to purchase: [Quit with Q]';

  inquirer
    .prompt([
      {
        type: 'input',
        name: 'itemId',
        message: ask,
        validate: function (input) {
          const found = products.find(function (product) {
            return parseInt(input) === product.id;
          });

          if (input.toUpperCase() === 'Q' || found !== undefined) {
            return true;
          } else {
            return [
              'You have entered an invalid product Id.',
              'Try again.',
            ].join(' ');
          }
        },
      },
    ])
    .then((answers) => {
      if (answers.itemId.toUpperCase() === 'Q') {
        console.log('Goodbye!');
        pool.end();
        process.exit();
      }

      const itemId = parseInt(answers.itemId);

      const product = products.find((item) => {
        return itemId === item.id;
      });

      inquirer
        .prompt([
          {
            type: 'input',
            name: 'quantity',
            message: 'How many would you like? [Quit with Q]',
            validate: function (input) {
              if (
                input.toUpperCase() === 'Q' ||
                parseInt(input) <= product.qty
              ) {
                return true;
              } else {
                return [
                  'Your requested quantity is greater',
                  'than the stock',
                  `level (${product.qty}). Try again.`,
                ].join(' ');
              }
            },
          },
        ])
        .then((answers) => {
          if (answers.quantity.toUpperCase() === 'Q') {
            console.log('Goodbye!');
            pool.end();
            process.exit();
          }
          const quantity = parseInt(answers.quantity);
          const productSales = quantity * product.price;

          const total = productSales.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          });

          pool.query(
            updateStmt,
            [quantity, productSales, itemId],
            function (error) {
              if (error) throw error;

              console.log('\nThank you for your purchase!');
              console.log(`Your total is: ${total}`);
              action();
            }
          );
        });
    });
}

/**
 * Determine the next steps after the customer has completed a purchase.
 */
function action() {
  console.log('\n');
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'redirect',
        message: 'What would you like to do?',
        choices: [
          { name: 'Make another purchase', value: 'purchase' },
          { name: 'Exit', value: 'exit' },
        ],
      },
    ])
    .then((answer) => {
      switch (answer.redirect) {
        case 'purchase':
          displayProducts();
          break;
        case 'exit':
          pool.end();
          process.exit();
      }
    });
}

// Start the application interaction.
displayProducts();
