import { Router, Request, Response } from "express";
// import formidable from "formidable";
import { pgClient } from "../pgClients";
import expressSession from "express-session";
import dotenv from "dotenv";
import { UserQueryType } from "../utils/type";
import { hashPassword,checkPassword } from "../utils/hash";

dotenv.config();

export const accountRouter = Router();

//get the existing products

accountRouter.post("/register",register)

accountRouter.post("/login",login)


async function register(req: Request, res: Response) {
    let { email, username, password } = req.body;
    let hashedPassword = await hashPassword(password)
    try {
      let userQueryResult: UserQueryType | undefined = (
        await pgClient.query(
          "SELECT username,password,id FROM users WHERE email = $1 OR username =$2", [email,username]
        )
      ).rows[0];
   console.log(userQueryResult)
      
  
      //   email exists
      if (userQueryResult) {
        res.status(400).json({ message: "Duplicate entry." });
        return;
      }
  
      const insertResult = await pgClient.query(
        "inserT inTo users (username, email, password) Values ($1, $2, $3) returning id",
        [username, email, hashedPassword]
      );
      console.log(insertResult);
      const returningId = insertResult.rows[0].id;
      res.json({
        msg: "register successful",
        userId: returningId,
      });
    } catch (e) {
      res.status(400).json({ message: e });
    }
  }

async function login(req:Request,res:Response){};
