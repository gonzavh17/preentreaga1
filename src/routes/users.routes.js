import { Router } from "express";
import passport from "passport";
import userController from "../controllers/userController.js";

const routerUser = Router();

routerUser.post('/', passport.authenticate('register'), userController.postUser)

export default routerUser;