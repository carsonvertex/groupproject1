import { Router, Request, Response } from "express";
import { pgClient } from "../pgClients";


export const productRouter = Router();

productRouter.get("/showProduct", showProduct);
productRouter.post("/newProduct", newProduct);
productRouter.put("/editProduct", editProduct);
productRouter.delete("/delProduct", delProduct);

async function showProduct(req: Request, res: Response) {
    let productQueryResult = (
        await pgClient.query(
            "SELECT * FROM products FULL OUTER JOIN product_images ON products.id = product_images.id ;"
            
        )
    ).rows;
    res.json({ data: { product: productQueryResult } })

}

async function newProduct(req: Request, res: Response) {
    let { name } = req.body;
    try {
        let productQueryResult = (
            await pgClient.query("SELECT id,name FROM categories WHERE name = $1;", [name])
        ).rows[0];
        if (productQueryResult) {
            res.status(400).json({ message: "Category already exists." });
            return;
        }
        const insertResult = await pgClient.query(
            "INSERT INTO categories (name) VALUES ($1) returning id",
            [name]
        );
        const returningId = insertResult.rows[0].id;
        res.json({
            msg: "Category Created",
            Id: returningId,
        });
        console.log(res.json)
    } catch (e) {
        console.log(e);
        res.status(400).json({ message: e });
    }
}


async function editProduct(req: Request, res: Response) {
    let { name } = req.body;
    let {id}= req.query;
    let productUpdateResult = await pgClient.query(
        "UPDATE categories SET name=$1 WHERE id = $2 RETURNING *",
        [name,id]
    );

    if (productUpdateResult.rowCount == 1) {
        res.json({
            message: "update success",
        });
    }}

async function delProduct(req: Request, res: Response) {

    let targetId = parseInt(req.query.id as string);

    let productDeleteResult = await pgClient.query(
        "DELETE FROM categories WHERE id =$1",
        [targetId]
    );

    if (productDeleteResult.rowCount == 1) {
        res.json({ message: "Delete category successful" });
    } else {
        res.status(400).json({ message: "Delete category failed" });
    }

}