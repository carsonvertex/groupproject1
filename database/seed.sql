INSERT INTO categories (name)
VALUES ("T-Shirts");
INSERT INTO categories (name)
VALUES("Pants");

INSERT INTO products (category_id,
                     name,
                     price,
                     description)
VALUES (1,
        "Black T-Shirt",
        499,
        "This is a black T-Shirt"
);
INSERT INTO products (category_id,
                     name,
                     price,
                     description)
VALUES (2,
        "White T-Shirt",
        499,
        "This is a White T-Shirt"
);

INSERT INTO product_options (product_id,
                             hex_code,
                             size,
                             stock
)
VALUES ()