import jwt from "jsonwebtoken";
import "dotenv/config";

export const generateToken = (user) => {
  const token = jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: "12h",
  });
  return token;
};

/* console.log(
  generateToken({
    _id: "65136ca42ded361d20698038",
    first_name: "Pedro",
    last_name: "Perez",
    email: "pedro@pedro.com",
    rol: "Admin",
    age: { $numberInt: "21" },
  })
); */

export const authToken = (req, res, next) => {
  const authHeader = req.header.authorization;

  if (!authHeader) {
    return res.status(401).send({ error: "Usuario no autenticado" });
  }

  const token = authHeader.split(" ")[1];

  jwt.sign(token, process.env.JWT_SECRET, (error, credentials) => {
    if (error) {
      res.status(403).send({ error: "Usurio no autorizado" });
    }

    req.user = credentials.user;
    next();
  });
};
