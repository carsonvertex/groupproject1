
DROP DATABASE IF EXISTS groupproject1;
CREATE DATABASE groupproject1;

-- CREATE TABLE users (
--  id SERIAL PRIMARY KEY,
--  username varchar(20),
--  password varchar(20),
--  account_level enum,
--  created_at timestamp WITH TIME ZONE DEFAULT now()
-- );
CREATE TABLE account_levels (
    id SERIAL PRIMARY KEY,
    level_name VARCHAR(20) UNIQUE
);

-- Insert the account levels into the lookup table
INSERT INTO users (account_level_id)
VALUES ('customer'), ('admin'), ('super admin');

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
    product_name varchar(50),
    color_code varchar(50)
);

CREATE TABLE option_sizes (
    id SERIAL PRIMARY KEY,
    product_option_id integer,
    size enum,
    qunatity integer
);







