\c gp1
INSERT INTO
        categories (name)
VALUES
        ('T-Shirts');

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

INSERT INTO
        products (
                category_id,
                name,
                price,
                description
        )
VALUES
        (
                1,
                'Black T-Shirt',
                499,
                'This is a black T-Shirt'
        );

-- INSERT INTO
--         products (
--                 category_id,
--                 name,
--                 price,
--                 description
--         )
-- VALUES
--         (
--                 2,
--                 'White T-Shirt',
--                 499,
--                 'This is a White T-Shirt'
--         );
--  using TS to insert the data.
-- INSERT INTO product_options (product_id, hex_code, "size", stock)
-- VALUES (1, '0000', 'S', 100);
-- INSERT INTO product_options (product_id, hex_code, "size", stock)
-- VALUES (1, '0000', 'M', 100);
-- INSERT INTO product_options (product_id, hex_code, "size", stock)
-- VALUES (1, '0000', 'L', 100);
-- INSERT INTO product_options (product_id, hex_code, "size", stock)
-- VALUES (2, 'FFFF', 'S', 100);
-- INSERT INTO product_options (product_id, hex_code, "size", stock)
-- VALUES (2, 'FFFF', 'M', 100);
-- INSERT INTO product_options (product_id, hex_code, "size", stock)
-- VALUES (2, 'FFFF', 'L', 100);

INSERT INTO
        users (
                username,
                password,
                level,
                created_at
        )
VALUES
        (
                'james9896',
                'james@tecky.io',
                'customer',
                CURRENT_TIMESTAMP
        );
