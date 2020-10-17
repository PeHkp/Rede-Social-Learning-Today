import express from "express";
import multer from "multer";
import uploadConfig from './config/multer';

// System Routes
import ControllerUser from "./controllers/ControllerUser";

// Validation Routes
import ValidationEmail from "./validation/validationEmail";

const routes = express.Router();
const upload = multer(uploadConfig);

// System Objects Routes
const UserController = new ControllerUser();

// Validation Objects Routes
const EmailValidator = new ValidationEmail();

// System
routes.post("/user/cadastro",upload.single("perfil_image"), UserController.userCadastro);

// Validation
routes.post('/validation/is-register-email', EmailValidator.isRegisterEmail);

export default routes;