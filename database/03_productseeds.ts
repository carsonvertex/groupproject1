import { Client } from "pg";
import dotenv from "dotenv"


let pgClient = new Client({
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
})

dotenv.config()

type products = {
    name: string,
    price: any,
    description: string
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

        await pgClient.connect()

        for (let entry of products) {

            await pgClient.query("INSERT INTO categories (name) VALUES ($1,$2,$3)", [
                entry.name,entry.price,entry.description])
        }

        await pgClient.end()

    } catch (error) {

        console.log(error)
    }
}

productItems()