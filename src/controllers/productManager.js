import { promises as fs } from "fs";
import { v4 as uuidv4 } from "uuid";

export class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
  }

  async getProducts() {
    await this.loadProducts();
    return this.products;
  }

  async addProduct(product) {
    this.loadProducts();

    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.category ||
      !product.code ||
      !product.stock
    ) {
      console.error("Todos los campos son obligatorios");
      return;
    }

    if (this.products.some((p) => p.code === product.code)) {
      console.error("Producto ya existente");
      return;
    }

    product.id = uuidv4();
    product.status = true;
    this.products.push(product);
    console.log("Producto agregado correctamente:", product);
    await this.saveProducts();
  }

  async getProductByID(id) {
    this.loadProducts();

    const product = this.products.find((product) => product.id === id);

    if (product) {
      console.log("Producto hallado");
      return product;
    } else {
      console.log("Producto no hallado");
      return null;
    }
  }

  async updateProduct(
    id,
    { title, description, price, thumbnail, code, stock }
  ) {
    const products = JSON.parse(await fs.readFile(this.path, "utf-8"));
    const index = products.findIndex((prod) => prod.id === id);

    if (index != -1) {
      products[index].title = title;
      products[index].description = description;
      products[index].price = price;
      products[index].thumbnail = thumbnail;
      products[index].code = code;
      products[index].stock = stock;

      console.log("Producto modificado exitosamente");

      await fs.writeFile(this.path, JSON.stringify(products));
    } else {
      console.log("Producto no encontrado");
    }
  }

  async deleteProduct(id) {
    this.loadProducts();

    const initialProductCount = this.products.length;
    this.products = this.products.filter((p) => p.id !== id);

    if (this.products.length === initialProductCount) {
      console.error("Producto no encontrado.");
    } else {
      await this.saveProducts();
      console.log("Producto eliminado correctamente.");
    }

    this.saveProducts;
  }

  async loadProducts() {
    try {
      const productsData = await fs.readFile(this.path, "utf-8");
      this.products = JSON.parse(productsData);
    } catch (error) {
      this.products = [];
    }
  }

  async saveProducts() {
    await fs.writeFile(this.path, JSON.stringify(this.products, null, 2));
  }
}
