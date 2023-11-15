import { Router } from "express";
import productModel from "../models/products.model.js";
import { passportError, authorization } from "../utils/messageErrors.js";
import productsController from "../controllers/productsController.js";

const productRouter = Router();

productRouter.get("/", productsController.getProducts);

productRouter.get("/:pid", productsController.getProduct);

productRouter.post('/', (req, res, next) => {
    const { title, description, price, stock, code, category } = req.body;
    try {
        if (!title || !description || !price || !stock || !code || !category) {
            CustomError.createError({
                name: "Product creation error",
                cause: generateProductErrorInfo({ title, description, price, stock, code, category }),
                message: "One or more properties were incomplete or not valid.",
                code: EErrors.INVALID_PRODUCT_ERROR
            })
        }
        next();
    } catch (error) {
        next(error);
    }
}, passportError('jwt'), authorization(['admin']), productsController.postProduct);

productRouter.put("/:pid", productsController.putProduct);

productRouter.delete("/", productsController.deleteProduct);

export default productRouter;
