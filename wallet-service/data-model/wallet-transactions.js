const { difference } = require('lodash');
const { WalletTransactions } = require('../server/sequelize/models/index');

class WalletTransactionsDataModel {
  static async bulkCreateUpdate(data) {
    if (data && data.length) {
      return WalletTransactions.bulkCreate(data, {
        updateOnDuplicate: difference(Object.keys(WalletTransactions.rawAttributes), ['id']),
      });
    }
    return [];
  }
}

module.exports = WalletTransactionsDataModel;
