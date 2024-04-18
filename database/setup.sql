
DROP DATABASE IF EXISTS gp1;
CREATE DATABASE gp1;
\c gp1

CREATE TABLE account_levels (
    id SERIAL PRIMARY KEY,
    level_name VARCHAR(20) UNIQUE
);

Create Type sizeName AS enum('S','M','L','XL');

CREATE TABLE sizes (
    id SERIAL PRIMARY KEY,
    size sizeName
);

Create Type userPermission AS enum('customer','admin','super_admin');

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email varchar(20) UNIQUE,
    email varchar(50) UNIQUE,
    username VARCHAR(20) UNIQUE,
    password VARCHAR(20),
    level userPermission,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name varchar(25)
);

CREATE TABLE products (
id SERIAL PRIMARY KEY,
category_id INT, 
FOREIGN KEY (category_id) REFERENCES categories(id),
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






