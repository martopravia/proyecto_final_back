const { User } = require("../models");

// Display a listing of the resource.
async function index(req, res) {
  try {
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

// Display the specified resource.
async function show(req, res) {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

// Store a newly created resource in storage.
async function store(req, res) {
  try {
    const { email } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const user = await User.create({ ...req.sanitizedData, role: "user" });

    res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Server error" });
  }
}

// Update the specified resource in storage.
async function update(req, res) {
  try {
    const { user, sanitizedData } = req;

    Object.assign(user, sanitizedData);

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  try {
    const user = req.user;

    await user.destroy();

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

// Otros handlers...
// ...

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
