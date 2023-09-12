import { Router } from "express";
import { CartManager } from "../controllers/cartManager.js";
import cartModel from "../models/cart.model.js";

const cartRouter = Router()

cartRouter.get('/', async(req, res) => {
  const {limit} = req.query

  try {
    const carts = await productModel.find().limit(limit)
    res.status(200).send({resultado: "OK", message: carts})
  } catch(error) {
    res.status(400).send({error: `Error al consultar carrito ${error}`})
  }
})

cartRouter.get("/:cid", async (req, res) => {
  const {cid} = req.params

  try{
    const cart = await cartModel.findById(cid)
    if(cart) res.status(200).send({resultado: "OK", message: cart})
    else res.status(404).send({resultado: "Not Found", message: cart})
  } catch(error) {
    res.status(400).send({ error: `Error al consultar productos ${error}` });
  }
})

// CREAR NUEVO CARRITO


cartRouter.post("/", async(req, res) => {
  const{id_prod, quantity} = req.body

  try{
    const respuesta = await cartModel.create({
      id_prod,
      quantity
    })
    res.status(200).send({ resultado: 'OK', message: respuesta });
  } catch(error){
    res.status(400).send({ error: `Error al consultar productos ${error}` });
  }
})


// Agregar producto al carrito
cartRouter.post('/:cid/products/:pid', async (req, res) => {
  const { cid, pid } = req.params
  const { quantity } = req.body

  try {
    const searchCart = await cartModel.findById(cid)

    if (searchCart) {
      searchCart.products.push({ id_prod: pid, quantity: quantity })

      const updatedCart = await searchCart.save()

      res.status(200).send({ result: 'OK', message: 'Producto agregado exitosamente', cart: updatedCart })
    } else {
      res.status(404).send({ error: 'Carrito no encontrado' })
    }
  }

  catch (error) {
    res.status(400).send({ error: `Error al añadir producto: ${error}` })
  }
})

// Update a Cart
cartRouter.put("/:cid", async(req, res) => {
  const {cid} = req.params
  const {id_prod, quantity} = req.body

  try{
    const cart = await cartModel.findByIdAndUpdate(cid, {
      id_prod,
      quantity
    })
    if(cart) res.status(200).send({resultado: "OK", message: cart})
    else res.status(404).send({resultado:'Not Found', message: cart})
  } catch (error) {
    res.status(400).send({ error: `Error al consultar productos ${error}` });
  }
})



cartRouter.delete("/:cid", async(req, res) => {
  const { cid } = req.params;

  try{
    const cart = await cartModel.findByIdAndDelete(cid)
    if(cart) res.status(200).send({resultado: "OK", message: cart})
    else res.status(400).send({resultado:"Not Found", message: cart})
  } catch(error) {
    res.status(400).send ({ error:`Error al eliminar carritos: ${error}`});
  }
})




export default cartRouter;



// CART ROUTES CON CART MANAGER
/* 
const cartManager = new CartManager(
  "src/models/cart.json",
  "src/models/products.json"
);

const routerCart = Router();

routerCart.post("/", async (req, res) => {
  if (cartManager.getCarts().length > 0) {
    const newProduct = req.body;
    await productManager.addProduct(newProduct);
    res.status(201).send("Producto creado exitosamente");
  } else {
    res.status(400).send("Carrito ya creado");
  }
});

routerCart.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  const cart = await cartManager.getCartsByID(cid);

  if (cart) res.status(200).send(cart);
  else res.status(404).send("Carrito no encontrado");
});

routerCart.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  const succesPost = await cartManager.addProductToCart(cid, pid, quantity);
  if (succesPost) res.status(201).send("Producto agregado correctamente");
  else res.status(404).send("Carrito no encontrado");
});

routerCart.delete("/:cid", async (req, res) => {
  const cartID = req.params.cid;
  const succesfullDelete = await cartManager.deleteCart(cartID);

  if (succesfullDelete)
    res.status(200).send("Producto eliminado del carrito correctamente");
  else res.status(404).send("Producto del carrito no hallado");
}); */