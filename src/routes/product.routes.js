import { Router } from "express";
import productModel from "../models/products.model.js";

const productRouter = Router();

productRouter.get("/", async (req, res) => {
  const { limit } = req.query;

  try {
    const prods = await productModel.find().limit(limit);
    res.status(200).send({ resultado: "OK", message: prods });
  } catch (error) {
    res.status(400).send({ error: `Error al consultar productos ${error}` });
  }
});

productRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const prod = await productModel.findById(id);
    if (prod) res.status(200).send({ resultado: "OK", message: prod });
    else res.status(404).send({ resultado: "Not Found", message: prod });
  } catch (error) {
    res.status(400).send({ error: `Error al consultar productos ${error}` });
  }
});

productRouter.post("/", async (req, res) => {
  const { title, description, stock, code, price, category } = req.body;

  try {
    const respuesta = await productModel.create({
      title,
      description,
      stock,
      code,
      price,
      category,
    });
    res.status(200).send({ resultado: "ok", message: respuesta });
  } catch (error) {
    res.status(400).send({ error: `Error al crear producto ${error}` });
  }
});

productRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, stock, code, price, category, status } = req.body;

  try {
    const respuesta = await productModel.findByIdAndUpdate(id, {
      title, description, stock, code, price, category, status
    });
    if (prod) res.status(200).send({ resultado: "OK", message: respuesta });
    else res.status(404).send({ resultado: "Not Found", message: respuesta });
  } catch (error) {
    res.status(400).send({ error: `Error al consultar productos ${error}` });
  }
});

productRouter.delete("/", async (req, res) => {
  const { id } = req.params;


  try {
    const respuesta = await productModel.findByIdAndDelete(id)

    if (prod) res.status(200).send({ resultado: "OK", message: respuesta });
    else res.status(404).send({ resultado: "Not Found", message: respuesta });
  } catch (error) {
    res.status(400).send({ error: `Error al consultar productos ${error}` });
  }
});

export default productRouter


//ROUTES CON PRODUCT MANAGER
/* import { Router } from "express";
import { ProductManager } from "../controllers/productManager.js";

const productManager = new ProductManager("src/models/products.json");

const routerProd = Router();

routerProd.get("/", async (req, res) => {
  const { limit } = req.query;

  const prods = await productManager.getProducts();
  const products = limit ? prods.slice(0, limit) : prods;

  res.status(200).send(products);
});

routerProd.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  const prod = await productManager.getProductByID(pid);

  if (prod) res.status(200).send(prod);
  else res.status(404).send("Producto no encontrado");
});

routerProd.post("/", async (req, res) => {
  const newProduct = req.body;
  await productManager.addProduct(newProduct);
  res.status(201).send("Producto creado exitosamente");

});

routerProd.put("/:pid", async (req, res) => {
  const { pid } = req.params;
  await productManager.updateProduct(pid, req.body);
  res.status(200).send("Producto modificado exitosamente");
});

routerProd.delete("/:pid", async (req, res) => {
  const { pid } = req.params;
  const succesfullDelete = await productManager.deleteProduct(pid);
  if (succesfullDelete) res.status(200).send("Producto eliminado exitosamente");
  else res.status(404).send("Producto no hallado");
});

export default routerProd;
 */
