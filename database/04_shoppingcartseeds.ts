import { Client } from "pg";
import dotenv from "dotenv";
dotenv.config()

let pgClient = new Client({
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
})

type shoppingCart = {
    user_id: number,
    product_options_id: number,
    quantity: number
}



async function shopping_cartItems() {
    try {
        let shoppingCart: shoppingCart[] = [
            // user_id 1
            {
                user_id: 1, product_options_id: 3, quantity: 5
            },

            {
                user_id: 1, product_options_id: 2, quantity: 3
            },

            {
                user_id: 1, product_options_id: 1, quantity: 7
            },
            
            // user_id 2
            {
                user_id: 2, product_options_id: 1,  quantity: 2
            },

            {
                user_id: 2, product_options_id: 1,  quantity: 2
            },
            // user_id 3
            {
                user_id: 3, product_options_id: 2,  quantity: 10
            },

            {
                user_id: 3, product_options_id: 2,  quantity: 10
            },

            {
                user_id: 3, product_options_id: 2,  quantity: 10
            },

            {
                user_id: 3, product_options_id: 1,  quantity: 10
            },
        ]

        await pgClient.connect()

        for(let entry of shoppingCart){
            let shoppingCartInsertResult = await pgClient.query("INSERT INTO shopping_carts (user_id, product_option_id, quantity) VALUES ($1,$2,$3) RETURNING id", [
                entry.user_id, entry.product_options_id, entry.quantity
            ])
        }

        await pgClient.end()

    } catch (error) {
        
        console.log (error)
    }
}

shopping_cartItems()

