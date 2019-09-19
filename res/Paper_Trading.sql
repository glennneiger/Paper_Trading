/* Create Database */ 
CREATE DATABASE paper_trading_database;

/* Delete Tables */
DROP TABLE holding_table;
DROP TABLE user_table; 


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
VALUES  (DEFAULT, 'admin', 'admin', 'admin@admin.com', 1000000.00, "2019-08-14T22:18:03.000+0000"),
        (DEFAULT, 'test', 'test', 'test@admin.com', 1000000.00, "2019-09-12T22:18:03.000+0000");

INSERT INTO holding_table (holding_id, user_id, stock_symbol, price_paid, trade_date)
VALUES  (DEFAULT, 1, "GOOGL", 1215.45, "2019-08-15T20:18:03.000+0000"),
        (DEFAULT, 1, "AMZN", 1756.89, "2019-08-17T22:18:03.000+0000"),
        (DEFAULT, 2, "V", 185.45, "2019-09-13T22:18:03.000+0000");

/* Fatch Data */
SELECT * FROM user_table;
SELECT * FROM holding_table;