import express from "express";
import expressSession from "express-session";
import dotenv from "dotenv"
import { accountRouter } from "./router/account";

declare module "express-session" {
    interface SessionData {
     
        userId: number;
        username: string;
    }
}

dotenv.config();

const app = express();
const PORT = 8080;

if(!process.env.SECRET)
    throw Error("No Secret in .env");
    

app.use(
    expressSession({
        secret: process.env.SECRET,
        saveUninitialized: true,
        resave: true,
    })
);
//PARSING MIDDLEWARE
app.use(express.json())

//api
app.use("/account", accountRouter);

//static assets
app.use(express.static("public"))
app.use(express.static("uploads"))

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})
