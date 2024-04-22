import { Router, Request, Response } from "express";
import { pgClient } from "../pgClients";
import formidable from "formidable";


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
    const form = formidable({
        uploadDir: __dirname + "/../uploads",
        keepExtensions: true,
        minFileSize: 0,
        allowEmptyFiles: true,
      });
      let name:string;
      let price:number;
      let description:string;


      form.parse(req, async (err, fields, files) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server erorr!" });
      }
  
      if (fields.name) {
        name = fields.name![0];
      }
      if (fields.price) {
        price = fields.price![0];
      }
  
      if (files.photo) {
        memoImage = files.photo[0].newFilename;
      }

      let productInsertResult = (await pgClient.query(
        "INSERT INTO products (name,price,description) VALUES ($1,$2, $3) RETURNING id",
        [name,price,description]
      ))
  
      res.json({
        data: {
          id: productInsertResult.rows[0].id,
          photo: productInsertResult.rows[0].image,
        },
      });
    });
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