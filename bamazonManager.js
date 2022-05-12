/**
 * bamazonManager
 *
 * The Coding Boot Camp at UNC Charlotte.
 * (c) 2018 Richard Cyrus <richard.cyrus@rcyrus.com>
 */

const Table = require('easy-table');
const figlet = require('figlet');
const inquirer = require('inquirer');

const { pool, fconfig } = require('./config');

/**
 * Show the primary menu for the application.
 */
function displayMenu() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'manager',
        message: 'Please choose an action.',
        choices: [
          { name: 'View Products for Sale', value: 'viewSale' },
          { name: 'View Low Inventory', value: 'viewLowStock' },
          { name: 'Manage Stock Levels', value: 'modifyStock' },
          { name: 'Add New Product', value: 'addProduct' },
          { name: 'Exit', value: 'exit' },
        ],
      },
    ])
    .then((answers) => {
      switch (answers.manager) {
        case 'viewSale':
          viewInventory();
          break;
        case 'viewLowStock':
          viewLowStock();
          break;
        case 'modifyStock':
          modifyStock();
          break;
        case 'addProduct':
          addProduct();
          break;
        case 'exit':
          pool.end();
          process.exit();
      }
    });
}

/**
 * Display the products table.
 *
 * @param products
 * @param title
 */
function showProductsTable(products, title) {
  const t = new Table();
  products.forEach((item) => {
    t.cell('Id', item.id);
    t.cell('Product', item.product);
    t.cell('Department', item.department);
    t.cell('Stock', item.quantity);
    t.cell('Price', item.price, Table.number(2));
    t.newRow();
  });

  console.clear();
  console.log(figlet.textSync('Bamazon Manager', fconfig));
  console.log(`\n${title}\n`);
  console.log(t.toString());
}

/**
 * Get the products data from the database and take action based on the
 * input parameters or lack thereof.
 *
 * @param command
 * @param action
 */
function viewInventory(command, action) {
  const query = [
    'SELECT p.item_id AS id,',
    'p.product_name AS product,',
    'd.department_name AS department,',
    'p.price,' + 'p.stock_quantity AS quantity',
    'FROM products p',
    'JOIN departments AS d ON p.department_id = d.department_id',
    'ORDER BY p.item_id',
  ].join(' ');

  pool.query(query, function (error, results) {
    if (error) throw error;

    if (command === 'manageInventory') {
      return action(results);
    } else if (command === 'updated' || command === 'add') {
      showProductsTable(results, action);
      displayMenu();
    } else {
      showProductsTable(results, 'All Products');
      displayMenu();
    }
  });
}

/**
 * Get items that have a stock count less than 5.
 */
function viewLowStock() {
  const query = [
    'SELECT p.item_id AS id,',
    'p.product_name AS product,',
    'd.department_name AS department,',
    'p.price,' + 'p.stock_quantity AS quantity',
    'FROM products p',
    'JOIN departments AS d ON p.department_id = d.department_id',
    'WHERE p.stock_quantity < 5',
  ].join(' ');

  pool.query(query, function (error, results) {
    if (error) throw error;

    showProductsTable(results, 'Products Low in Stock');
    displayMenu();
  });
}

/**
 * Provide the ability to modify the stock levels for all products.
 *
 * @param products
 */
function modifyStock(products) {
  const updateStmt = [
    'UPDATE products',
    'SET stock_quantity = ?',
    'WHERE item_id = ?',
  ].join(' ');

  if (products) {
    showProductsTable(products, 'Manage Stock Levels');

    inquirer
      .prompt([
        {
          type: 'input',
          name: 'itemId',
          message: 'Enter the Id of the item to modify:',
          validate: function (input) {
            const found = products.find(function (product) {
              return parseInt(input) === product.id;
            });

            if (found !== undefined) {
              return true;
            } else {
              return [
                'You have entered an invalid product Id.',
                'Try again.',
              ].join(' ');
            }
          },
        },
        {
          type: 'input',
          name: 'quantity',
          message: 'Enter the new inventory level:',
          validate: function (input) {
            if (/^(\d+)$/.test(input)) {
              return true;
            } else {
              return 'Please enter a number.';
            }
          },
        },
      ])
      .then((answers) => {
        const itemId = parseInt(answers.itemId);
        const quantity = parseInt(answers.quantity);

        pool.query(updateStmt, [quantity, itemId], function (error) {
          if (error) throw error;

          const message = 'The stock level was successfully updated!';

          viewInventory('updated', message);
        });
      });
  } else {
    viewInventory('manageInventory', modifyStock);
  }
}

/**
 * Provide the ability to add a new product to the database.
 */
function addProduct() {
  const insertStmt = [
    'INSERT INTO products(',
    'product_name,',
    'department_id,',
    'price,',
    'stock_quantity',
    ')',
    'VALUES(?, ?, ?, ?)',
  ].join(' ');

  const departmentsQuery = [
    'SELECT',
    'department_id AS id,',
    'department_name AS name',
    'FROM departments',
    'ORDER BY department_name ASC',
  ].join(' ');

  const departments = [];
  pool.query(departmentsQuery, function (error, results) {
    if (error) throw error;

    results.forEach((dept) => {
      departments.push({
        name: dept.name,
        value: dept.id,
      });
    });
  });

  console.clear();
  console.log(figlet.textSync('Bamazon Manager', fconfig));

  inquirer
    .prompt([
      {
        type: 'input',
        name: 'product',
        message: 'Enter the new product name:',
        validate: function (value) {
          if (value.length > 50) {
            return [
              'Please enter a name that is shorter than',
              '50 characters.',
            ].join(' ');
          }
          return true;
        },
      },
      {
        type: 'list',
        name: 'department_id',
        message: 'Choose from the following departments:',
        choices: departments,
      },
      {
        type: 'input',
        name: 'price',
        message: 'What is the price of the product?',
        validate: function (value) {
          const valid = !isNaN(parseFloat(value));
          return valid || 'Please enter a decimal price.';
        },
      },
      {
        type: 'input',
        name: 'stock',
        message: 'What is the initial stock count?',
        validate: function (value) {
          const valid = !isNaN(parseInt(value));
          return valid || 'Please enter a positive whole number.';
        },
      },
    ])
    .then((answers) => {
      const values = [
        answers.product,
        answers.department_id,
        answers.price,
        answers.stock,
      ];

      pool.query(insertStmt, values, function (error) {
        if (error) throw error;
        viewInventory('add', 'The new product has been added');
      });
    });
}

// Start the application interaction.
console.log(figlet.textSync('Bamazon Manager', fconfig));
displayMenu();
