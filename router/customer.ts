import { Router, Request, Response } from "express";
import { pgClient } from "../pgClients";

export const customerRouter = Router();

customerRouter.get("/category", showCat);
customerRouter.get("/category/:id", showProductById);
customerRouter.get(`/details/:id`, singleProduct);

async function showCat(req: Request, res: Response) {
  try {
    const categoryQueryResult = await pgClient.query("SELECT * FROM categories;");
    const categories = categoryQueryResult.rows;
    res.json({ data: { cats: categories } });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
}

async function showProductById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    console.log(id);

    // const productQueryResult = await pgClient.query(
    //   "SELECT * FROM products FULL OUTER JOIN product_images ON products.id = product_images.id WHERE category_id = $1;",
    //   [id]
    // );

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
      ))
    const products = productQueryResult.rows;
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
}

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

