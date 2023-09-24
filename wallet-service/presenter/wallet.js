const { TransactionType } = require('../constants/application');
const {invert } = require('lodash');
const TransactionTypeInvert = invert(TransactionType);
class WalletPresenter{
    walletTransactJson(walletData = {}, transactionData = {}) {
        let responseData = {};
        if(walletData?.id && transactionData?.id) {
            responseData = {
                id: walletData.id,
                transactionId: transactionData.transaction_id,
                name: walletData.name,
                balance: walletData.balance,
                data: walletData.created_at,
            }
        }
        return responseData;
    }
    transactJson(transactionData = {}) {
        let responseData = {};
        if(transactionData?.id) {
            responseData = {
                transactionId: transactionData.transaction_id,
                balance: transactionData.balance,
            }
        }

        return responseData;
    }
    listTransactions(transactionData = [] ) {
        const responseData = [];
        if(transactionData?.length) {
            transactionData.forEach((transaction) => {
                const respObj = {
                    id: transaction.id,
                    walletId: transaction.wallet_id?.toString(),
                    amount: transaction.amount,
                    balance: transaction.balance,
                    description: transaction.description,
                    data: transaction.created_at,
                    type: TransactionTypeInvert[transaction.type],
                };
                responseData.push(respObj);
            });
        }
        return responseData;
    }
    walletJson(walletData = {}) {
        let responseData = {};
        if(walletData?.id) {
            responseData = {
                id: walletData.id,
                name: walletData.name,
                balance: walletData.balance,
                data: walletData.created_at,
            }
        }
        return responseData;
    }
}

module.exports = WalletPresenter;
