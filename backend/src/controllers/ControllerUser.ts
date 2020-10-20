import { Request, Response } from "express";
import knex from "../database/connection";

class ControllerUser {
  async userCadastro(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const perfil_image = req.file.filename;

    const trx = await knex.transaction();

    if (name && email && password && perfil_image) {
      try {
        await trx("User").insert({
          name,
          email,
          password,
          perfil_image: `${process.env.URL_DA_HOSPEDADA}/uploads/${perfil_image}`,
        });
        await trx.commit();

        return res.status(200).json({ message: "Usuário criado com Sucesso!",success: true, });
      } catch (e) {
        await trx.rollback();
        return res
          .status(500)
          .json({ message: "Um Erro inesperado aconteceu! Tente novamente",success: false, });
      }
    } else {
      return res
        .status(400)
        .json({ message: "Nao foi recebido todos os campos!",success: false, });
    }
  }

  async userLogin(req: Request, res: Response) {
    const { email, password } = req.body;

    if (email && password) {
      try {
        const data = await knex("User")
          .where("email", email)
          .select("password","id")
          .first();

        if (data.password !== password) {
          return res.status(401).json({ message: "Senha invalida" ,success: false});
        }

        return res.status(200).json({ message: "Login efetuado com sucesso!", id: data.id ,success: true});
      } catch (error) {
        return res.status(400).json({ message: "Um Erro inesperado aconteceu! Tente novamente !",success: false });
      }
    } else {
      return res
        .status(400)
        .json({ message: "Nao foi recebido todos os campos!",success: false });
    }
  }
}
export default ControllerUser;
