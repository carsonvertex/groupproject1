import express from "express";
import expressSession from "express-session";
import { Request, Response } from "express";
import dotenv from "dotenv"
import { adminRouter } from "./router/admin";

declare module "express-session" {
    interface SessionData {
        secret:string|undefined;
        userId: number;
        username: string;
    }
}

dotenv.config();

const app = express();
const PORT = 8080;

app.use(
    expressSession({
        secret: "sadasdassdvs",
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
