const { TransactionType } =require('../constants/application');
const { v4: uuidv4 } = require('uuid');
const WalletValidation = require('../validators/wallet');
const WalletModel = require('../data-model/wallet');
const WalletTransactionsDataModel = require('../data-model/wallet-transactions');
const WalletPresenter = require('../presenter/wallet');

async function test(req, res, next) {
try {
    res.json({ data: 'test check'});
} catch(err) {
    throw err;
}
}

async function createWallet(req, res) {
    try {
        const {data : walletData} = req.body;
        const walletValidate = new WalletValidation('create-wallet');
        if(walletData) {
            if(!walletValidate.validate(walletData)) {
                res.status(400);
                res.json({ errors: eventValidate.errors });
            } else {
                const validValue = walletValidate.value;
                const walletData = [{
                    name: validValue.name,
                    balance: validValue.balance,
                    created_at: new Date(),
                    updated_at: new Date(),
                }];
                const walletRespone = await WalletModel.bulkCreateUpdate(walletData)
                let transactionResponse = {}; 
                if(walletRespone?.[0]?.id) {
                    const walletTransactionData = [{
                        wallet_id: walletRespone?.[0]?.id,
                        transaction_id: uuidv4(),
                        balance: validValue.balance,
                        type: validValue.balance >=0 ? TransactionType.CREDIT : TransactionType.DEBIT,
                        description: 'inital setup',
                        created_at: new Date(),
                        updated_at: new Date(),
                    }];
                   transactionResponse =  await WalletTransactionsDataModel.bulkCreateUpdate(walletTransactionData);
                }
                const presenterData = new WalletPresenter().walletJson(walletRespone?.[0], transactionResponse?.[0]);
                res.status(200);
                res.json({ data: presenterData});
                return;
            }
        } else {
            res.status(400);
            res.json({ error: 'data Payload Missing' });
        }
    } catch(err) {
        throw err;
    }   
}

module.exports = {
    test,
    createWallet,
}