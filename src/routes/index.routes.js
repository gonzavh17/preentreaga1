import { Router } from "express";
import cartRouter from "./cart.routes.js";
import productRouter from "./product.routes.js";
import routerSession from "./sessions.routes.js";
import routerUser from "./users.routes.js";

const router = Router()

router.use('/api/product', productRouter)
router.use('/api/carts', cartRouter)
router.use('/api/user', routerUser)
router.use('/api/session', routerSession)

export default router