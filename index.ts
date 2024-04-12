import express from "express";
import pg from "pg";

const app = express();
const PORT = 8080;

app.use(express.static("public"))

app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`)
})
