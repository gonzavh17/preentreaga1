import { Router } from "express";
import passport from "passport";
import 'dotenv/config'
import { generateToken } from "../utils/jwt.js";
import { authorization, passportError } from "../utils/messageErrors.js";

const routerSession = Router();

routerSession.post('/register', passport.authenticate('register'), async (req, res) => {
    try {
        if (!req.user) {
            res.status(401).send({ error: `Error al registrar usuario` });
        }
        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            age: req.user.age,
            email: req.user.email,
            role: req.user.role
        }
        const token = generateToken(req.user)
        res.cookie('jwtCookie', token, {
            maxAge: 43200000
        })
        res.status(200).send({ payload: req.user })
    }
    catch (error) {
        res.status(500).send({ mensaje: `Error al registrar usuario ${error}` });
    }
});

routerSession.post('/login', passport.authenticate('login'), async (req, res) => {
    try {
        if (!req.user) {
            res.status(401).send({ error: `Error al iniciar sesion` });
        }
        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            age: req.user.age,
            email: req.user.email,
            role: req.user.role
        }
        res.status(200).send({ payload: req.user })
    } catch (error) {
        res.status(500).send({ mensaje: `Error al iniciar sesion ${error}` });
    }
})

routerSession.get('/current', passportError('jwt'), authorization('user'), (req, res) => {
    res.send(req.user)
})

routerSession.get('/testJWT', passport.authenticate('jwt', {session: true}),  async (req, res) => {
    res.status(200).send({rmensaje: req.user})
    req.sessionStore.user = {
        first_name: req.user.user.first_name,
        last_name: req.user.user.last_name,
        age: req.user.user.age,
        email: req.user.user.email
    }
})

routerSession.get('/github', passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => {
    res.status(200).send({ mensaje: 'Usuario creado' })
})

routerSession.get('/githubSessions', passport.authenticate('github'), async (req, res) => {
    req.session.user = req.user
    res.redirect('/static/home');
})

routerSession.get('/logout', (req, res) => {
    if (req.session.user) {
        try {
            req.session.destroy()
            res.clearCookie('jwtCookie')
            res.status(200).send({ resultado: 'Has cerrado sesion' })
        }
        catch (error) {
            res.status(400).send({ error: `Error al cerrar sesion: ${error}` });
        }
    } else {
        res.status(400).send({ error: `No hay sesion iniciada` });
    }
   
})

export default routerSession;