import express from "express";
import { engine } from "express-handlebars"
import { __dirname } from "./path.js";
import { Server } from "socket.io";
import path from "path";
import { ProductManager } from "./controllers/productManager.js";
import productRouter from "./routes/product.routes.js";
import mongoose from "mongoose";
import cartRouter from './routes/cart.routes.js'
import messageRouter from "./routes/messages.routes.js";

const productManager = new ProductManager("src/models/products.json");

const PORT = 8080;
const app = express();


//Server
const server = app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})

const io = new Server(server)

//Moongose
mongoose.connect('mongodb+srv://keyapi22:coderhouse@cluster0.hkittje.mongodb.net/?retryWrites=true&w=majority')
.then(() => console.log('BDD conectada'))
.catch ((error) => console.log("Error en conexion con MongoDB Atlas: ", error))

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', path.resolve(__dirname, './views'))


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
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter)
app.use('/api/message', messageRouter );


app.use('/static', express.static(path.join(__dirname, '/public')));
app.get('*', (req, res) => {
    res.status(404).send('Error 404');
});

