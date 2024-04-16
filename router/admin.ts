import { Router, Request, Response, NextFunction } from "express";
import pg from "pg";
// import { UserQueryType } from "../types";

export const adminRouter = Router();

adminRouter.get("/admin");

adminRouter.post("/admin");

