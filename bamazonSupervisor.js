/**
 * bamazonSupervisor
 *
 * The Coding Boot Camp at UNC Charlotte.
 * (c) 2018 Richard Cyrus <richard.cyrus@rcyrus.com>
 */

const inquirer = require('inquirer');
const Table = require('easy-table');
const { pool } = require('./database');

/**
 * Show the primary menu for the application.
 */
function displayMenu() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'supervisor',
                message: 'Please choose an action.',
                choices: [
                    {
                        key: 'l',
                        name: 'List Departments',
                        value: 'listDepartments'
                    },
                    {
                        key: 'v',
                        name: 'View Products Sales by Department',
                        value: 'departmentSummary'
                    },
                    {
                        key: 'a',
                        name: 'Add New Department',
                        value: 'addDepartment'
                    },
                    {
                        key: 'x',
                        name: 'Exit',
                        value: 'exit'
                    }
                ]
            }
        ])
        .then((answers) => {
            switch (answers.supervisor) {
                case 'listDepartments':
                    listDepartments();
                    break;
                case 'departmentSummary':
                    departmentSummary();
                    break;
                case 'addDepartment':
                    addDepartment();
                    break;
                case 'exit':
                    pool.end();
                    break;
            }
        });
}

/**
 * Display the Departments Table.
 *
 * @param departments
 * @param title
 */
function showDepartments(departments, title) {
    const t = new Table();

    departments.forEach((entry) => {
        t.cell('Id', entry.department_id);
        t.cell('Name', entry.department_name);
        t.cell('Over Head %', entry.over_head_costs, Table.number(2));
        t.newRow();
    });

    console.clear();
    console.log(`\n${title}\n`);
    console.log(t.toString());
}

/**
 * Show the current departments in the database.
 *
 * @param operation
 * @param message
 */
function listDepartments(operation, message) {
    const query = [
        'SELECT',
        'department_id,',
        'department_name,',
        'over_head_costs',
        'FROM departments',
        'ORDER BY department_id ASC'
    ].join(' ');

    pool.query(query, function(error, results) {
        if (error) throw error;

        if (operation === 'add') {
            showDepartments(results, message);
            displayMenu();
        } else {
            showDepartments(results, 'All Departments');
            displayMenu();
        }
    });
}

/**
 * Display the summary of sales by department.
 */
function departmentSummary() {
    const query = [
        'SELECT',
        'd.department_id id,',
        'd.department_name name,',
        'd.over_head_costs over_head,',
        'SUM(p.product_sales) as product_sales,',
        '(p.product_sales - (p.product_sales * (d.over_head_costs / 100)))',
        'AS total_profit',
        'FROM departments d',
        'JOIN products p ON d.department_id = p.department_id',
        'WHERE p.product_sales > 0',
        'GROUP BY',
        'd.department_id,',
        'd.department_name,',
        'd.over_head_costs'
    ].join(' ');

    pool.query(query, function(error, results) {
        if (error) throw error;

        const t = new Table();
        results.forEach((row) => {
            t.cell('Id', row.id);
            t.cell('Department', row.name);
            t.cell('Over Head %', row.over_head, Table.number(2));
            t.cell('Total Sales', row.product_sales, Table.number(2));
            t.cell('Total Profit', row.total_profit, Table.number(2));
            t.newRow();
        });

        console.clear();
        console.log('\nView Products Sales by Department\n');
        console.log(t.toString());

        displayMenu();
    });
}

/**
 * Add a new Department for products.
 */
function addDepartment() {
    const insertStmt = [
        'INSERT INTO departments(department_name, over_head_costs)',
        'VALUES(?, ?)'
    ].join(' ');

    console.clear();
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'department',
                message: 'Enter the department name:',
                validate: function(value) {
                    if (value.length > 35) {
                        return [
                            'Please enter a name that is shorter than',
                            '35 characters'
                        ].join(' ');
                    }
                    return true;
                }
            },
            {
                type: 'input',
                name: 'overHead',
                message: 'Enter the percentage of over-head for goods:',
                validate: function(value) {
                    const valid = !isNaN(parseFloat(value));
                    return valid || 'Please enter a decimal value.';
                }
            }
        ])
        .then((answers) => {
            console.log(answers);
            const values = [
                answers.department,
                answers.overHead
            ];

            pool.query(insertStmt, values, function(error) {
                if (error) throw error;

                listDepartments('add', 'The new department has been added');
            });
        });
}

// Start the application interaction.
displayMenu();
