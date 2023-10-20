import productModel from '../models/products.model.js'

const getProducts = async (req, res) => {
  const { limit, page, sort, category, status } = req.query;
  let sortOption;
  sort == "asc" && (sortOption = "price");
  sort == "desc" && (sortOption = "-price");

 const options = {
  limit: limit || 10,
  page: page || 1,
  sort: sortOption || null,
}

  const query = {};
	category && (query.category = category);
	status && (query.status = status);

	try {
		const prods = await productModel.paginate(query, options);
		res.status(200).send({ resultado: 'OK', message: prods });
	} catch (error) {
		res.status(400).send({ error: `Error al consultar productos: ${error}` });
	}
}

const getProduct = async (req, res) => {
  const { pid } = req.params;

  try {
    const prod = await productModel.findById(pid);
    if (prod) res.status(200).send({ resultado: "OK", message: prod });
    else res.status(404).send({ resultado: "Not Found", message: prod });
  } catch (error) {
    res.status(400).send({ error: `Error al consultar productos ${error}` });
  }
}

const postProduct = async (req, res) => {
  const { title, description, stock, code, price, category } = req.body;

    try {
      const respuesta = await productModel.create({
        title,
        description,
        stock,
        code,
        price,
        category,
      });
      res.status(200).send({ resultado: "ok", message: respuesta });
    } catch (error) {
      res.status(400).send({ error: `Error al crear producto ${error}` });
    }
}

const putProduct = async (req, res) => {
  const { pid } = req.params;
  const { title, description, stock, code, price, category, status } = req.body;

  try {
    const respuesta = await productModel.findByIdAndUpdate(pid, {
      title,
      description,
      stock,
      code,
      price,
      category,
      status,
    });
    if (prod) res.status(200).send({ resultado: "OK", message: respuesta });
    else res.status(404).send({ resultado: "Not Found", message: respuesta });
  } catch (error) {
    res.status(400).send({ error: `Error al consultar productos ${error}` });
  }
}

const deleteProduct = async (req, res) => {
  const { pid } = req.params;

  try {
    const respuesta = await productModel.findByIdAndDelete(pid);

    if (prod) res.status(200).send({ resultado: "OK", message: respuesta });
    else res.status(404).send({ resultado: "Not Found", message: respuesta });
  } catch (error) {
    res.status(400).send({ error: `Error al consultar productos ${error}` });
  }
}

const productsController = {
  getProducts,
	getProduct,
	postProduct,
	putProduct,
	deleteProduct,
}

export default productsController