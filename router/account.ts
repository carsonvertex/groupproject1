import { Router, Request, Response, NextFunction } from "express";
import formidable from "formidable";
import { pgClient } from "../pgClients";
import expressSession from "express-session";
import dotenv from "dotenv";
dotenv.config();

export const accountRouter = Router();

//get the existing products

accountRouter.get("/account",
    (req: Request, res: Response, next: NextFunction) => {
        // if (req.body.username == 'admin') {
            next()
        // }
    },
    getAllProducts
);

async function getAllProducts(req: Request, res: Response) {
    let productQueryResult = (
        await pgClient.query(
            "SELECT id,category,image,productname,price,description FROM Products"
        )
    ).rows;

    res.json({ data: { Products: productQueryResult } });
}
