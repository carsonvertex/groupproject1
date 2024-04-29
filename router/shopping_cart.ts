import { Router, Request, Response } from "express";
import { pgClient } from "../pgClients";

export const shopping_cartRouter = Router();

shopping_cartRouter.get("/showShoppinglist", showShoppinglist);
shopping_cartRouter.post("/newShoppinglist", newShoppinglist);
shopping_cartRouter.put("/changeQuantityShoppinglist", changeQuantityShoppinglist);
shopping_cartRouter.delete("/delShoppinglist", delShoppinglist);


async function showShoppinglist(req: Request, res: Response) {
    // let { user_id, product_option_id, quantity } = req.body;
    // console.log (user_id,product_option_id,quantity);
    const user_id = req.session.userId;
    console.log(user_id)
    try {
        // 於database 顯示user_id 
        let cart_items = (
            await pgClient.query(
                `with single_image as ( SELECT product_id, min(id) as product_images_id, min(image) as image
                FROM product_images
                GROUP BY product_id
                ),

             product_with_image as (
                select products.*, single_image.product_images_id, single_image.image from products left join single_image on products.id = single_image.product_id
            )


            select shopping_carts.id as shopping_carts_id, shopping_carts.quantity, product_with_image.* 
            from shopping_carts 
            left join product_with_image on product_with_image.id = shopping_carts.product_option_id
            where shopping_carts.user_id = $1
            `,
                [user_id]
            )
        ).rows;

        res.json(cart_items)
    } catch (e) {
        console.log(e)
        res.status(400).json({ message: e });
    }
}




async function newShoppinglist(req: Request, res: Response) {
    try {
        const userId = req.session.userId
        const product_options_id = req.body.product_options_id
        const quantity = req.body.quantity

        // const id = req.params.id;
        console.log({ product_options_id, userId });

        // const optionQuery = `SELECT * FROM product_options 
        //   WHERE product_id = ${id};`;

        // const optionResult = await pgClient.query(optionQuery);

        // const optionQueryResult = optionResult.rows;

        // Insert product options and quantity into the shopping_cart table
        const insertOptionQuery = `INSERT INTO shopping_carts (user_id, product_option_id, quantity) VALUES ($1, $2, $3)`;

        // for (const option of optionQueryResult) {
        // const { product_option_id, quantity } = option; // Assuming the product_options table has an id column as the primary key and a quantity column
        await pgClient.query(insertOptionQuery, [userId, product_options_id, quantity]);
        // }

        res.json({ message: "Product options and quantities added to shopping cart successfully!" });
    } catch (error) {
        console.log(error)
        res.json({ message: "Internal error" });
    }

}

async function casdt(req: Request, res: Response) {
    let { id } = req.query;
    let changeQuantityResult = await pgClient.query(
        "UPDATE quantity SET WHERE id = $1 RETURNING *",
        [id]
    );

    if (changeQuantityResult.rowCount == 1) {
        res.json({
            message: "ChangeQuantity Success",
        });
    }
}

async function changeQuantityShoppinglist(req: Request, res: Response) {
    const inputForm = req.body.inputForm
    console.log({ inputForm })

    try {
        await pgClient.query(
            // select id,quantity from shopping_carts,
            // `UPDATE From shopping_carts where (id,quantity) VALUES ($1,$2)`,[inputForm]
            `UPDATE shopping_carts SET quantity = $1 WHERE id = $2`,
            [inputForm.quantity, inputForm.id]

        );
        res.json({ message: "Shopping list updated" });
    } catch (e) {
        console.log(e);
        res.status(400).json({ message: e });
    }
}





async function delShoppinglist(req: Request, res: Response) {
    const cartId = req.body.cartId
    console.log({ cartId })
    try {
        // 在此處執行刪除購物清單的操作
        // 例如，你可以使用以下代碼從數據庫中刪除購物清單項目：
        await pgClient.query(
            `DELETE FROM shopping_carts WHERE id = $1`,
            [cartId]
        );

        res.json({ message: "Shoppinglist deleted" });
    } catch (e) {
        console.log(e);
        res.status(400).json({ message: e });
    }
}