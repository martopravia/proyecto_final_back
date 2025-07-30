require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");
const axios = require("axios");

const api = axios.create({
  baseURL: "https://api-inference.huggingface.co",
});

const token = process.env.HUGGINGFACE_API_TOKEN;
const MODEL = "google/flan-t5-large";

const supabaseUrl = "https://ubmbvouzxyajisbnmzeu.supabase.co";
const supabase = createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY);
let imageNames = [];

const getFiles = async () => {
  const { data, error } = await supabase.storage.from("products").list("", {
    limit: 100,
    offset: 0,
    sortBy: { column: "name", order: "asc" },
  });
  //console.log("data", data);
  if (error) {
    console.error("Error al obtener archivos:", error.message);
    return;
  }

  imageNames = data.map((archivo) => archivo.name);
  imageNames.shift();
  //console.log("Listado de archivos:", imageNames);
};

// Función para deducir categoría por nombre
function inferCategoryId(name) {
  const lower = name.toLowerCase();
  if (lower.includes("sofa")) return 1;
  if (lower.includes("table")) return 2;
  if (lower.includes("chair")) return 3;
  return null;
}

// Genera un prompt y llama a la API
async function generateBatchProductData(names) {
  const prompt = `Dado el nombre de varias imágenes de productos para un ecommerce de muebles, generá un título atractivo y una descripción breve (máximo 20 palabras) por cada uno. Nombres: ${names.join(
    ", ",
  )}. Respondé en JSON array con objetos que tengan las claves "title" y "content".`;
  try {
    const response = await api.post(
      `/models/${MODEL}`,
      { inputs: prompt, parameters: { max_new_tokens: 300 } },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        timeout: 20000,
      },
    );
    const generated = response.data;
    console.log("Datos brutos:\n", generated);

    // Extraer texto si viene como string
    const output = Array.isArray(generated)
      ? generated[0]?.generated_text || generated[0]?.text
      : generated.generated_text || generated.text;

    // Intentamos parsear JSON (si el modelo respondió correctamente)
    try {
      const json = JSON.parse(output);
      return names.map((name, i) => ({
        ...json[i],
        image: `https://ubmbvouzxyajisbnmzeu.supabase.co/storage/v1/object/public/products//${name}`,
        category_id: inferCategoryId(name),
      }));
    } catch (e) {
      console.error("Error al parsear JSON:", output);
      return null;
    }
  } catch (error) {
    console.error("Error al generar descripciones:", error.response?.data || error.message);
    return null;
  }
}

async function main() {
  const results = [];
  await getFiles();
  for (let i = 0; i < imageNames.length; i += 8) {
    const batch = imageNames.slice(i, i + 8);
    //console.log(`Generando para ${batch.join(", ")}`);
    const products = await generateBatchProductData(batch);
    if (!products) {
      console.error("Error al generar productos para el lote:", batch);
      continue;
    } else {
      results.push(...products);
    }
  }

  // Guardá los resultados para luego usar en un seeder
  fs.writeFileSync(
    path.join(__dirname, "generatedProducts.json"),
    JSON.stringify(results, null, 2),
  );

  console.log("✔ Productos generados en generatedProducts.json");
}

main();
