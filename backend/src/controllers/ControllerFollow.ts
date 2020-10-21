import { Request, Response } from "express";
import knex from "../database/connection";

class ControllerPost {
  async follow(req: Request, res: Response) {
    const { id } = req.params;
    const { token } = req.headers;

    const trx = await knex.transaction();

    if (token && id) {
      try {
        const data_user = await trx("User")
          .where("token_challenger", token)
          .select("id")
          .first();

        if (!data_user.id) {
          return res.status(401).json({
            message: "Voce nao tem autorização para seguir!",
            success: false,
          });
        }

        let { follow } = await trx("User")
          .where("id", data_user.id)
          .select("follow")
          .first();

        const arrayFollows = follow.split(",");

        arrayFollows.push(id);

        await trx("User")
          .where("id", data_user.id)
          .update({ follow: arrayFollows });
        await trx.commit();
        return res
          .status(200)
          .json({ message: "Usuário seguido com sucesso!", success: true });
      } catch (error) {
        await trx.rollback();
        return res.status(500).json({
          message: "Um Erro inesperado aconteceu! Tente novamente",
          success: false,
          error,
        });
      }
    }
  }
  async unfollow(req: Request, res: Response) {
    const { id } = req.params;
    const { token } = req.headers;

    const trx = await knex.transaction();

    if (token && id) {
      try {
        const data_user = await trx("User")
          .where("token_challenger", token)
          .select("id")
          .first();

        if (!data_user.id) {
          return res.status(401).json({
            message: "Voce nao tem autorização para seguir!",
            success: false,
          });
        }

        let { follow } = await trx("User")
          .where("id", data_user.id)
          .select("follow")
          .first();

        const arrayFollows = follow.split(",");

        arrayFollows.splice(arrayFollows.indexOf(id), 1);

        await trx("User")
          .where("id", data_user.id)
          .update({ follow: arrayFollows });
        await trx.commit();
        return res
          .status(200)
          .json({
            message: "Usuário deixado de seguir com sucesso!",
            success: true,
          });
      } catch (error) {
        await trx.rollback();
        return res.status(500).json({
          message: "Um Erro inesperado aconteceu! Tente novamente",
          success: false,
          error,
        });
      }
    }
  }
}

export default ControllerPost;
