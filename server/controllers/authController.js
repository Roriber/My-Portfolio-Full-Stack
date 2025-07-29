const User = require("../models/User"); // Use singular 'User'
const jwt = require("jsonwebtoken");

// REGISTER
exports.register = async (req, res) => {
  try {
    let { name, email, password, role } = req.body;
    name = name?.trim();
    email = email?.trim().toLowerCase();
    role = role || "user"; // default

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const userExist = await User.findOne({ email });
    if (userExist) return res.status(400).json({ error: "User already exists" });

    // DO NOT hash password here! Let pre-save hook handle it.
    const newUser = new User({
      name,
      email,
      password, // plain password!
      role
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Select password and role explicitly
    const user = await User.findOne({ email: email.trim().toLowerCase() }).select('+password role');
    if (!user) return res.status(400).json({ error: "Invalid email or password" });

    // Use schema method to compare
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ error: "Invalid email or password" });

    // Create JWT, include role!
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role // <<---- FRONTEND NEEDS THIS!
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LOGOUT (for client-side token removal)
exports.logout = (req, res) => {
  res.json({ message: "User logged out. Please remove token on client." });
};
