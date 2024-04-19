import { Client } from "pg";
import dotenv from "dotenv"
import { hashPassword } from "../utils/hash";

dotenv.config()

enum Level {
    customer = 'customer',
    admin = 'admin',
    super_admin = 'super_admin'
}


let pgClient = new Client({
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
})

type userType = {
    email: string,
    username: string,
    password: string,
    level: Level
}


async function Users() {
    console.log("Test Users input succeed!")
    try {
        let fakeUsers: userType[] = [
            { email: "test@gamil.com", username: "test", password: "1234", level: Level.customer },
            { email: "admin@gamil.com", username: "admin", password: "1234", level: Level.admin },
            { email: "superadmin@gamil.com", username: "superadmin", password: "4321", level: Level.super_admin }
        ]

        await pgClient.connect()

        for (let entry of fakeUsers) {
            let hashed = await hashPassword(entry.password)

            await pgClient.query("INSERT INTO users (email,username,password,level) VALUES ($1,$2,$3,$4)", [
                entry.email, entry.username, hashed, entry.level])
        }

        await pgClient.end()
    } catch (error) {
        console.log(error)
    }

}


type categories = {
    name: string
}

async function category() {
    console.log("Test Categories input succeed!")
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

        await pgClient.end()

    } catch (error) {

        console.log(error)
    }
}



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





Users()
category()
productItems()
productOptions()
productImage()
