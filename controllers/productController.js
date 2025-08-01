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
async function show(req, res) {}

// Store a newly created resource in storage.
async function store(req, res) {}

// Update the specified resource in storage.
async function update(req, res) {}

// Remove the specified resource from storage.
async function destroy(req, res) {}

// Otros handlers...
// ...

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
