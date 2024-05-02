import { Router, Request, Response } from "express";
import { pgClient } from "../pgClients";

export const shopping_cartRouter = Router();

shopping_cartRouter.get("/showShoppinglist", showShoppinglist);
shopping_cartRouter.post("/newShoppinglist", newShoppinglist);
shopping_cartRouter.put(
  "/changeQuantityShoppinglist",
  changeQuantityShoppinglist
);
shopping_cartRouter.delete("/delShoppinglist", delShoppinglist);

async function showShoppinglist(req: Request, res: Response) {
  // let { user_id, product_option_id, quantity } = req.body;
  // console.log (user_id,product_option_id,quantity);
  const user_id = req.session.userId;
  console.log("user_id is", user_id);
  try {
    // 於database 顯示user_id
    let cart_items = (
      await pgClient.query(
        `select min(name)as name,min(products.price) as price,min(sc.quantity) as quantity,min(pi.image) as image, min(po.sizing) as size,min(sc.id) as shopping_carts_id from shopping_carts as sc join product_options as po on sc.product_option_id = po.id join product_images as pi on po.product_id = pi.product_id  join products on po.product_id = products.id where user_id = $1 group by sc.id;
            `,
        [user_id]
      )
    ).rows;

    res.json(cart_items);
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: e });
  }
}

async function newShoppinglist(req: Request, res: Response) {
  try {
    const userId = req.session.userId;
    const product_options_id = req.body.product_options_id;
    const quantity = req.body.quantity;

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
    await pgClient.query(insertOptionQuery, [
      userId,
      product_options_id,
      quantity,
    ]);
    // }

    res.json({
      message:
        "Product options and quantities added to shopping cart successfully!",
    });
  } catch (error) {
    console.log(error);
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
  const inputForm = req.body;
  console.log( "GG123",inputForm );

  try {
    await pgClient.query(
      // select id,quantity from shopping_carts,
      // `UPDATE From shopping_carts where (id,quantity) VALUES ($1,$2)`,[inputForm]
      `UPDATE shopping_carts SET quantity = $1 WHERE id = $2`,
      [inputForm.quantity, inputForm.shoppingCartId]
    );
    res.json({ message: "Shopping list updated" });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: e });
  }
}

async function delShoppinglist(req: Request, res: Response) {
  const cartId = req.body.cartId;
  console.log({ cartId });
  try {
    // 在此處執行刪除購物清單的操作
    // 例如，你可以使用以下代碼從數據庫中刪除購物清單項目：
    await pgClient.query(`DELETE FROM shopping_carts WHERE id = $1`, [cartId]);

    res.json({ message: "Shoppinglist deleted" });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: e });
  }
}
