import express from "express";
import expressSession from "express-session";
import dotenv from "dotenv"
import { accountRouter } from "./router/account";
import { catRouter } from "./router/cat";
import { productRouter } from "./router/product";


declare module "express-session" {
    interface SessionData {
        userId: number;
        username: string;
    }
}

dotenv.config();

const app = express();
const PORT = 8080;

if (!process.env.SECRET)
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
app.use(express.urlencoded({ extended: true }))

//api
app.use("/account", accountRouter);
app.use("/cat", catRouter);
app.use("/product", productRouter);

//static assets
app.use(express.static('public', {
    setHeaders: (res, path, stat) => {
      res.set('Content-Type', 'application/javascript');
    }
  }));
app.use(express.static("uploads"))

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})
