import React, { useState, FormEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiEye } from "react-icons/fi";

import "../styles/pages/login.css";
import imagemGrande from "../assets/heroes.png";

import api from "../services/api";
import {
  IsRegisterInterface,
  LoginInterface,
  tokenGenerateInterface,
} from "../interfaces/interface";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  async function handleLogin(e: FormEvent) {
    e.preventDefault();

    if (validationFields()) {
      try {
        const isRegister: IsRegisterInterface = await api.post(
          "validation/is-register-email",
          { email }
        );
        console.log(isRegister);
        if (!isRegister.data.isRegisterEmail) {
          alert(isRegister.data.message);
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
        alert("Falha ao login, tente novamente");
        return;
      }
    } else {
      alert("Preencha todos os campos e tente novamente !");
      return;
    }
  }

  function validationFields() {
    if (email && password !== "") {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div id="page-login">
      <header className="header">
        <div className="logo-header">
          <h1>Learning Today</h1>
        </div>
        <div className="menu-header">
          <Link to="/home" className="link-button">
            Inicio
          </Link>
          <Link to="/about" className="link-button">
            Sobre
          </Link>
        </div>
      </header>
      <div className="main">
        <img src={imagemGrande} alt="Learning Today" />
        <form onSubmit={handleLogin}>
          <div className="inputs-body">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu Email"
              className="input-login"
            />
            <label htmlFor="pass">Senha</label>
            <FiEye
              className="eyeButton"
              color={"#7575ca"}
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua Senha"
              className="input-login"
            />
            <button className="button-form" type="submit">
              Entrar
            </button>
          </div>
        </form>
        <Link to="/cadastro" className="link-button">
          Cadastrar-se
        </Link>
      </div>
    </div>
  );
}

export default Login;
