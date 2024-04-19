import { Client } from "pg";
import dotenv from "dotenv"


let pgClient = new Client({
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
})

dotenv.config()

enum size {
    small = 'S',
    median = 'M',
    Xlarge = 'XL',
    XXlarge = 'XXL'
}


type productsOptions = {
    name: string,
    colorCode: string,
    size: size,
    stock: any
}


async function productOptions() {
    console.log("Test ProductOptions input succeed!")
    try {
        let products: productsOptions[] = [
            { name: "Products_test1", colorCode: "111", size: size.small, stock: 100 },
            { name: "Products_test2", colorCode: "222", size: size.median, stock: 100 },
            { name: "Products_test3", colorCode: "333", size: size.XXlarge, stock: 100 }
        ]

        await pgClient.connect()

        for (let entry of products) {

            await pgClient.query("INSERT INTO categories (name) VALUES ($1,$2,$3,$4)", [
                entry.name, entry.colorCode, size, entry.stock])
        }

        await pgClient.end()

    } catch (error) {

        console.log(error)
    }
}

productOptions()
