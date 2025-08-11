const { Category, Product } = require("../models");

async function index(req, res) {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

async function show(req, res) {
  try {
    return res.status(200).json(req.category);
  } catch (error) {
    console.error("Error fetching category:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

async function store(req, res) {
  try {
    const category = await Category.create(req.sanitizedData);
    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

async function update(req, res) {
  try {
    const { category, sanitizedData } = req;

    Object.assign(category, sanitizedData);

    await category.save();

    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

async function destroy(req, res) {
  try {
    const { category } = req;

    const [uncategorized] = await Category.findOrCreate({
      where: { name: "uncategorized" },
    });

    await Product.update({ categoryId: uncategorized.id }, { where: { categoryId: category.id } });

    await category.destroy();
    res.status(200).json({ message: "Category deleted and products updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
