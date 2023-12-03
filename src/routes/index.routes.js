import { Router } from "express";
import cartRouter from "./cart.routes.js";
import productRouter from "./product.routes.js";
import routerSession from "./sessions.routes.js";
import routerUser from "./users.routes.js";
import messageRouter from "./messages.routes.js";
import routerMailing from "./mail.routes.js";
import routerTicket from "./ticket.routes.js";
import mockingRouter from "./mocking.routes.js";
import routerLoggerTest from "./loggerTes.routes.js";
import swaggerUiExpress from 'swagger-ui-express'
import { specs } from "../config/config.js";

const router = Router()

router.use('/api/products', productRouter)
router.use('/api/carts', cartRouter)
router.use('/api/users', routerUser)
router.use('/api/sessions', routerSession)
router.use('/api/message', messageRouter)
router.use('/api/mail', routerMailing)
router.use('/api/tickets', routerTicket)
router.use('/api/mocking', mockingRouter)
router.use('/api/logger', routerLoggerTest)
router.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

export default router