import { Router } from "express";
import mockingController from "../controllers/mockingController.js";

const mockingRouter = Router()

mockingRouter.post('/products', mockingController.generateRandomProducts)

export default mockingRouter