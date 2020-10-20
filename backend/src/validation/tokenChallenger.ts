import { Request, Response } from "express";
import crypto from "crypto";

import knex from "../database/connection";

class TokenChallenger {
  async GenerateToken(req: Request, res: Response) {
    const { id } = req.headers;

    const trx = await knex.transaction();

    if (id) {
      try {
        const token = `${Date.now()}${id}${crypto
          .randomBytes(16)
          .toString("hex")}`;

        await trx("User").update({
          token_challenger: token,
        });
        await trx.commit();

        return res
          .status(200)
          .json({
            message: "Token gerado com sucesso!",
            tokenChallenger: token,
            success: true,
          });
      } catch (error) {
        await trx.rollback();
        return res
          .status(500)
          .json({ message: "Um Erro inesperado aconteceu! Tente novamente",success: false,});
      }
    }else {
      return res
          .status(400)
          .json({ message: "Um Erro aconteceu ao gerar o Token! Tente novamente",success: false, });
      }
    }
}
export default TokenChallenger;
