const runAllSeeders = require("../seeders/runAllSeeders");

const SECRET_KEY = process.env.RESET_DB_KEY;

async function resetDatabase(req, res) {
  try {
    const key = req.headers["x-reset-key"];

    if (!SECRET_KEY) {
      console.error("RESET_DB_KEY not found in environment variables");
      return res.status(500).json({ message: "Server configuration error" });
    }

    if (key?.trim() !== SECRET_KEY?.trim()) {
      console.log("Key mismatch!");
      return res.status(403).json({ message: "Invalid key" });
    }

    await runAllSeeders();

    return res.status(200).json({ message: "Database reset successfully" });
  } catch (error) {
    console.error("Error executing commands:", error);
    return res.status(500).json({ message: "Error resetting database" });
  }
}

module.exports = {
  resetDatabase,
};
