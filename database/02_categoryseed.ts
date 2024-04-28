import { Client } from "pg";
import dotenv from "dotenv"

dotenv.config()

console.log({
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
})

let pgClient = new Client({
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
})

type categories = {
    name: string
}

async function category() {
  
    try {
        let cat: categories[] = [
            { name: "TShirts" },
            { name: "Trousers" },
            { name: "Shoes" }
        ]

        await pgClient.connect()

        for (let entry of cat) {

            await pgClient.query("INSERT INTO categories (name) VALUES ($1)", [
                entry.name])
        }
        console.log("Test Categories input succeed!")
        await pgClient.end()

    } catch (error) {

        console.log(error)
    }
}

category()