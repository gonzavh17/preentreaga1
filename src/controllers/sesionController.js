import { generateToken } from "../utils/jwt.js";

const register = async (req, res) => {
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
}

const login = async(req, res) => {
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
}

const getCurrentSession = async(req, res) => {
    res.status(200).send(req.user)
}

const getGithubCreateUser = async(req, res) => {
    res.status(200).send({ mensaje: 'Usuario creado' })
}

const getGithubSessions = async(req, res) => {
    req.session.user = req.user
    res.redirect('/static/home');
}

const logout = async(req, res) => {
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
}


const sessionController = {
    register, 
    login,
    getCurrentSession,
    getGithubCreateUser,
    getGithubSessions,
    logout
}

export default sessionController
