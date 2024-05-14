var express = require("express");
var router = express.Router();

const vouchersRouter = require("./vouchersRouter");
const users = require("./users");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.use(vouchersRouter);

router.use("/users", users);

module.exports = router;
