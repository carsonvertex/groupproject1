
DROP DATABASE IF EXISTS groupproject1;
CREATE DATABASE groupproject1;

CREATE TABLE users (
 id SERIAL PRIMARY KEY,
 username varchar(20),
 password varchar(20),
 account_level enum,
 created_at timestamp WITH TIME ZONE DEFAULT now()
);

CREATE TABLE products (
id SERIAL PRIMARY KEY,
name varchar(50),
price integer,
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
    product_name varchar(50),
    color_code varchar(50)
);

CREATE TABLE option_sizes (
    id SERIAL PRIMARY KEY,
    product_option_id integer,
    size enum,
    qunatity integer
);

CREATE TABLE shopping_cart(
    id SERIAL PRIMARY KEY,
    user_id integer,
    product_choice_id integer,
    qunatity integer
)




