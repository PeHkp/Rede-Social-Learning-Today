import { Request, Response } from "express";
import knex from "../database/connection";

class ControllerPost {
  async like(req: Request, res: Response) {
    const { id } = req.params;
    const { token } = req.headers;

    const trx = await knex.transaction();

    if (token && id) {
      try {
        const data_user = await trx("User")
          .where("token_challenger", token)
          .select("id")
          .first();
        let { like } = await trx("Post").where("id", id).select("like").first();
        await trx.commit();

        if (!data_user.id) {
          return res.status(401).json({
            message: "Voce nao tem autorização para curtir esse post!",
            success: false,
          });
        }
        like = like + 1;
        await trx("Post").where("id", id).update({ like });
        await trx.commit();
        return res
          .status(200)
          .json({ message: "Post curtido com sucesso!", success: true });
      } catch (error) {
        await trx.rollback();
        return res.status(500).json({
          message: "Um Erro inesperado aconteceu! Tente novamente",
          success: false,
        });
      }
    }
  }
  async dnlike(req: Request, res: Response) {
    const { id } = req.params;
    const { token } = req.headers;

    const trx = await knex.transaction();

    if (token && id) {
      try {
        const data_user = await trx("User")
          .where("token_challenger", token)
          .select("id")
          .first();
        let { like } = await trx("Post").where("id", id).select("like").first();
        await trx.commit();

        if (!data_user.id) {
          return res.status(401).json({
            message: "Voce nao tem autorização para curtir esse post!",
            success: false,
          });
        }
        if (like == 0) {
          return res
            .status(200)
            .json({ message: "Post descurtido com sucesso!", success: true });
        }

        like = like - 1;
        await trx("Post").where("id", id).update({ like });
        await trx.commit();
        return res
          .status(200)
          .json({ message: "Post curtido com sucesso!", success: true });
      } catch (error) {
        await trx.rollback();
        return res.status(500).json({
          message: "Um Erro inesperado aconteceu! Tente novamente",
          success: false,
        });
      }
    }
  }
}

export default ControllerPost;
