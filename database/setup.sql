DROP DATABASE IF EXISTS gp1;

CREATE DATABASE gp1;

\c gp1 
Create Type sizeName AS enum('S', 'M', 'L', 'XL');

Create Type userPermission AS enum('customer', 'admin', 'super_admin');

Create Type checkoutStatus AS enum('success', 'fail');

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email varchar(255) UNIQUE,
    username VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    level userPermission,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name varchar(255)
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    name varchar(255),
    price float,
    description text,
    uploaded_at timestamp WITH TIME ZONE DEFAULT now()
);

CREATE TABLE product_images (
    id SERIAL PRIMARY KEY,
    product_id integer,
    FOREIGN KEY (product_id) REFERENCES products(id),
    image varchar(255)
);

CREATE TABLE product_options (
    id SERIAL PRIMARY KEY,
    product_id integer,
    FOREIGN KEY (product_id) REFERENCES products(id),
    color_name varchar(255),
    color_code integer,
    size sizeName,
    stock integer
);

CREATE TABLE shopping_carts (
    id SERIAL PRIMARY KEY,
    user_id integer,
    FOREIGN KEY (user_id) REFERENCES users(id),
    product_option_id integer,
    FOREIGN KEY (product_option_id) REFERENCES product_options(id),
    quantity integer
);

CREATE TABLE checkouts (
    id SERIAL PRIMARY KEY,
    user_id integer,
    FOREIGN KEY (user_id) REFERENCES users(id),
    status checkoutStatus,
    total_price float,
    created_at timestamp,
    updated_at timestamp
);

CREATE TABLE checkout_items (
    id SERIAL PRIMARY KEY,
    checkout_id integer,
    FOREIGN KEY (checkout_id) REFERENCES checkouts(id),
    product_option_id integer,
    FOREIGN KEY (product_option_id) REFERENCES product_options(id),
    unit_price float,
    quantity varchar(255)
);