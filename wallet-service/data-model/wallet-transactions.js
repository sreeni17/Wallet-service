const { pageSizeLimit } = require('../constants/application');
const { difference } = require('lodash');
const { WalletTransactions } = require('../server/sequelize/models/index');

class WalletTransactionsDataModel {
  static async bulkCreateUpdate(data, t1) {
    if (data && data.length) {
      return WalletTransactions.bulkCreate(data, {
        updateOnDuplicate: difference(Object.keys(WalletTransactions.rawAttributes), ['id']),
        transaction: t1
      });
    }
    return [];
  }

  static async listTransaction(walletId, options = {}) {
    if(walletId) {
      return WalletTransactions.findAll({
        where: {
          wallet_id: walletId,
        },
        raw: true,
        order: [
          ['updated_at', 'DESC'],
          ['id', 'DESC'],
        ],
        offset: (options.page - 1) * pageSizeLimit || options.skip,
        limit: options.limit || pageSizeLimit,
      })
    }
  }
}

module.exports = WalletTransactionsDataModel;
