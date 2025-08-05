const { tr } = require("@faker-js/faker");
const { Product } = require("../models");
const Category = require("../models/Category");

// Display a listing of the resource.
async function index(req, res) {
  try {
    const products = await Product.findAll({
      include: {
        model: Category,
        attributes: ["name"],
      },
    });
    for (const product of products) {
      product.setImageUrl();
    }
    res.json(products);
  } catch (error) {
    console.log("Error al traer productos: ", error);
    res.status(500).json({ error: "No se pudo traer los productos" });
  }
}

// Display the specified resource.
async function show(req, res) {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: {
        model: Category,
        attributes: ["name"],
      },
    });
    if (!product) return res.status(404).json({ error: "Product not found" });
    product.setImageUrl();
    res.json(product);
  } catch (error) {
    console.log("Error al traer el producto: ", error);
    res.status(500).json({ error: "No se pudo traer el producto" });
  }
}

// Store a newly created resource in storage.
async function store(req, res) {
  const { name, description, price, stock, image, featured, categoryId } = req.body;
  try {
    const product = await Product.create({
      name,
      description,
      price,
      stock,
      image,
      featured,
      categoryId,
    });
    product.setImageUrl();
    res.status(201).json(product);
  } catch (error) {
    console.log("Error al crear el producto: ", error);
    res.status(500).json({ error: "No se pudo crear el producto" });
  }
}

// Update the specified resource in storage.
async function update(req, res) {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    const { name, description, price, stock, image, featured, categoryId } = req.body;
    await product.update({
      name,
      description,
      price,
      stock,
      image,
      featured,
      categoryId,
    });
    product.setImageUrl();
    res.json(product);
  } catch (error) {
    console.log("Error al actualizar el producto: ", error);
    res.status(500).json({ error: "No se pudo actualizar el producto" });
  }
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    await product.destroy();
    res.status(204).send();
  } catch (error) {
    console.log("Error al borrar el producto: ", error);
    res.status(500).json({ error: "No se pudo borrar el producto" });
  }
}

// Otros handlers...
// ...

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
