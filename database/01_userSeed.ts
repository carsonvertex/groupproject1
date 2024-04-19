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



Users()

