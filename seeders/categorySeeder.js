const Category = require("../models/Category");

module.exports = async () => {
  const categories = [{ name: "Sofas" }, { name: "Tables" }, { name: "Chairs" }];

  await Category.bulkCreate(categories);
  console.log("[Database] Se corrió el seeder de Categorias.");
};
