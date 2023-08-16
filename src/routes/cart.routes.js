import { Router } from "express";
import { CartManager } from "../controllers/cartManager.js";

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
});

export default routerCart;
