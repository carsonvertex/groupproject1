import express from "express";
import expressSession from "express-session";
import dotenv from "dotenv"
import { accountRouter } from "./router/account";
import { catRouter } from "./router/cat";
import { productRouter } from "./router/product";
import { securityCheckRouter } from "./router/securityPage";
import { checkAdminPermission, checkCustomerPermission, checkSuperAdminPermission } from "./utils/guard";
import { customerRouter } from "./router/customer";
import { shopping_cartRouter } from "./router/shopping_cart";


declare module "express-session" {
    interface SessionData {
        userId: number;
        username: string;
        level:string;
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
app.use("/cat", checkAdminPermission, catRouter);
app.use("/product", checkAdminPermission, productRouter);

app.use("/", securityCheckRouter);
app.use("/customer", checkCustomerPermission, customerRouter);


app.use("/customer", checkCustomerPermission, customerRouter);

app.use("/cart", checkCustomerPermission, shopping_cartRouter)
//static assets
app.use(express.static('public'));
app.use(express.static("uploads"))

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})
