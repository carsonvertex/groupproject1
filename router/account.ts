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
    register
);

async function register(req: Request, res: Response) {
    let isUsernameDuplicated = (
        await pgClient.query(
            "SELECT username FROM users"
        )
    ).rows;
    console.log(isUsernameDuplicated)

    // res.json({ data: { Products: productQueryResult } });
}

