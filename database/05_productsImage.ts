import { Client } from "pg";
import dotenv from "dotenv"


let pgClient = new Client({
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
})

dotenv.config()



type productsImage = {
    image: string
}


async function productImage() {
    console.log("Test ProductImage input succeed!")
    try {
        let images: productsImage[] = [
            { image: "image_test1"},
            { image: "image_test2"},
            { image: "image_test3"}
        ]

        await pgClient.connect()

        for (let entry of images) {

            await pgClient.query("INSERT INTO categories (name) VALUES ($1)", [
                entry.image])
        }

        await pgClient.end()

    } catch (error) {

        console.log(error)
    }
}

productImage()
