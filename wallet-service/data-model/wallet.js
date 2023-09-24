const { difference } = require('lodash');
const { Wallet } = require('../server/sequelize/models/index');

class WalletDataModel {
  static async bulkCreateUpdate(data, t1) {
    if (data && data.length) {
      return Wallet.bulkCreate(data, {
        updateOnDuplicate: difference(Object.keys(Wallet.rawAttributes), ['id']),
        transaction: t1,
      });
    }
    return [];
  }

  static async findById(Id, lockValue = false) {
    if(Id) {
      return Wallet.findOne({
        where: {
          id: Id,  
        },
        lock: lockValue,
        raw: true,
      });
    }
    return null;
  }
}

module.exports = WalletDataModel;
