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

    const user = await User.create({ ...req.sanitizedData });

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
    const { user } = req;

    await user.destroy();

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

async function changePassword(req, res) {
  try {
    const user = req.user;
    const { passwordCurrent, passwordNew, passwordConfirm } = req.body;

    if (!passwordCurrent || !passwordNew || !passwordConfirm) {
      return res.status(400).json({ message: "All password fields are required" });
    }

    if (passwordNew !== passwordConfirm) {
      return res.status(400).json({ message: "New passwords do not match" });
    }
    if (passwordNew.length < 6) {
      return res.status(400).json({ message: "New password must be at least 6 characters long" });
    }
    const isMatch = await user.validatePassword(passwordCurrent);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    user.password = passwordNew;
    await user.save();

    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
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
  changePassword,
};
