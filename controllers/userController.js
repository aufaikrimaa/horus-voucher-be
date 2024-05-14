const bcrypt = require("bcrypt");
const { User } = require("../models");

exports.register = async (req, res) => {
  try {
    const { username, password, email, nama } = req.body;
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: "Username telah digunakan!" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      password: hashedPassword,
      email,
      nama,
      tanggal_daftar: new Date(),
    });
    res.status(201).json({
      message: "Berhasil Registrasi!",
      data: {
        id: newUser.id,
        username: newUser.username,
        password: newUser.password,
        email: newUser.email,
        name: newUser.name,
        tanggal_daftar: newUser.tanggal_daftar,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
