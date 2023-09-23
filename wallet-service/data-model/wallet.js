const { difference } = require('lodash');
const { Wallet } = require('../server/sequelize/models/index');

class WalletDataModel {
  static async bulkCreateUpdate(data) {
    if (data && data.length) {
      return Wallet.bulkCreate(data, {
        updateOnDuplicate: difference(Object.keys(Wallet.rawAttributes), ['id']),
      });
    }
    return [];
  }
}

module.exports = WalletDataModel;
