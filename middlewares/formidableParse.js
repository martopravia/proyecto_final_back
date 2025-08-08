const formidable = require("formidable");
const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
const fs = require("fs");

module.exports = (req, res, next) => {
  const form = formidable({
    multiples: false,
    keepExtensions: true,
  });
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Error en el formulario:", err);
      return res.status(500).json({ message: "Error en el formulario" });
    }

    if (files.image) {
      const buffer = fs.readFileSync(files.image.filepath);

      const { data, error } = await supabase.storage
        .from("products")
        .upload(files.image.newFilename, buffer, {
          cacheControl: "3600",
          upsert: false,
          contentType: files.image.mimetype,
        });
    }

    req.body = { ...req.body, ...fields };
    req.files = files;

    next();
  });
};
