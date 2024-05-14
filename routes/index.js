var express = require("express");
var router = express.Router();

const authRouter = require("./authRouter");
const userRouter = require("./userRouter");
const vouchersRouter = require("./vouchersRouter");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "API Horus Tech Vouchers" });
});
router.use("/auth", authRouter);
router.use(userRouter);
router.use("/voucher", vouchersRouter);

module.exports = router;
