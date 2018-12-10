-- DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE IF NOT EXISTS bamazon CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci;

USE bamazon;

CREATE TABLE IF NOT EXISTS products (
    item_id INT UNSIGNED NOT NULL AUTO_INCREMENT UNIQUE,
    product_name VARCHAR(50),
    department_name VARCHAR(35),
    price DECIMAL(15,2),
    stock_quantity INT,
    PRIMARY KEY (item_id)
) ENGINE = INNODB;

CREATE TABLE IF NOT EXISTS departments (
    department_id INT UNSIGNED NOT NULL AUTO_INCREMENT UNIQUE,
    department_name VARCHAR(35),
    over_head_costs DECIMAL(5,2),
    PRIMARY KEY ( department_id )
) ENGINE = INNODB;

INSERT INTO products (product_name, department_name, price, stock_stock_quantity)
VALUES ('Snow Brush & Scraper', 'Automotive Parts & Accessories', 9.09, 15),
       ('Bluetooth FM Transmitter', 'Automotive Parts & Accessories', 18.99, 10),
       ('All-Season Windshield Wiper Blades', 'Automotive Parts & Accessories', 18.99, 5),
       ('Becoming', 'Books', 14.99, 300),
       ('Magnolia Table', 'Books', 29.99, 50),
       ('Harry Potter Box Set', 'Books', 86.93, 50),
       ('A Star is Born', 'CDs & Vinyl', 13.00, 30),
       ('The Greatest Showman', 'CDs & Vinyl', 10.49, 30),
       ('Christmas Is Here', 'CDs & Vinyl', 7.19, 50),
       ('Ring Video Doorbell 2', 'Electronics', 199.00, 150),
       ('Samsung 128GB MicroSD', 'Electronics', 41.99, 150),
       ('Apple iPad Wi-Fi 32GB', 'Electronics', 329.99, 100);

INSERT INTO departments (department_name, over_head_costs)
VALUES  ('Automotive Parts & Accessories', 5.20),
        ('Books', 15.00),
        ('CDs & Vinyl', 25.00),
        ('Electronics', 3.00);
