const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const verifyAuthMiddleware = require("../middleware/verifyAuth");

router.post("/login", authController.login);

router.post("/logout", verifyAuthMiddleware, authController.logout);

module.exports = router;
