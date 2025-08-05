const { User } = require("../models");
const bcrypt = require("bcrypt");

// Display a listing of the resource.
async function index(req, res) {
  try {
    const { filter, limit } = req.params;
    const users = await User.findAll({
      attributes: ["id", "firstname", "lastname", "email", "address", "phone", "role"],
      where: filter,
      limit: limit ? parseInt(limit) : undefined,
    });
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

// Display the specified resource.
async function show(req, res) {
  try {
    const showUser = await User.findByPk(req.params.id, {
      attributes: ["id", "firstname", "lastname", "email", "address", "phone", "role"],
    });

    if (!showUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(showUser);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

// Store a newly created resource in storage.
async function store(req, res) {
  try {
    const { firstname, lastname, email, address, phone, password } = req.body;

    if (!firstname || !lastname || !email || !address || !phone || !password) {
      return res.status(400).json({ message: "Please fill in all fields." });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstname,
      lastname,
      email,
      address,
      phone,
      password: hashedPassword,
      role: "user",
    });
    res.status(201).json({
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      phone: user.phone,
      role: user.role,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Server error" });
  }
}

// Update the specified resource in storage.
async function update(req, res) {
  try {
    const { firstname, lastname, email, address, phone } = req.body;

    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.firstname = firstname || user.firstname;
    user.lastname = lastname || user.lastname;
    user.email = email || user.email;
    user.address = address || user.address;
    user.phone = phone || user.phone;

    await user.save();
    res.status(200).json({
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      phone: user.phone,
      address: user.address,
      role: user.role,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

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
