var express = require("express");
var router = express.Router();

const authRouter = require("./authRouter");
const userRouter = require("./userRouter");
const vouchersRouter = require("./vouchersRouter");
const users = require("./users");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.use(authRouter);
router.use(userRouter);
router.use(vouchersRouter);

// router.use("/users", users);

module.exports = router;
