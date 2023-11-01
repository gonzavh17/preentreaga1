import { Router } from "express";
import cartsController from "../controllers/cartController.js";

const cartRouter = Router();

cartRouter.get("/", cartsController.getCarts);
cartRouter.get("/:cid", cartsController.getCart);
cartRouter.post('/:cid/purchase', cartsController.purchaseCart)
cartRouter.post("/", cartsController.postCart);
cartRouter.post("/:cid/products/:pid", cartsController.postProductIntoCart);
cartRouter.put("/:cid", cartsController.putProductsToCart);
cartRouter.put("/:cid/products/:pid", cartsController.putQuantity);
cartRouter.delete("/:cid", cartsController.deleteCart);
cartRouter.delete("/:cid/products/:pid", cartsController.deleteProductFromCart);

export default cartRouter;
