/* Create Database */ 
CREATE DATABASE paper_trading_database;

/* Delete Tables */
DROP TABLE holding_table;
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

/* Repopulate Tables */
INSERT INTO user_table (user_id, user_first_name, user_last_name, user_password, user_email, cash, created_date) 
VALUES  (DEFAULT, 'Joseff', 'Barron', 'admin', 'admin@admin.com', 56285.76, "2019-05-14T22:18:03.000+0000"),
        (DEFAULT, 'Dulimbai', 'Abka', 'test', 'test@admin.com', 1000000.00, "2019-09-12T22:18:03.000+0000");

INSERT INTO holding_table (holding_id, user_id, stock_symbol, price_paid, quantity, trade_date)
VALUES  (DEFAULT, 1, "GOOGL", 1215.45, 100, "2019-08-15T20:18:03.000+0000"),
        (DEFAULT, 1, "AMZN", 1756.89, 50, "2019-08-17T22:18:03.000+0000"),
        (DEFAULT, 1, "QQQ", 170.12, 100, "2019-06-03T20:18:03.000+0000"),
        (DEFAULT, 1, "BILI", 14.36, 2000, "2019-06-17T22:18:03.000+0000"),
        (DEFAULT, 1, "BABA", 172.99, 100, "2019-07-19T20:18:03.000+0000"),
        (DEFAULT, 1, "FB", 180.36, 50, "2019-08-26T22:18:03.000+0000"),
        (DEFAULT, 2, "V", 185.45, 60, "2019-09-13T22:18:03.000+0000");

/* Fatch Data */
SELECT * FROM user_table;
SELECT * FROM holding_table;