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
    description: string,
    category_id: number
}

type productsImage = {
    image: string
}

enum size {
    small = 'S',
    median = 'M',
    large = 'L',
    xlarge = 'XL',
}


type productsOptions = {
    name: string,
    color_code: string,
    size: size,
    stock: any
}

async function productItems() {
    console.log("Test products input succeed!")
    try {
        let products: products[] = [
            {
                category_id: 1, name: "American Pants", price: 499, description: "I LOVE DAY"
            },
            {
                category_id: 1, name: "English Pants", price: 599, description: "I LOVE MAY"
            },
            {
                category_id: 2, name: "Chinese Pants", price: 699, description: "I LOVE TAY"
            }
        ]

        let images: productsImage[] = [
            { image: "dummy1.jpg" },
            { image: "dummy1.jpg" },
            { image: "dummy2.jpg" }
        ]

        let productsOptions: productsOptions[] = [
            { name: "Yellow", color_code: "111", size: size.small, stock: 100 },
            { name: "Black", color_code: "222", size: size.median, stock: 100 },
            { name: "Red", color_code: "333", size: size.large, stock: 100 }
        ]


        await pgClient.connect()

        for (let entry of products) {

            let productInsertResult = await pgClient.query("INSERT INTO products (category_id, name,price,description) VALUES ($1,$2,$3,$4) RETURNING id", [
                entry.category_id, entry.name, entry.price, entry.description])

            // console.log(productInsertResult.rows[0].id)

            for (let imagesItems of images) {
                await pgClient.query("INSERT INTO product_images (product_id,image) VALUES ($1,$2)", [
                    productInsertResult.rows[0].id, imagesItems.image])
            }

            for (let productOptionsItems of productsOptions) {
            await pgClient.query("INSERT INTO product_options (product_id,color_name,color_code,sizing,stock) VALUES ($1,$2,$3,$4,$5)", [
                productInsertResult.rows[0].id, productOptionsItems.name, productOptionsItems.color_code, productOptionsItems.size,productOptionsItems.stock])
            }
        }

        await pgClient.end()

    } catch (error) {

        console.log(error)
    }
}

productItems()