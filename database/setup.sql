
DROP DATABASE IF EXISTS gp1;
CREATE DATABASE gp1;

CREATE TABLE account_levels (
    id SERIAL PRIMARY KEY,
    level_name VARCHAR(20) UNIQUE
);

INSERT INTO users (account_level_id)
VALUES ('customer'), ('admin'), ('super admin');

CREATE TABLE sizes (
    id SERIAL PRIMARY KEY,
    size VARCHAR(20) UNIQUE
);

INSERT INTO size (size)
VALUES ('S'), ('M'), ('L'),('XL');

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(20),
    password VARCHAR(20),
    account_level_id INT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name varchar
);

CREATE TABLE products (
id SERIAL PRIMARY KEY,
category_id integer,
name varchar(50),
price float,
description text,
uploaded_at timestamp WITH TIME ZONE DEFAULT now()
);

CREATE TABLE product_image (
    id SERIAL PRIMARY KEY,
    product_id integer,
    image varchar(255)
);

CREATE TABLE product_options (
    id SERIAL PRIMARY KEY,
    product_id integer,
    hex_code varchar(50),
    size varchar(10),
    stock integer
);









