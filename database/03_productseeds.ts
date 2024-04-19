import { Client } from "pg";
import dotenv from "dotenv"
dotenv.config()

let pgClient = new Client({
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
})



type products = {
    name: string,
    price: number,
    description: string
}

type productsImage = {
    image: string
}

async function productItems() {
    console.log("Test products input succeed!")
    try {
        let products: products[] = [
            {
                name: "catergory_test1", price: 499, description: "I LOVE DAY"
            },
            {
                name: "catergory_test2", price: 599, description: "I LOVE MAY"
            },
            {
                name: "catergory_test3", price: 699, description: "I LOVE TAY"
            }
        ]

        let images: productsImage[] = [
            { image: "image_test1.jpg" },
            { image: "image_test2.jpg" },
            { image: "image_test3.jpg" }
        ]


        await pgClient.connect()

        for (let entry of products) {

            let productInsertResult = await pgClient.query("INSERT INTO products (name,price,description) VALUES ($1,$2,$3) RETURNING id", [
                entry.name, entry.price, entry.description])

            console.log(productInsertResult.rows[0].id)

            await pgClient.query("INSERT INTO product_images (product_id,image) VALUES ($1,$2)", [
                productInsertResult.rows[0].id, images])

        }

        await pgClient.end()

    } catch (error) {

        console.log(error)
    }
}

productItems()