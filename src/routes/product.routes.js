import { Router } from "express";
import {ProductManager} from '../controllers/productManager.js'

const productManager = new ProductManager(
  "src/models/products.json"
); /* DUDA: para referir la ruta del product Manager, que debo hacer, poner la ruta relativa src/controllers/productManager.js, o la ruta desde este archivo */

const routerProd = Router();

routerProd.get("/", async (req, res) => {
  const { limit } = req.query;

  const prods = await productManager.getProducts();
  const products = limit ? prods.slice(0, limit) : prods;

  res.status(200).send(products);
});

routerProd.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  const prod = await productManager.getProductByID();

  if (prod) res.status(200).res.send(prod);
  else res.status(404).send("Product not found");
});

routerProd.post("/", async (req, res) => {
  const newProduct = req.body;
  await productManager.addProduct(newProduct);
  res.status(201).send("Producto creado exitosamente");
});

routerProd.put("/:pid", async (req, res) => {
  const { pid } = req.params;
  await productManager.updateProduct(pid, req.body);
  res.status(200).res.send("Producto modificado exitosamente");
});

routerProd.delete("/:pid", async (req, res) => {
  const { pid } = req.params;
  await productManager.deleteProduct(pid);
  res.status.send("Producto eliminado exitosamente");
});

export default routerProd;
