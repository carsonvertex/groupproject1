import { Client } from "pg";
import dotenv from "dotenv"


let pgClient = new Client({
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
})

dotenv.config()

type categories = {
    name: string
}

async function category() {
  
    try {
        let cat: categories[] = [
            { name: "catergory_test1" },
            { name: "catergory_test2" },
            { name: "catergory_test3" }
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