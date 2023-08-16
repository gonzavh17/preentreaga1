import express from "express";
import routerProd from "./routes/product.routes.js";
import routerCart from './routes/cart.routes.js'
import { __dirname } from "./path.js";
import path from "path";

const PORT = 8080;
const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Rutas de productos
app.use('/api/products', routerProd);
app.use('/api/carts', routerCart)

app.use('/static', express.static(path.join(__dirname, '/public')));
app.get('*', (req, res) => {
    res.status(404).send('Error 404');
});

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})