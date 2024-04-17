
DROP DATABASE IF EXISTS groupproject1;
CREATE DATABASE groupproject1;

CREATE TABLE users (
 id SERIAL PRIMARY KEY,
 username varchar(20),
 password varchar(20),
 account_level enum,
 created_at timestamp WITH TIME ZONE DEFAULT now()
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name varchar
);

CREATE TABLE products (
id SERIAL PRIMARY KEY,
name varchar(50),
price float,
description text,
uploaded_at timestamp WITH TIME ZONE DEFAULT now()
);

CREATE TABLE product_image (
    id SERIAL PRIMARY KEY,
    product_id integer,
    image string
);

CREATE TABLE product_options (
    id SERIAL PRIMARY KEY,
    product_id integer,
    hex_code INT,
    size enum,
    stock integer
);







