/* Create Database */ 
CREATE DATABASE paper_trading_database;

/* Delete Tables */
DROP TABLE user_table; 
DROP TABLE holding_table;

/* Create Tables */
CREATE TABLE user_table (
    user_id INT NOT NULL AUTO_INCREMENT UNIQUE,
    user_name VARCHAR(30) UNIQUE NOT NULL,
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
    trade_date TIMESTAMP, 
    PRIMARY KEY (holding_id),
    FOREIGN KEY (user_id) REFERENCES user_table (user_id)
);

/* Repopulate Tables */
INSERT INTO user_table (user_id, user_name, user_password, user_email, cash, created_date) 
VALUES  (DEFAULT, 'admin', 'admin', 'admin@admin.com', 1000000.00, CURRENT_TIMESTAMP),
        (DEFAULT, 'test', 'test', 'test@admin.com', 1000000.00, CURRENT_TIMESTAMP);

INSERT INTO holding_table (holding_id, user_id, stock_symbol, price_paid, trade_date)
VALUES  (DEFAULT, 1, "GOOGL", 1215.45, CURRENT_TIMESTAMP),
        (DEFAULT, 1, "AMZN", 1756.89, CURRENT_TIMESTAMP);

/* Fatch Data */
SELECT * FROM user_table;
SELECT * FROM holding_table;