INSERT INTO categories (name)
VALUES ('T-Shirts');
INSERT INTO categories (name)
VALUES('Pants');

-------- products -----------
INSERT INTO products (category_id,
                     name,
                     price,
                     description)
VALUES (1,
        'Black T-Shirt'
        499,
'        This is a black T-Shirt
');
INSERT INTO products (category_id,
                     name,
                     price,
                     description)
VALUES (2,
        'White T-Shirt',
        499,
        'This is a White T-Shirt'
);

INSERT INTO product_options (product_id, hex_code, "size", stock)
VALUES (1, '0000', 'S', 100);
INSERT INTO product_options (product_id, hex_code, "size", stock)
VALUES (1, '0000', 'M', 100);
INSERT INTO product_options (product_id, hex_code, "size", stock)
VALUES (1, '0000', 'L', 100);
INSERT INTO product_options (product_id, hex_code, "size", stock)
VALUES (2, 'FFFF', 'S', 100);
INSERT INTO product_options (product_id, hex_code, "size", stock)
VALUES (2, 'FFFF', 'M', 100);
INSERT INTO product_options (product_id, hex_code, "size", stock)
VALUES (2, 'FFFF', 'L', 100);

-------- users ------------

INSERT INTO users (
    username,
    password,
    account_level_id,
    created_at
)
VALUES (
    'Alex38900',
    '12345',
    (SELECT id FROM account_levels WHERE level_name = 'super admin'),
    CURRENT_TIMESTAMP
);

INSERT INTO users (
    username,
    password,
    account_level_id,
    created_at
)
VALUES (
    'Peter9965',
    '45678',
    (SELECT id FROM account_levels WHERE level_name = 'customer'),
    CURRENT_TIMESTAMP
);

INSERT INTO users (
    username,
    password,
    account_level_id,
    created_at
)
VALUES (
    'ada3344',
    '54321',
    (SELECT id FROM account_levels WHERE level_name = 'customer'),
    CURRENT_TIMESTAMP
);

INSERT INTO users (
    username,
    password,
    account_level_id,
    created_at
)
VALUES (
    'bob1234',
    '98765',
    (SELECT id FROM account_levels WHERE level_name = 'admin'),
    CURRENT_TIMESTAMP
);