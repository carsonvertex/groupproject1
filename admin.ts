import express from "express";
import session from "express-session";
import expresssession from "express-session";
import { Request,Response } from "express";
import dotenv from "dotenv"
import pg from 'pg'

const { Client } = pg
const admin=express();
const PORT = 8080;
 
const client = new Client({
  host: 'my.database-server.com',
  port: 5334,
  database: 'database-name',
  user: 'postgres',
  password: 'postgres',
})


admin.use(session({
    secret:'asdadwwad',
    resave:false,
    saveUninitialized:false
}))

client.connect()

