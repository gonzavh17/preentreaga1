import cartModel from "../models/cart.model.js";
import productModel from "../models/products.model.js";

const getCarts = async (req, res) => {
    const { limit } = req.query;

    try {
      const carts = await cartModel.find().limit(limit);
      res.status(200).send({ resultado: "OK", message: carts });
    } catch (error) {
      res.status(400).send({ error: `Error al consultar carrito ${error}` });
    }
}

const getCart = async (req, res) => {
    const { cid } = req.params;

    try {
      const cart = await cartModel.findById(cid);
      if (cart) res.status(200).send({ resultado: "OK", message: cart });
      else res.status(404).send({ resultado: "Not Found", message: cart });
    } catch (error) {
      res.status(400).send({ error: `Error al consultar productos ${error}` });
    }
}

const postCart = async (req, res) => {
    try {
        const createCart = await cartModel.create({
          products: [],
        });
    
        res
          .status(200)
          .send({ result: "OK", message: `Carrito creado ${createCart}` });
      } catch (error) {
        res.status(400).send({ error: `Error al crear el carrito ${error}` });
      }
}

const postProductIntoCart = async (req, res) => {
    const { cid, pid } = req.params;

  try {
    const searchCart = await cartModel.findById(cid);

    if (searchCart) {
      const existingProductIndex = searchCart.products.findIndex(
        (product) => product.id_prod.toString() === pid
      );

      if (existingProductIndex !== -1) {
        const existingProduct = searchCart.products[existingProductIndex];
        existingProduct.quantity += 1;
      } else {
        searchCart.products.push({ id_prod: pid, quantity: 1 });
      }

      const updatedCart = await searchCart.save();

      res.status(200).send({
        result: "OK",
        message: "Producto agregado exitosamente",
        cart: updatedCart,
      });
    } else {
      res.status(404).send({ error: "Carrito no encontrado" });
    }
  } catch (error) {
    res.status(400).send({ error: `Error al añadir producto: ${error}` });
  }
}

const putQuantity = async (req, res) => {
    const { cid, pid } = req.params;
  const { quantity } = req.body;

  try {
    const searchCart = await cartModel.findById(cid);

    if (searchCart) {
      const productIndex = searchCart.products.findIndex(
        (product) => product.id_prod.toString() === pid
      );

      if (productIndex !== -1) {
        searchCart.products[productIndex].quantity = quantity;

        const updatedCart = await searchCart.save();

        res
          .status(200)
          .send({
            result: "OK",
            message: "Cantidad del producto",
            cart: updatedCart,
          });
      } else {
        res.status(404).send({ error: "Producto no encontrado en el carrito" });
      }
    } else {
      res.status(404).send({ error: "Carrito no encontrado" });
    }
  } catch (error) {
    res
      .status(400)
      .send({ error: `Error al actualizar producto del carrito: ${error}` });
  }
}

const putProductsToCart = async (req, res) => {
    const { cid } = req.params;
    const { products } = req.body;
  
    try {
      const searchCart = await cartModel.findById(cid);
  
      if (searchCart) {
        searchCart.products = products;
  
        const updatedCart = await searchCart.save();
  
        res
          .status(200)
          .send({ result: "OK", message: "Cart updated", cart: updatedCart });
      } else {
        res.status(404).send({ error: "Cart Nout Found" });
      }
    } catch (error) {
      res.status(400).send({ error: `Error updating the cart: ${error}` });
    }
}

const deleteCart = async (req, res) => {
    const { cid } = req.params;

    try {
      const cart = await cartModel.findByIdAndDelete(cid);
      if (cart) res.status(200).send({ resultado: "OK", message: cart });
      else res.status(400).send({ resultado: "Not Found", message: cart });
    } catch (error) {
      res.status(400).send({ error: `Error al eliminar carritos: ${error}` });
    }
}

const deleteProductFromCart = async (req, res) => {
    const { cid, pid } = req.params;

    try {
      const searchCart = await cartModel.findById(cid);
  
      if (searchCart) {
        const existingProductIndex = searchCart.products.findIndex(
          (product) => product.id_prod.toString() === pid
        );
  
        if (existingProductIndex !== -1) {
          searchCart.products.splice(existingProductIndex, 1);
          await searchCart.save();
  
          res.status(200).send({
            result: "OK",
            message: "Producto eliminado exitosamente",
            cart: searchCart,
          });
        } else {
          res.status(404).send({
            resultado: "Producto no hallado",
            message: searchCart,
          });
        }
      } else {
        res.status(404).send({ error: "Carrito no encontrado" });
      }
    } catch (error) {
      res.status(400).send({ error: `Error al eliminar producto: ${error}` });
    }
}

const cartsController = {
	getCarts,
	getCart,
	postCart,
	putProductsToCart,
	postProductIntoCart,
	putQuantity,
	deleteCart,
	deleteProductFromCart,
};

export default cartsController