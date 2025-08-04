const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, Seller } = require("../model");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    const token = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET
    );

    res.status(201).json(token);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
    );

    res.status(200).json(token);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
const getUser = async (req, res) => {
  try {
    const id = req.user._id;
    const { _id, name, email, isSeller,isAdmin } = await User.findById(id).populate("isSeller");
    res.status(200).json({ _id, name, email, isSeller,isAdmin });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
const upgradeUser = async (req, res) => {
  try {
    const id = req.user._id;
    const seller = await Seller.create({ userId: id });
    const user = await User.findByIdAndUpdate(id, { $set:{isSeller: seller._id }});
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}
module.exports = {
  signup,
  login,
  getUser,
  upgradeUser
};
