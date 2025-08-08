const { Category } = require("../models");

async function findCategory(req, res, next) {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    req.category = category;
    console.log(req.category);
    next();
  } catch (error) {
    console.error("Error finding category:", error);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = findCategory;
