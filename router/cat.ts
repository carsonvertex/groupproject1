import { Router, Request, Response } from "express";
import { pgClient } from "../pgClients";

export const catRouter = Router();

catRouter.get("/showCat", showCat);
catRouter.post("/newCat", newCat);
catRouter.put("/editCat", editCat);
catRouter.delete("/delCat", delCat);

async function showCat(req: Request, res: Response) {
    let catQueryResult = (
        await pgClient.query(
            "SELECT  name,id FROM categories ORDER BY ID ASC;"
        )
    ).rows;
    res.json({ cat: catQueryResult })

}

async function newCat(req: Request, res: Response) {
    let { category } = req.body;
    console.log(category)
    try {
        let catQueryResult = (
            await pgClient.query("SELECT id,name FROM categories WHERE name = $1;", [category])
        ).rows[0];
        console.log(catQueryResult);
        if (catQueryResult) {
            res.status(400).json({ message: "Category already exists." });
            return;
        }
        const insertResult = await pgClient.query(
            "INSERT INTO categories (name) VALUES ($1) returning id",
            [category]
        );
        const returningId = insertResult.rows[0].id;
        res.json({
            msg: "Category Created",
            Id: returningId,
        });
        console.log(res.json)
    } catch (e) {
        console.log(e);
        res.status(400).json({ message: e });
    }
}


async function editCat(req: Request, res: Response) {
    let { name } = req.body;
    let { id } = req.query;
    let catUpdateResult = await pgClient.query(
        "UPDATE categories SET name=$1 WHERE id = $2 RETURNING *",
        [name, id]
    );

    if (catUpdateResult.rowCount == 1) {
        res.json({
            message: "update success",
        });
    }
}

async function delCat(req: Request, res: Response) {

    let targetId = parseInt(req.query.id as string);

    let catDeleteResult = await pgClient.query(
        "DELETE FROM categories WHERE id =$1",
        [targetId]
    );

    if (catDeleteResult.rowCount == 1) {
        res.json({ message: "Delete category successful" });
    } else {
        res.status(400).json({ message: "Delete category failed" });
    }

}