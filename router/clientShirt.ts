import { Router, Request, Response } from "express";
import { pgClient } from "../pgClients";

export const productRouter = Router();

productRouter.get(`/showProduct/cat/:id`, showProductByCatId);
productRouter.get("/showProduct", showProduct);

productRouter.get(`/editOption/product/:id`, singleProduct);

// product by category
async function showProductByCatId(req: Request, res: Response) {
  const { id } = req.params
  let productQueryResult = (
    await pgClient.query(
      "SELECT * FROM products FULL OUTER JOIN product_images ON products.id = product_images.id where category_id = $1 ;", [id]
    )

  ).rows;
  res.send(productQueryResult)
}

async function showProduct(req: Request, res: Response) {
  const id = req.query.id
  console.log("cat:", id)
  let sql = `with single_image as ( SELECT product_id, min(id) as product_images_id, min(image) as image
    FROM product_images
    GROUP BY product_id
    )
    
    select * from products left join single_image on products.id = single_image.product_id `
  const params: any[] = [];

  if (id) {
    sql += "where products.category_id  = $1 "
    params.push(id);

  }
  let productQueryResult = (
    await pgClient.query(
      sql, params
    )

  ).rows;
  res.json({ product: productQueryResult })

}


// product option page
async function singleProduct(req: Request, res: Response) {
  try {
    const id = req.params.id;
    console.log(id);

    const productQuery = `SELECT * 
      FROM products 
      JOIN product_images ON products.id = product_images.product_id 
      WHERE products.id = ${id};`;

    const optionQuery = `SELECT * FROM products 
      JOIN product_options ON products.id = product_options.product_id 
      WHERE products.id = ${id};`;

    const [productResult, optionResult] = await Promise.all([
      pgClient.query(productQuery),
      pgClient.query(optionQuery)
    ]);

    const selectedProduct = productResult.rows[0];
    const optionQueryResult = optionResult.rows;

    const productData = {
      ...selectedProduct,
      options: optionQueryResult
    };

    res.json(productData);
  } catch (error) {
    res.json({ message: "internal error" });
  }
}



