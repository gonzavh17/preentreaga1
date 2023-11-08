import userModel from "../models/users.model.js";

const postUser = async(req, res) => {
    try {
        if (!req.user) {
            return res.status(400).send({ mensaje: 'Usuario ya existente' })
        }
        return res.status(200).send({ mensaje: 'Usuario creado' })
    } catch (error) {
        res.status(500).send({ mensaje: `Error al crear usuario ${error}` })
    }
}

const validateUserData = (user) => {
    const requiredFields = ['email', 'last_name', 'first_name', ];
  
    const missingFields = requiredFields.filter(field => !(field in user));
  
    if (missingFields.length > 0) {
        throw CustomError.createError({
            name: EErrors.MISSING_REQUIRED_FIELDS.name,
            message: generateUserErrorInfo(user),
            code: EErrors.MISSING_REQUIRED_FIELDS.code,
        });
    }
  };

const userController = {
    postUser,
    validateUserData
}

export default userController