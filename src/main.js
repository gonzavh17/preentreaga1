import "dotenv/config";
import express from "express";
import { engine } from "express-handlebars";
import { __dirname } from "./path.js";
import { Server } from "socket.io";
import path from "path";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import session from 'express-session'
import cookieParser from "cookie-parser";
import passport from 'passport';
import initializePassport from './config/passport.js';
import routerHbs from "./routes/handlebars.routes.js";
import router from "./routes/index.routes.js";
import routerMailing from "./routes/mail.routes.js";


const PORT = 8080;
const app = express();

//Server
const server = app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});

const io = new Server(server);

//Moongose
mongoose
  .connect(process.env.MONGO_URL)
  .then(async () => {
    console.log("BDD conectada");
  })
  .catch((error) =>
    console.log("Error en conexion con MongoDB Atlas: ", error)
  );

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.JWT_SECRET));
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views"));
app.use(session({
  secret: process.env.SESSION_SECRET,
  store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      mongoOptions: {
          useNewUrlParser: true,
          useUnifiedTopology: true
      },
      ttl: 600 
  }),
}));
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

//Conexion socket.io

io.on("connection", (socket) => {
  console.log("Conexion con socket.io");

  socket.on("load", async () => {
    const products = await productManager.getProducts();
    socket.emit("products", products);
  });

  socket.on("newProduct", async (product) => {
    await productManager.addProduct(product);
    const products = await productManager.getProducts();
    socket.emit("products", products);
  });
});

app.use("/static", express.static(path.join(__dirname, "/public")));
app.use('/static', routerHbs);



app.use('/', router)

app.get("*", (req, res) => {
  res.status(404).send("Error 404");
});
