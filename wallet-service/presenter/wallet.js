const moment = require('moment-timezone');
const { invert } = require('lodash');
const { TransactionType } = require('../constants/application');

const TransactionTypeInvert = invert(TransactionType);
class WalletPresenter {
  walletTransactJson(walletData = {}, transactionData = {}) {
    let responseData = {};
    if (walletData?.id && transactionData?.id) {
      responseData = {
        id: walletData.id,
        transactionId: transactionData.transaction_id,
        name: walletData.name,
        balance: walletData.balance,
        date: moment(walletData.created_at).format('MMMM Do YYYY, h:mm:ss a'),
      };
    }
    return responseData;
  }

  transactJson(transactionData = {}) {
    let responseData = {};
    if (transactionData?.id) {
      responseData = {
        transactionId: transactionData.transaction_id,
        balance: transactionData.balance,
      };
    }

    return responseData;
  }

  listTransactions(transactionData = []) {
    const responseData = [];
    if (transactionData?.length) {
      transactionData.forEach((transaction) => {
        const respObj = {
          id: transaction.id,
          walletId: transaction.wallet_id?.toString(),
          amount: transaction.amount,
          balance: transaction.balance,
          description: transaction.description,
          date: moment(transaction.created_at).format('MMMM Do YYYY, h:mm:ss a'),
          type: TransactionTypeInvert[transaction.type],
        };
        responseData.push(respObj);
      });
    }
    return responseData;
  }

  walletJson(walletData = {}) {
    let responseData = {};
    if (walletData?.id) {
      responseData = {
        id: walletData.id,
        name: walletData.name,
        balance: walletData.balance,
        date: moment(walletData.created_at).format('MMMM Do YYYY, h:mm:ss a'),
      };
    }
    return responseData;
  }

  exportJson(transactionData = []) {
    const responseData = [];
    if (transactionData?.length) {
      transactionData.forEach((transaction) => {
        const respObj = {
          Id: transaction.id,
          'Wallet Id': transaction.wallet_id?.toString(),
          Amount: transaction.amount,
          Balance: transaction.balance,
          Description: transaction.description,
          Date: moment(transaction.created_at).format('MMMM Do YYYY, h:mm:ss a'),
          Type: TransactionTypeInvert[transaction.type],
        };
        responseData.push(respObj);
      });
    }
    return responseData;
  }
}

module.exports = WalletPresenter;
