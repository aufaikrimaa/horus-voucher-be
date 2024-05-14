const { Voucher } = require("../models");
exports.getVouchers = async (req, res) => {
  try {
    const vouchers = await Voucher.findAll();
    res.status(200).json(vouchers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
