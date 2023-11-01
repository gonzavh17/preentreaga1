import { Router } from "express";
import cartRouter from "./cart.routes.js";
import productRouter from "./product.routes.js";
import routerSession from "./sessions.routes.js";
import routerUser from "./users.routes.js";
import messageRouter from "./messages.routes.js";
import routerMailing from "./mail.routes.js";
import routerTicket from "./ticket.routes.js";

const router = Router()

router.use('/api/products', productRouter)
router.use('/api/carts', cartRouter)
router.use('/api/user', routerUser)
router.use('/api/sessions', routerSession)
router.use('api/message', messageRouter)
router.use('/api/mail', routerMailing)
router.use('/api/tickets', routerTicket)

export default router