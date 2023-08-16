import { promises as fs } from "fs";
import { v4 as uuidv4 } from "uuid";

export class CartManager {
  constructor(path) {
    this.path = path;
    this.carts = [];
  }

  async createCart() {
    const newCart = {
      id: uuidv4(),
      products: [],
    };

    this.carts.push(newCart);
    this.saveCart();
    return newCart;
  }


  /* metodo para comprobar si el carrito existe en el cart.routes , si el carrito existe no se crea un nuevo carrito */
  async getCarts() {
    try {
      const cartsData = await fs.readFile(this.path, "utf-8");
      return JSON.parse(cartsData);
    } catch (error) {
      return [];
    }
  }

  async getCartsByID(cid) {
    await this.loadCart();
    const cart = this.carts.find((cart) => cart.id === cid);
    return cart;
  }

  async addProductToCart(cartID, productID) {
    await this.loadCart();

    const indexCart = this.carts.findIndex((cart) => cart.id === cartID);
    if (indexCart !== -1) {
      const cart = this.carts[indexCart];
      const productIndex = cart.products.findIndex(
        (prod) => prod.product === productID
      );

      if (productIndex !== -1) {
        cart.products[productIndex].quantity += 1;
      } else {
        cart.products.push({ product: productID, quantity: 1 });
      }

      await this.saveCart();
      console.log("Producto agregado al carrito exitosamente", cart.products);
      return true;
    } else {
      console.error("Error al agregar al carrito");
      return false;
    }
  }

  async deleteCart(cid) {
    this.loadCart();

    const initialCartCount = this.carts.length;
    this.carts = this.carts.filter((cart) => cart.id !== cid);

    if (this.carts.length === initialCartCount) {
      console.error("Carrito no encontrado.");
      return false;
    } else {
      await this.saveCart();
      console.log("Producto del carrito eliminado correctamente.");
      return true;
    }
  }

  async loadCart() {
    try {
      const cartData = await fs.readFile(this.path, "utf-8");
      this.carts = JSON.parse(cartData);
    } catch (error) {
      this.carts = [];
    }
  }

  async saveCart() {
    try {
      await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2));
    } catch (error) {
      console.error("Error al guardar", error);
    }
  }
}
