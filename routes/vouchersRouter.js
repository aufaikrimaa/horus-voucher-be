const express = require("express");
const router = express.Router();
const voucherController = require("../controllers/vouchersController");
const verifyAuthMiddleware = require("../middleware/verifyAuth");

router.get("/all", verifyAuthMiddleware, voucherController.getVouchers);
router
  .route("/claim")
  .post(verifyAuthMiddleware, voucherController.claimVoucher)
  .get(verifyAuthMiddleware, voucherController.getVoucherClaimsByUser);
router.post(
  "/remove",
  verifyAuthMiddleware,
  voucherController.removeVoucherClaim
);

module.exports = router;
