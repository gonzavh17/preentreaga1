import { Router } from "express";
const routerHbs = Router();

const authAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  return res.send("Acceso exclusivo para administradores");
};

const authUser = (req, res, next) => {
  if (req.user && req.user.role === "user") {
    return next();
  }
  return res.send("Acceso exclusivo para Usuarios");
};

//HBs
routerHbs.get("/home", authUser, (req, res) => {
  res.render("home", {
    rutaCSS: "home",
    rutaJS: "home",
    email: req.user.email,
    userRole: req.user.role,
  });
});

routerHbs.get("/realtimeproducts", authAdmin, (req, res) => {
  res.render("realTimeProducts", {
    rutaCSS: "realTimeProducts",
    rutaJS: "realTimeProducts",
  });
});

routerHbs.get("/messages", authUser, (req, res) => {
  res.render("messages", {
    rutaCSS: "messages",
    rutaJS: "messages",
  });
});

routerHbs.get("/login", (req, res) => {
  res.render("login", {
    rutaCSS: "login",
    rutaJS: "login",
  });
});

routerHbs.get("/register", (req, res) => {
  res.render("register", {
    rutaCSS: "register",
    rutaJS: "register",
  });
});

export default routerHbs;
