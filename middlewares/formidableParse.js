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
    const { data, error } = await supabase.storage
      .from("img")
      .upload(files.image.newFilename, fs.createReadStream(files.image.filepath), {
        cacheControl: "3600",
        duplex: "half",
        upsert: false,
        contentType: files.image.mimetype,
      });
    req.body = { ...req.body, ...fields };
    req.files = files;
    next();
  });
};
