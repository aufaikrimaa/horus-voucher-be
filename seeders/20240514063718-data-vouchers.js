"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const categories = ["Food", "Fashion", "Travel"];
    const voucherNames = [
      "Voucher 1",
      "Voucher 2",
      "Voucher 3",
      "Voucher 4",
      "Voucher 5",
      "Voucher 6",
      "Voucher 7",
      "Voucher 8",
      "Voucher 9",
    ];

    const vouchers = [];
    let voucherId = 1;
    categories.forEach((category) => {
      voucherNames.forEach((voucherName) => {
        const fotoName = `${category}_${voucherName}.jpg`;
        const fotoPath = `/images/vouchers/${fotoName}`;

        vouchers.push({
          id: voucherId++,
          nama: voucherName,
          foto: fotoPath,
          kategori: category,
          status: "[]",
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      });
    });

    await queryInterface.bulkInsert("Vouchers", vouchers, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Vouchers", null, {});
  },
};
