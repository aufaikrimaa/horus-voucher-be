require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models");

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Login gagal!, username tidak di temukan!" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Password Salah!" });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });
    res.status(200).json({
      success: true,
      message: "Login Sukses!",
      data: {
        id: user.id,
        username: user.username,
        password: user.password,
        email: user.email,
        name: user.name,
        tanggal_daftar: user.tanggal_daftar,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.logout = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Logout berhasil!",
  });
};
