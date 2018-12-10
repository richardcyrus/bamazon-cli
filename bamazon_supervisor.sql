USE bamazon;

CREATE TABLE IF NOT EXISTS departments (
    department_id INT UNSIGNED NOT NULL AUTO_INCREMENT UNIQUE,
    department_name VARCHAR(35),
    over_head_costs DECIMAL(5,2),
    PRIMARY KEY ( department_id )
) ENGINE = INNODB;

INSERT INTO departments (department_name, over_head_costs)
VALUES  ('Automotive Parts & Accessories', 5.20),
        ('Books', 15.00),
        ('CDs & Vinyl', 25.00),
        ('Electronics', 3.00);

ALTER TABLE products ADD COLUMN `product_sales` DECIMAL(15,2) DEFAULT '0.00' AFTER `stock_quantity`;
