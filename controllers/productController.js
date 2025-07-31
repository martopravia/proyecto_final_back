const { Product } = require("../models");

// Display a listing of the resource.
async function index(req, res) {
  // console.log("Entrando a ruta");
  try {
    const products = await Product.findAll();
    // console.log(products);
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
