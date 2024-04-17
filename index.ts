import express from "express";
import expressSession from "express-session";
import { Request, Response } from "express";
import dotenv from "dotenv"
import { adminRouter } from "./router/admin";

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

//api
app.use("/admin", adminRouter);

//static assets
app.use(express.static("public"))

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})
