const express = require("express");
const router = express.Router();
const voucherController = require("../controllers/vouchersController");

router.get("/vouchers", voucherController.getVouchers);

module.exports = router;
