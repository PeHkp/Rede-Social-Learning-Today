import express from "express";

import Exemplo from "./controllers/ControllerExemplo"

const routes = express.Router();

const exemplo = new Exemplo()

routes.get("/exemplo",exemplo.index)

export default routes;