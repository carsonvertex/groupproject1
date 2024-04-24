import { Router, Request, Response } from "express";
import { pgClient } from "../pgClients";
import formidable from "formidable";


export const productRouter = Router();
// productRouter.get(`/showProduct/cat/:id`, showProductByCatId);

productRouter.get("/showProduct", showProduct);
productRouter.post("/newProduct/cat/:id", newProductByCatId);
productRouter.put("/editProduct", editProduct);
productRouter.delete("/delProduct", delProduct);


// async function showProductByCatId(req: Request, res: Response) {
//     const {id} = req.params
//     let productQueryResult = (
//         await pgClient.query(
//             "SELECT * FROM products FULL OUTER JOIN product_images ON products.id = product_images.id where category_id = $1 ;", [id]            
//         )
        
//     ).rows;
//     res.send(productQueryResult)

//     res.json({ product: productQueryResult,  id})

// }

async function showProduct(req: Request, res: Response) {
    const id = req.query.id
    console.log(id)
    let sql = `with single_image as ( SELECT product_id, min(id) as product_images_id, min(image) as image
    FROM product_images
    GROUP BY product_id
    )
    
    select * from products left join single_image on products.id = single_image.product_id;`   
    const params: any[] = [];

    if (id) {
        sql += "where products.id  = $1"
        params.push(id);

    }
    let productQueryResult = (
        await pgClient.query(
            sql,params  
        )
        
    ).rows;
    res.json( {product: productQueryResult  })

}

async function newProductByCatId(req: Request, res: Response) {
    const form = formidable({
        uploadDir: __dirname + "/../uploads",
        keepExtensions: true,
        minFileSize: 0,
        allowEmptyFiles: false,
      });
      let name:string;
      let image:string;
      let price:string;
      let description:string;
      let category_id = req.params.id

      console.log({
        category_id
      })
      form.parse(req, async (err, fields, files) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server erorr!" });
        return
      }
      if (fields.name) {
        name = fields.name![0];
      }

      if (files.image) {
        image = files.image[0].newFilename;
      }
      if (fields.price) {
        price = fields.price![0];
      }
      if (fields.description) {
        description = fields.description![0];
      }
  
      
      let productInsertResult = await pgClient.query(
        "INSERT INTO products (name,price,description,category_id) VALUES ($1,$2,$3,$4) RETURNING id",
        [name,price,description, category_id]
      )
      const product_id =  productInsertResult.rows[0].id
      let imageInsertResult = await pgClient.query(
        "INSERT INTO product_images (image,product_id) VALUES ($1,$2) RETURNING id",[image,product_id]
      )

      res.json({
        data: {
          id: product_id,
          photo: imageInsertResult.rows[0].id,
        },
      });
    });
  }

// async function editProduct(req: Request, res: Response) {
//     let { name } = req.body;
//     let {id}= req.query;
//     let productUpdateResult = await pgClient.query(
//         "UPDATE categories SET name=$1 WHERE id = $2 RETURNING *",
//         [name,id]
//     );

//     if (productUpdateResult.rowCount == 1) {
//         res.json({
//             message: "update success",
//         });
//     }}

// async function delProduct(req: Request, res: Response) {

//     let targetId = parseInt(req.query.id as string);

//     let productDeleteResult = await pgClient.query(
//         "DELETE FROM categories WHERE id =$1",
//         [targetId]
//     );

//     if (productDeleteResult.rowCount == 1) {
//         res.json({ message: "Delete category successful" });
//     } else {
//         res.status(400).json({ message: "Delete category failed" });
//     }

// }