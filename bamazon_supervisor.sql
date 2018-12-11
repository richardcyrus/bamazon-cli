USE bamazon;

CREATE TABLE IF NOT EXISTS departments (
    department_id INT UNSIGNED NOT NULL AUTO_INCREMENT UNIQUE,
    department_name VARCHAR(35) COLLATE utf8mb4_unicode_520_ci NOT NULL,
    over_head_costs DECIMAL(15,2) DEFAULT 0.00,
    PRIMARY KEY ( department_id )
) ENGINE = INNODB;

INSERT INTO departments (department_name, over_head_costs)
VALUES  ('Automotive Parts & Accessories', 5.20),
        ('Books', 15.00),
        ('CDs & Vinyl', 25.00),
        ('Electronics', 3.00);

-- Add the product_sales column to the products table.
ALTER TABLE products
    ADD COLUMN `product_sales` DECIMAL(15,2) DEFAULT 0.00 AFTER `stock_quantity`;

-- Add the department_id column that will be used to reference the departments table.
-- This needs to allow NULL initially so that it can be added to the table.
--     Once it is populated with values, it will be reset to NOT NULL.
ALTER TABLE products
    ADD COLUMN `department_id` INT(10) UNSIGNED NULL AFTER `department_name`;

-- Add the appropriate department_id values to the new column.
UPDATE products
    JOIN departments ON products.department_name = departments.department_name
    SET products.department_id = departments.department_id;

-- Drop the department_name column since it is no longer needed.
ALTER TABLE products
    DROP COLUMN department_name;

-- Set the department_id column to be NOT NULL.
ALTER TABLE products
    MODIFY department_id INT(10) UNSIGNED NOT NULL;

-- Add the foreign key relationship between the departments and products tables.
-- SET FOREIGN_KEY_CHECKS=0;
ALTER TABLE `products`
    ADD CONSTRAINT `fk_department_id`
    FOREIGN KEY (department_id)
    REFERENCES `departments`(`department_id`);
-- SET FOREIGN_KEY_CHECKS=1;
