const Category = require("../models/Category");

module.exports = async () => {
  const categories = [
    {
      name: "uncategorized",
      alias: "Uncategorized",
      description: "Default category for uncategorized products",
    },
    {
      name: "sofas",
      alias: "Heritage Sofas",
      description:
        "Handcrafted sofas that blend timeless elegance with modern comfort, creating a refined centerpiece for any living space.",
      image: `sofa_fabric_grey_raw_pine_wood_3seater_memo.webp`,
    },
    {
      name: "tables",
      alias: "Artisan Tables",
      description:
        "Exquisite artisan-made tables that embody minimalist design and enduring craftsmanship for a truly elevated interior.",
      image: `table_wood_polished_dark_algarrobo_orella.webp`,
    },
    {
      name: "chairs",
      alias: "Refined Seating",
      description:
        "Sophisticated seating solutions designed with precision, offering a harmonious balance between luxury and functionality.",
      image: `chair_wood_beech_velvet_soro.webp`,
    },
  ];

  await Category.bulkCreate(categories);
  console.log("[Database] Se corrió el seeder de Categorias.");
};
