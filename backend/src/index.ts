import express from "express";
import routes from "./routes";
import path from "path";
require('dotenv').config()

const app = express();
app.use(express.json())

app.use(routes)
app.use("/uploads",express.static(path.resolve(__dirname,"..","uploads")));

app.listen(3333);
console.log("Aplicação rodando em http://localhost:3333/");