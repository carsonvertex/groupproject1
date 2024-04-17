import { Router, Request, Response, NextFunction } from "express";
// import formidable from "formidable";
import { pgClient } from "../pgClients";
import expressSession from "express-session";
import dotenv from "dotenv";

dotenv.config();

export const accountRouter = Router();

//get the existing products


accountRouter.get("/checkAccount",register);

async function register(req: Request, res: Response) {
    let UserQueryResult = (
        await pgClient.query(
            "SELECT Username FROM users"
        )
    ).rows;
    console.log(UserQueryResult)
    // res.json({ data: { Products: productQueryResult } });
}

