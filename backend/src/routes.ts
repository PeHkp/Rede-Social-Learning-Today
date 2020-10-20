import express from "express";
import multer from "multer";
import uploadConfig from './config/multer';

// System Routes
import ControllerUser from "./controllers/ControllerUser";

// Validation Routes
import ValidationEmail from "./validation/validationEmail";
import TokenChallenger from "./validation/tokenChallenger";

const routes = express.Router();
const upload = multer(uploadConfig);

// System Objects Routes
const UserController = new ControllerUser();

// Validation Objects Routes
const EmailValidator = new ValidationEmail();
const TokenValidator = new TokenChallenger();

// System
routes.post("/user/cadastro",upload.single("perfil_image"), UserController.userCadastro);
routes.post("/user/login", UserController.userLogin);

// Validation
routes.post('/validation/is-register-email', EmailValidator.isRegisterEmail);
routes.get('/validation/token-challenger', TokenValidator.GenerateToken);

export default routes;