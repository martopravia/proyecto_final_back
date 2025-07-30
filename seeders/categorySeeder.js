const Category = require("../models/Category");

module.exports = async () => {
  const categories = [{ name: "sofas" }, { name: "tables" }, { name: "chairs" }];

  await Category.bulkCreate(categories);
  console.log("[Database] Se corrió el seeder de Categorias.");
};
