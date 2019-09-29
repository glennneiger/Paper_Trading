/* Create Database */ 
CREATE DATABASE paper_trading_database;

/* Delete Tables */
DROP TABLE holding_table;
DROP TABLE order_table; 
DROP TABLE user_table; 


/* Create Tables */
CREATE TABLE user_table (
    user_id INT NOT NULL AUTO_INCREMENT UNIQUE,
    user_first_name VARCHAR(30) NOT NULL,
    user_last_name VARCHAR(30) NOT NULL,
    user_password VARCHAR(30) NOT NULL,
    user_email VARCHAR(255) UNIQUE NULL,
    cash DOUBLE(20, 4) NOT NULL,
    created_date TIMESTAMP,
    PRIMARY KEY (user_id)
);

CREATE TABLE holding_table (
    holding_id INT NOT NULL AUTO_INCREMENT UNIQUE,
    user_id INT NOT NULL,
    stock_symbol VARCHAR(10) NOT NULL,
    price_paid DOUBLE(20, 4) NOT NULL, 
    quantity INT NOT NULL, 
    trade_date TIMESTAMP, 
    PRIMARY KEY (holding_id),
    FOREIGN KEY (user_id) REFERENCES user_table (user_id)
);

CREATE TABLE order_table (
    transaction_id INT NOT NULL AUTO_INCREMENT UNIQUE,
    user_id INT NOT NULL,
    stock_symbol VARCHAR(10) NOT NULL, 
    action_type VARCHAR(20) NOT NULL, /* buy, sell, sell-short, buy-to-cover */
    status_type VARCHAR(20) NOT NULL, /* open, executed, cancelled */
    quantity INT NOT NULL,
    price_paid DOUBLE(20, 4) NOT NULL, 
    commission DOUBLE(20, 4) NOT NULL, 
    total DOUBLE(20, 4) NOT NULL, 
    order_date TIMESTAMP,
    trade_date TIMESTAMP, 
    PRIMARY KEY (transaction_id),
    FOREIGN KEY (user_id) REFERENCES user_table (user_id)
);

/* Repopulate Tables */
INSERT INTO user_table (user_id, user_first_name, user_last_name, user_password, user_email, cash, created_date) 
VALUES  (DEFAULT, 'Joseff', 'Barron', 'admin', 'admin@admin.com', 546285.76, "2019-05-14T22:18:03.000+0000"),
        (DEFAULT, 'Dulimbai', 'Abka', 'test', 'test@admin.com', 1000000.00, "2019-09-12T22:18:03.000+0000");

INSERT INTO holding_table (holding_id, user_id, stock_symbol, price_paid, quantity, trade_date)
VALUES  (DEFAULT, 1, "GOOGL", 1215.45, 100, "2019-08-15T20:18:03.000+0000"),
        (DEFAULT, 1, "AMZN", 1756.89, 50, "2019-08-17T22:18:03.000+0000"),
        (DEFAULT, 1, "QQQ", 170.12, 100, "2019-06-03T20:18:03.000+0000"),
        (DEFAULT, 1, "BILI", 14.36, 2000, "2019-06-17T22:18:03.000+0000"),
        (DEFAULT, 1, "BABA", 172.99, 100, "2019-07-19T20:18:03.000+0000");

INSERT INTO order_table (transaction_id, user_id, stock_symbol, action_type, status_type, quantity, price_paid, commission, total, order_date, trade_date)
VALUES  (DEFAULT, 1, "GOOGL", "buy", "executed", 100, 1215.45, 4.95, -121549.95, "2019-08-15T20:18:03.000+0000", "2019-08-15T20:18:03.000+0000"),
        (DEFAULT, 1, "AMZN", "buy", "executed", 50, 1756.89, 4.95, -87849.45, "2019-08-17T22:18:03.000+0000", "2019-08-17T22:18:03.000+0000"),
        (DEFAULT, 1, "QQQ", "buy", "executed", 100, 170.12, 4.95, -17016.95, "2019-06-03T20:18:03.000+0000", "2019-06-03T20:18:03.000+0000"),
        (DEFAULT, 1, "BILI", "buy", "executed", 2000, 14.36, 4.95, -28724.95, "2019-06-17T22:18:03.000+0000", "2019-06-17T22:18:03.000+0000"),
        (DEFAULT, 1, "BABA", "buy", "executed", 100, 172.99, 4.95, -17303.95, "2019-07-19T20:18:03.000+0000", "2019-07-19T20:18:03.000+0000");


/* Fatch Data */
SELECT * FROM user_table;
SELECT * FROM holding_table;
SELECT * FROM order_table;