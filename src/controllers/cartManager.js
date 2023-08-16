import * as fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";

export class CartManager {
    constructor(filePath) {
        this.filePath = filePath
        this.carts = []
    }

    async createCart() {
        
    }
}