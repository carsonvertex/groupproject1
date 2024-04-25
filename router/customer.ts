import { Router, Request, Response } from "express";
import { pgClient } from "../pgClients";

export const customerRouter = Router();

customerRouter.get(`/category`, showProduct);


//customer
async function showProduct(req:Request,res:Response) {
  let categoryQueryResult = (await pgClient.query(`SELECT * FROM categories;`)).rows;
  res.json({data:{cats:categoryQueryResult}});
  
}