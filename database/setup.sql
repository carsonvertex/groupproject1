
DROP DATABASE IF EXISTS groupproject1;
CREATE DATABASE groupproject1;

CREATE TABLE Products (
 id SERIAL PRIMARY KEY,
category varchar(50),
image bytea,
productname varchar(50),
price integer,
description varchar(255)
);

INSERT INTO groupproject1 (category,image,productname,price,description)

