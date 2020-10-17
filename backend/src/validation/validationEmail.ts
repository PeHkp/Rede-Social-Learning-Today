import { Request, Response } from "express";
import knex from "../database/connection";

class ValidationEmail {
  async isRegisterEmail(req: Request, res: Response) {
    const { email } = req.body;

    const trx = await knex.transaction();

    try {
      const emailEncontrado = await trx("User")
        .where("email", email)
        .select("email");

      if (emailEncontrado.length >= 1) {
        return res.status(401).json({
          message: "Email ja cadastrado!",
          isRegisterEmail: true,
        });
      }
      return res
        .status(200)
        .json({ message: "Email nao cadastrado!", isRegisterEmail: false });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Um Erro inesperado aconteceu! Tente novamente" });
    }
  }
}
export default ValidationEmail;
