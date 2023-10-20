import { Router } from "express";
import passport from "passport";
import 'dotenv/config'
import { authorization, passportError } from "../utils/messageErrors.js";
import sessionController from "../controllers/sesionController.js";

const routerSession = Router();

routerSession.post('/register', passport.authenticate('register'), sessionController.register);
routerSession.post('/login', passport.authenticate('login'), sessionController.login)
routerSession.get('/current', passportError('jwt'), authorization('user'), sessionController.getCurrentSession)
routerSession.get('/github', passport.authenticate('github', { scope: ['user:email'] }), sessionController.getGithubCreateUser )
routerSession.get('/githubSessions', passport.authenticate('github'), sessionController.getGithubSessions)
routerSession.get('/logout', sessionController.logout)

export default routerSession;

/* routerSession.get('/testJWT', passport.authenticate('jwt', {session: true}),  async (req, res) => {
    res.status(200).send({rmensaje: req.user})
    req.sessionStore.user = {
        first_name: req.user.user.first_name,
        last_name: req.user.user.last_name,
        age: req.user.user.age,
        email: req.user.user.email
    }
    }) */