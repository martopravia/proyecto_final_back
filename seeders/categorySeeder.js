const Category = require("../models/Category");

module.exports = async () => {
  const categories = [
    {
      name: "sofas",
      alias: "Heritage Sofas",
      description:
        "Handcrafted sofas that blend timeless elegance with modern comfort, creating a refined centerpiece for any living space.",
      image: `${process.env.BASE_URL_IMAGE}sofa_fabric_grey_raw_pine_wood_3seater_memo.webp`,
    },
    {
      name: "tables",
      alias: "Refined Seating",
      description:
        "Sophisticated seating solutions designed with precision, offering a harmonious balance between luxury and functionality.",
      image: `${process.env.BASE_URL_IMAGE}chair_wood_beech_velvet_soro.webp`,
    },
    {
      name: "chairs",
      alias: "Artisan Tables",
      description:
        "Exquisite artisan-made tables that embody minimalist design and enduring craftsmanship for a truly elevated interior.",
      image: `${process.env.BASE_URL_IMAGE}table_wood_polished_dark_algarrobo_orella.webp`,
    },
  ];

  await Category.bulkCreate(categories);
  console.log("[Database] Se corrió el seeder de Categorias.");
};
