const { Product } = require("../models");
const products = require("../completeProducts.json");

module.exports = async () => {
  await Product.bulkCreate(products);
  console.log("Se corrió el seeder de productos");
};
