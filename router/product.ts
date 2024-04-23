import { Router, Request, Response } from "express";
import { pgClient } from "../pgClients";
import formidable from "formidable";


export const productRouter = Router();
// productRouter.get(`/showProduct/cat/:id`, showProductByCatId);

productRouter.get("/showProduct", showProduct);
<<<<<<< HEAD
productRouter.post("/newProduct/cat/:id", newProductByCatId);
// productRouter.put("/editProduct", editProduct);
// productRouter.delete("/delProduct", delProduct);


// async function showProductByCatId(req: Request, res: Response) {
//     const {id} = req.params
//     let productQueryResult = (
//         await pgClient.query(
//             "SELECT * FROM products FULL OUTER JOIN product_images ON products.id = product_images.id where category_id = $1 ;", [id]            
//         )

//     ).rows;
//     res.send(productQueryResult)
=======
<<<<<<< HEAD
productRouter.get(`/editOption/product/:id`, singleProduct);
=======
<<<<<<< HEAD
// productRouter.post("/newProduct", newProduct);
// productRouter.put("/editProduct", editProduct);
// productRouter.delete("/delProduct", delProduct);
=======
>>>>>>> 4a30d94981d78680927a9bae57ff2c6f0d808b0f
productRouter.post("/newProduct/cat/:id", newProductByCatId);
productRouter.put("/editProduct", editProduct);
productRouter.delete("/delProduct", delProduct);
>>>>>>> b807dc1c424a78e2b115dc3e1dc84581c01c98b6


>>>>>>> a0a6450b959950d682ad5d5c1ef877c5576fd637


async function showProduct(req: Request, res: Response) {
<<<<<<< HEAD
  const id = req.query.id
  console.log(id)
  let sql = `with single_image as ( SELECT product_id, min(id) as product_images_id, min(image) as image
=======
    const id = req.query.id
    console.log("cat:",id)
    let sql = `with single_image as ( SELECT product_id, min(id) as product_images_id, min(image) as image
>>>>>>> a0a6450b959950d682ad5d5c1ef877c5576fd637
    FROM product_images
    GROUP BY product_id
    )
    
<<<<<<< HEAD
    select * from products left join single_image on products.id = single_image.product_id;`
  const params: any[] = [];

  if (id) {
    sql += "where products.id  = $1"
    params.push(id);
=======
    select * from products left join single_image on products.id = single_image.product_id `   
    const params: any[] = [];

    if (id) {
        sql += "where products.category_id  = $1 "
        params.push(id);
>>>>>>> a0a6450b959950d682ad5d5c1ef877c5576fd637

  }
  let productQueryResult = (
    await pgClient.query(
      sql, params
    )

  ).rows;
  res.json({ product: productQueryResult })

}

<<<<<<< HEAD
=======
<<<<<<< HEAD
async function singleProduct(req: Request, res: Response) {
  try {
    // const urlParams = new URLSearchParams(req.url);
    const id = req.params.id
    // console.log("pro:",id)
    // console.log(urlParams)
    // const productId = urlParams.get('product');
    console.log(id)
    
   
    const query = `SELECT * FROM products WHERE id =${id};`;
    const product = await pgClient.query(query);
    const selectedProducts = product.rows[0];
    
    res.json(selectedProducts);
  } catch (error) {
    res.json({ message: "internal error" });
  }
}




=======
<<<<<<< HEAD
// async function newProduct(req: Request, res: Response) {
//     const form = formidable({
//         uploadDir: __dirname + "/../uploads",
//         keepExtensions: true,
//         minFileSize: 0,
//         allowEmptyFiles: true,
//       });
//       let name:string;
//       let price:number;
//       let description:string;


//       form.parse(req, async (err, fields, files) => {
//       if (err) {
//         console.log(err);
//         res.status(500).json({ message: "Internal server erorr!" });
//       }
  
//       if (fields.name) {
//         name = fields.name![0];
//       }
//       if (fields.price) {
//         price = fields.price![0];
//       }
  
//       if (files.photo) {
//         memoImage = files.photo[0].newFilename;
//       }

//       let productInsertResult = (await pgClient.query(
//         "INSERT INTO products (name,price,description) VALUES ($1,$2, $3) RETURNING id",
//         [name,price,description]
//       ))
  
//       res.json({
//         data: {
//           id: productInsertResult.rows[0].id,
//           photo: productInsertResult.rows[0].image,
//         },
//       });
//     });
//   }
=======
>>>>>>> 4a30d94981d78680927a9bae57ff2c6f0d808b0f
>>>>>>> a0a6450b959950d682ad5d5c1ef877c5576fd637
async function newProductByCatId(req: Request, res: Response) {
  const form = formidable({
    uploadDir: __dirname + "/../uploads",
    keepExtensions: true,
    minFileSize: 0,
    allowEmptyFiles: false,
  });
  let name: string;
  let image: string;
  let price: string;
  let description: string;
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
      [name, price, description, category_id]
    )
    const product_id = productInsertResult.rows[0].id
    let imageInsertResult = await pgClient.query(
      "INSERT INTO product_images (image,product_id) VALUES ($1,$2) RETURNING id", [image, product_id]
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