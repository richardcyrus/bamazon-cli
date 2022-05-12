# Bamazon

This activity is about creating storefront with node.js and MySQL.

There are three components to this exercise:

- **bamazonCustomer.js**: The interface for a customer to purchase products.
- **bamazonManager.js**: The interface for the store managers to view products, manage inventory levels, and to add new products.
- **bamazonSupervisor.js**: An interface for managing the available product departments and for reviewing Product Sales by Department.

## bamazonCustomer.js

The products table in the database has the following structure:

- `item_id` - unique id for each product
- `product_name` - the name of the product
- `department_name` - the category to which the product belongs
- `price` - the amount the customer will pay for a single product
- `stock_quantity` - how many of the products are available for sale

When the `bamazonCustomer.js` application is launched, a list of the currently available products are displayed. The customer is then asked to choose an item for purchase, by entering the Id of the item. If they have selected a valid Id, then they are asked to enter how many of the selected product they would like to purchase. If the item Id and the quantity to purchase are valid, the sale is completed and the customer is shown the total price for their purchase. They are then asked if they'd like to make another purchase or exit.

## bamazonManager.js

The `bamazonManager.js` application presents the manager with a menu of options for managing store inventory.

- **_View Products for Sale_** lists all of the items in the store:
  - The item Id
  - The product name
  - The department name
  - The amount in stock
  - The unit price
- **_View Low Inventory_** lists all items that have a stock quantity less than 5.
- **_Manage Stock Levels_** allows the manager to update the amount of available stock for any item in the store.
- **_Add New Product_** allows the manager to add a new product to the store.

## The Supervisor Application

Integrating the supervisor application requires some restructuring of the database tables. The core changes to the database are in the [bamazon_supervisor.sql](bamazon_supervisor.sql) file.

### Database Changes

The first change introduced by this module is the addition of a `departments` table. The table structure is as follows:

- `department_id` - unique id for each department
- `department_name` - the name of the department (product category)
- `over_head_costs` - represents a percentage of the over head for each product category.

The `products` table also needs to be modified to add:

- `product_sales` - this is the sum of the number of items purchased multiplied by the purchase price of the item, for each order placed by a customer.

The `bamazonCustomer.js` application is modified to update the `product_sales` column with each purchase.

### bamazonSupervisor.js

The `bamazonSupervisor.js` application presents the supervisor with a menu of options:

- **_View Product Sales by Department_** displays the Sales by department joining information from the `products` and `departments` tables and adding a calculated column in the query result.
- **_Create New Department_** allows the supervisor to add another department (product category) for new products.

# Notes:

In my implementation of the `bamazonSupervisor` application, I made modifications to the `bamazonCustomer.js` and `bamazonManager.js` applications to accommodate the use of the `departments` table as the source of the `department_name`. This required adding a reference to the `products` table and removing the `department_name` field, as well as updating the queries in the `bamazonManager.js` application to correctly join both tables for display and update.
