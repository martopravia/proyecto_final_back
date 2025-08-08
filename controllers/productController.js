const { Product } = require("../models");
const Category = require("../models/Category");

// Display a listing of the resource.
async function index(req, res) {
  try {
    const { limit, skip, category } = req.query;

    const products = await Product.findAll({
      include: {
        model: Category,
        as: "category",
        attributes: ["id", "name"],
        where: category ? { name: category } : {},
        required: !!category,
      },
      limit: limit ? parseInt(limit) : 20,
      offset: skip ? parseInt(skip) : 0,
    });
    res.json(products);
  } catch (error) {
    console.error("Error fetching products: ", error);
    res.status(500).json({ message: "Server error" });
  }
}

// Display the specified resource.
async function show(req, res) {
  try {
    return res.status(200).json(req.product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

// Store a newly created resource in storage.
async function store(req, res) {
  const { sanitizedData, files } = req;
  try {
    const product = await Product.create({
      ...sanitizedData,
      image: files["image"].newFilename || null,
    });
    res.status(201).json(product);
  } catch (error) {
    console.error("Error saving the product: ", error);
    res.status(500).json({ error: "Server Error" });
  }
}

// Update the specified resource in storage.
async function update(req, res) {
  try {
    const { product, sanitizedData, files } = req;

    Object.assign(product, sanitizedData);

    if (files.image) product.image = files.image.newFilename;

    await product.save();

    res.status(200).json(product);
  } catch (error) {
    console.error("Error updating the product: ", error);
    res.status(500).json({ error: "Server Error" });
  }
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  try {
    const { product } = req;

    await product.destroy();

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({ message: "Server error" });
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
