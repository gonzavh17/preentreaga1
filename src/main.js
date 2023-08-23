import express from "express";
import routerProd from "./routes/product.routes.js";
import { engine } from "express-handlebars"
import routerCart from './routes/cart.routes.js'
import { __dirname } from "./path.js";
import { Server } from "socket.io";
import path from "path";
import { ProductManager } from "./controllers/productManager.js";

const productManager = new ProductManager("src/models/products.json");

const PORT = 8080;
const app = express();

//Server
const server = app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})

const io = new Server(server)

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', path.resolve(__dirname, './views'))

//Handlebars

//Conexion socket.io


io.on("connection", (socket) => {
    console.log("Conexion con socket.io")

    socket.on('load', async () => {
        const products = await productManager.getProducts()
        socket.emit('products', products)
    })

    socket.on('newProduct', async (product) => {
        await productManager.addProduct(product)
        const products = await productManager.getProducts();
		socket.emit('products', products);
    })
})


app.get('/static', (req, res) => {
    res.render('home', { 
        rutaCSS: 'index',
        rutaJS: 'index',
    })
})

app.get('/static/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', { 
        rutaCSS: 'realTimeProducts',
        rutaJS: 'realTimeProducts',
    })
})


//Rutas de productos
app.use('/api/products', routerProd);
app.use('/api/carts', routerCart)


app.use('/static', express.static(path.join(__dirname, '/public')));
app.get('*', (req, res) => {
    res.status(404).send('Error 404');
});

