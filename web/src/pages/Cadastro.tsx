import React, { useState, FormEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import Dropzone from "../components/dropZone";

import "../styles/pages/cadastro.css";
import imageLogo from "../assets/LTBranco.png";

import api from "../services/api";
import {
  CadastroInterface,
  IsRegisterInterface,
  LoginInterface,
  tokenGenerateInterface,
} from "../interfaces/interface";

function Cadastro() {
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File>();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  async function handleLogin(e: FormEvent) {
    e.preventDefault();

    const data = new FormData();

    if (validationFields()) {

      if (password !== confirmPassword) {
        alert("As senhas devem corresponderem!")
        return;
      }
      data.append("name",name)
      data.append("email",email)
      data.append("password",password)
      if (selectedFile) {
        data.append("perfil_image",selectedFile)
      }
      try {
        const isRegister: IsRegisterInterface = await api.post(
          "validation/is-register-email",
          { email }
        );
        if (isRegister.data.isRegisterEmail) {
          alert(isRegister.data.message);
          return;
        }
        const cadastro: CadastroInterface = await api.post('user/cadastro',data)
        if (!cadastro.data.success) {
          alert(cadastro.data.message);
          return;
        }
        const login: LoginInterface = await api.post("user/login", {
          email,
          password,
        });
        if (!login.data.success) {
          alert(login.data.message);
          return;
        }
        const token: tokenGenerateInterface = await api.get(
          "validation/token-challenger",
          {
            headers: {
              id: login.data.id,
            },
          }
        );
        if (!token.data.success) {
          alert(token.data.message);
          return;
        }
        localStorage.setItem("token", token.data.tokenChallenger);

        history.push("feed");
      } catch (error) {
        alert("Falha ao Cadastrar, tente novamente");
        return;
      }
    } else {
      alert("Preencha todos os campos e tente novamente !");
      return;
    }
  }

  function validationFields() {
    if (name && email && password && confirmPassword && selectedFile) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div id="page-cadastro">
      <header className="header">
        <div className="logo-header">
          <Link to="/">
            <FiArrowLeft size={32} color="white"/>
          </Link>
          <h1>Cadastre-se</h1>
          <img src={imageLogo} alt="Learning Today" />
        </div>
      </header>
      <div className="main">
        <form onSubmit={handleLogin}>
          <div className="inputs-body">
          <label htmlFor="name">Nome</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite seu Nome"
              className="input-cadastro"
            />
            <label htmlFor="email">Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu Email"
              className="input-cadastro"
            />
            <label htmlFor="pass">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua Senha"
              className="input-cadastro"
            />
            <label htmlFor="passConf">Confirme a Senha</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Digite sua Senha"
              className="input-cadastro"
            />
            <Dropzone onFileUploaded={setSelectedFile} />
            <button className="button-form" type="submit">
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;
