import { Request, Response } from "express";
import knex from "../database/connection";

class ControllerExemplo {

    async index(req : Request, res : Response) {
        
        return res.json({
            nome : "pedro"
        });
      }
}
export default ControllerExemplo;