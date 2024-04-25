import { Router, Request, Response } from "express";
import express from "express";


export const securityCheckRouter = Router();

const app = express();

securityCheckRouter.get("/", landingPage);
securityCheckRouter.get("/landingPage", landingPage);



async function landingPage(req: Request, res: Response) {
    try {
        // Check if the user is logged in
        if (!req.session.userId) {
            // Redirect the user to the login page or display an error message
            return res.redirect("/login.html");
        }

        // Retrieve the user's account level from the session
        const userLevel = req.session.level;

        // Check the user's account level and redirect them accordingly
        if (userLevel === "customer") {
            app.get("/customerPage", (req, res) => {
                res.send("/customerPage.html")
            });
        } else if (userLevel === "admin") {
            app.get("/cat", (req, res) => {
                res.send("/cat.html");
            });
        } else if (userLevel === "superadmin") {
            app.get("/superadmin", (req, res) => {
                res.send("/superadmin.html")
            });
        } else {
            // Handle the case when the user's account level is unknown or invalid
            return res.status(403).json({ message: "Access denied" });
        }
    } catch (error) {
        console.error("An error occurred on the landing page:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}