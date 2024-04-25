import { Router, Request, Response } from "express";
import { pgClient } from "../pgClients";

export const shopping_cartRouter = Router();

shopping_cartRouter.get("/showShoppinglist", showShoppinglist);
shopping_cartRouter.post("/newShoppinglist", newShoppinglist);
shopping_cartRouter.put("/changeQuantityShoppinglist", changeQuantityShoppinglist);
shopping_cartRouter.delete("/delShoppinglist", delShoppinglist);


async function showShoppinglist(req: Request, res: Response){
    // let { user_id, product_option_id, quantity } = req.body;
    // console.log (user_id,product_option_id,quantity);
    const user_id = req.session.userId;
    console.log(user_id)
    try{ 
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
        res.status(400).json({message: e});
    }
}




async function newShoppinglist(req: Request, res:Response){

}

async function changeQuantityShoppinglist(req: Request, res:Response){
    let {id} = req.query;
    let changeQuantityResult = await pgClient.query(
        "UPDATE quantity SET WHERE id = $1 RETURNING *",
        [id]
    );

    if(changeQuantityResult.rowCount == 1){
        res.json({
            message: "ChangeQuantity Success",
        });
    }}

async function delShoppinglist(req:Request, res:Response){
    
    let targetId = parseInt(req.query.id as string);

    let delShoppinglistResult = await pgClient.query(
        "DELETE FROM "
    )
}