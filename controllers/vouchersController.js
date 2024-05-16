const { Voucher } = require("../models");
const { Voucher_Claim } = require("../models");

exports.getVouchers = async (req, res) => {
  try {
    const vouchers = await Voucher.findAll();
    res.status(200).json({
      success: true,
      message: "Data vouchers berhasil didapatkan!",
      data: vouchers,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.claimVoucher = async (req, res) => {
  try {
    const { id_voucher, id_user } = req.body;
    const voucher = await Voucher.findByPk(id_voucher);
    const newClaim = await Voucher_Claim.create({
      id_voucher,
      id_user,
      tanggal_claim: new Date(),
    });

    let previousStatus = `diklaim user ${id_user}`;
    let newStatus = voucher.status
      ? [...voucher.status, previousStatus]
      : [previousStatus];
    await voucher.update({ status: newStatus });
    res.status(200).json({
      success: true,
      message: "Voucher berhasil diklaim",
      data: newClaim,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.removeVoucherClaim = async (req, res) => {
  try {
    const { id } = req.body;
    const claim = await Voucher_Claim.findByPk(id);
    const voucher = await Voucher.findOne({ where: { id: claim.id_voucher } });

    // await voucher.update({ status: null });
    const newStatus = voucher.status.filter(
      (status) => !status.includes(`diklaim user ${claim.id_user}`)
    );

    await voucher.update({ status: newStatus });
    await claim.destroy();
    res.status(200).json({
      success: true,
      message: "Klaim voucher berhasil dihapus",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.getVoucherClaimsByUser = async (req, res) => {
  try {
    const id_user = req.user.id;
    const voucherClaims = await Voucher_Claim.findAll({ where: { id_user } });

    const formattedVoucherClaims = [];
    for (const claim of voucherClaims) {
      const voucher = await Voucher.findByPk(claim.id_voucher);
      const formattedClaim = {
        id: claim.id,
        id_voucher: claim.id_voucher,
        id_user: claim.id_user,
        tanggal_claim: claim.tanggal_claim,
        voucher: voucher,
      };

      formattedVoucherClaims.push(formattedClaim);
    }
    res.status(200).json({
      success: true,
      message:
        "Riwayat klaim voucher berhasil didapatkan untuk pengguna yang sedang login",
      data: formattedVoucherClaims,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
