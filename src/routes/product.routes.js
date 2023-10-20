import { Router } from "express";
import productModel from "../models/products.model.js";
import { passportError, authorization } from "../utils/messageErrors.js";
import productsController from "../controllers/productsController.js";

const productRouter = Router();

productRouter.get("/", productsController.getProducts);

productRouter.get("/:pid", productsController.getProduct);

productRouter.post("/", passportError("jwt"), authorization("Admin"), productsController.postProduct);

productRouter.put("/:pid", productsController.putProduct);

productRouter.delete("/", productsController.deleteProduct);

export default productRouter;
