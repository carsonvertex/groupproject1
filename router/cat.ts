import { Router, Request, Response } from "express";
import { pgClient } from "../pgClients";


export const catRouter = Router();

catRouter.get("/showCat", showCat);
catRouter.post("/newCat", newCat);
catRouter.put("/editCat", editCat);
// catRouter.delete("/delCat", delCat);

async function showCat(req: Request, res: Response) {
    let catQueryResult = (
        await pgClient.query(
            "SELECT name FROM categories;"
        )
    ).rows;
    res.json({ data: { cat: catQueryResult } })

}

async function newCat(req: Request, res: Response) {
    let { name } = req.body;
    try {
        let catQueryResult = (
            await pgClient.query("SELECT id,name FROM categories WHERE name = $1;", [name])
        ).rows[0];
        if (catQueryResult) {
            res.status(400).json({ message: "Category already exists." });
            return;
        }
        const insertResult = await pgClient.query(
            "INSERT INTO categories (name) VALUES ($1) returning id",
            [name]
        );
        const returningId = insertResult.rows[0].id;
        res.json({
            msg: "Category Created",
            userId: returningId,
        });
    } catch (e) {
        console.log(e);
        res.status(400).json({ message: e });
    }
}






async function editCat(req: Request, res: Response) {
    let { name } = req.body;
    let catUpdateResult = await pgClient.query(
        "UPDATE categories SET name=$1 RETURNING *",
        [name]
    );

    if (catUpdateResult.rowCount == 1) {
        res.json({
            message: "update success",
        });
    }}

// async function delCat(req: Request, res: Response) {
// }