import express from "express";
import multer from "multer";
import uploadConfig from './config/multer';

// System Routes
import ControllerUser from "./controllers/ControllerUser";
import ControllerPost from "./controllers/ControllerPost";
import ControllerFeed from "./controllers/ControllerFeed";
import ControllerFollow from "./controllers/ControllerFollow";

// Validation Routes
import ValidationEmail from "./validation/validationEmail";
import TokenChallenger from "./validation/tokenChallenger";

const routes = express.Router();
const upload = multer(uploadConfig);

// System Objects Routes
const UserController = new ControllerUser();
const PostController = new ControllerPost();
const FeedController = new ControllerFeed();
const FollowController = new ControllerFollow();

// Validation Objects Routes
const EmailValidator = new ValidationEmail();
const TokenValidator = new TokenChallenger();

// System
routes.post("/user/cadastro",upload.single("perfil_image"), UserController.userCadastro);
routes.post("/user/login", UserController.userLogin);

routes.post("/post/create", upload.single("image"), PostController.create);
routes.put("/post/edit/:id", PostController.edit);
routes.delete("/post/delete/:id", PostController.delete);

routes.put("/feed/like/:id", FeedController.like);
routes.put("/feed/dnlike/:id", FeedController.dnlike);

routes.get("/follow/:id", FollowController.follow);
routes.get("/unfollow/:id", FollowController.unfollow);

// Validation
routes.post('/validation/is-register-email', EmailValidator.isRegisterEmail);
routes.get('/validation/token-challenger', TokenValidator.GenerateToken);

export default routes;