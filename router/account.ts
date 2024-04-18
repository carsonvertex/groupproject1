import { Router, Request, Response } from "express";
// import formidable from "formidable";
import { pgClient } from "../pgClients";
import { checkPassword, hashPassword } from "../utils/hash";



export const accountRouter = Router();

//get the existing products


accountRouter.post("/register", register);

async function register(req: Request, res: Response) {
    console.log("hi")
    let { email, username, password } = req.body;
    console.log(email, username, password)
    let hashedPassword = await hashPassword(password)
    console.log(email, username, password, hashedPassword)
    try {
        let userQueryResult = (
            await pgClient.query(
                "SELECT username,password,id FROM users WHERE email = $1 OR username = $2",
                [email, username]
            )
        );
        console.log(userQueryResult.rows)

        userQueryResult = userQueryResult.rows[0]

        //   email exists
        if (userQueryResult) {
            res.status(400).json({ message: "Duplicate entry." });
            return;
        }

        const insertResult = await pgClient.query(
            "INSERT INTO users (username, email, password,level) VALUES ($1, $2, $3,$4) RETURNING id",
            [username, email, hashedPassword, "customer"]
        );
        console.log(insertResult);
        const returningId = insertResult.rows[0].id;
        res.json({
            msg: "register successful",
            userId: returningId,
        });
    } catch (e) {
        console.log(e)
        res.status(400).json({ message: e });

    }
}