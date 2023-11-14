import { Router } from "express";
import mockingController from "../controllers/mockingController.js";

const mockingRouter = Router()

mockingRouter.get('/products', mockingController.generateRandomProducts)

export default mockingRouter