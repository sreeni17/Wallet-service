const { v4: uuidv4 } = require('uuid');
const { sequelize } = require('../server/sequelize/models/index');
const { TransactionType } = require('../constants/application');
const WalletValidation = require('../validators/wallet');
const WalletModel = require('../data-model/wallet');
const WalletTransactionsDataModel = require('../data-model/wallet-transactions');
const WalletPresenter = require('../presenter/wallet');

async function test(req, res) {
  try {
    res.json({ data: 'test check' });
  } catch (err) {
    throw err;
  }
}

function computeBalance(currBalance, amount) {
  if(currBalance && amount) {
    return parseFloat(currBalance.toFixed(4)) + parseFloat(amount.toFixed(4));
  }
  return null;
}

async function createWallet(req, res) {
  try {
    const walletData = req.body;
    const walletValidate = new WalletValidation('create-wallet');
    if (walletData) {
      if (!walletValidate.validate(walletData)) {
        res.status(400);
        res.json({ errors: walletValidate.errors });
      } else {
        await sequelize.transaction( async (t1) => {
          try {
            const validValue = walletValidate?.value;
            const walletData = [{
              name: validValue.name,
              balance: parseFloat(validValue?.balance?.toFixed(4)),
              created_at: new Date(),
              updated_at: new Date(),
            }];
            const walletRespone = await WalletModel.bulkCreateUpdate(walletData, t1);
            let transactionResponse = {};
            if (walletRespone?.[0]?.id) {
              const walletTransactionData = [{
                wallet_id: walletRespone?.[0]?.id,
                transaction_id: uuidv4(),
                balance: parseFloat(validValue?.balance?.toFixed(4)),
                amount: parseFloat(validValue?.balance?.toFixed(4)),
                type: validValue.balance >= 0 ? TransactionType.CREDIT : TransactionType.DEBIT,
                description: 'inital setup',
                created_at: new Date(),
                updated_at: new Date(),
              }];
              transactionResponse = await WalletTransactionsDataModel.bulkCreateUpdate(walletTransactionData, t1);
            }
            const presenterData = new WalletPresenter().walletTransactJson(walletRespone?.[0], transactionResponse?.[0]);
            res.status(200);
            res.json({ data: presenterData });
            return;
          } catch (err) {
            throw err;            
          }
        });
      }
    }  
  } catch (err) {
    throw err;
  }
}


async function creditDebitWallet(req, res) {
  try{
    const walletData = req.body;
    const { walletId } = req.params;
    const walletValidate = new WalletValidation('transact-wallet');
    if (walletData) {
      if (!walletValidate.validate(walletData)) {
        res.status(400);
        res.json({ errors: walletValidate.errors });
      } else {
        await sequelize.transaction( async (t1) => {
          try {
            const walletData  = await WalletModel.findById(walletId, true);
            const validValue = walletValidate?.value;
            let transactionResponse = {};
            if (walletData?.id) {
              const balanceComputed = computeBalance(walletData?.balance, validValue?.amount);
              const walletTransactionData = [{
                wallet_id: walletData?.id,
                transaction_id: uuidv4(),
                balance: balanceComputed,
                amount: parseFloat(validValue?.amount?.toFixed(4)),
                type: validValue.amount >= 0 ? TransactionType.CREDIT : TransactionType.DEBIT,
                description: validValue.description,
                created_at: new Date(),
                updated_at: new Date(),
              }];
              transactionResponse = await WalletTransactionsDataModel.bulkCreateUpdate(walletTransactionData, t1);
              if(transactionResponse?.[0]?.id) {
                walletData.balance = balanceComputed;
                await WalletModel.bulkCreateUpdate([walletData], t1);
                const presenterData = new WalletPresenter().transactJson(transactionResponse?.[0]);
                res.status(200);
                res.json({ data: presenterData });
                return;
              }
            } else {
              res.status(400);
              res.json({ error: 'Invalid Wallet Id' });
            }
          } catch(err) {
            throw err;
          }
        });
      }
    } else {
      res.status(400);
      res.json({ error: 'Payload Missing' });
    }
  }catch(err) {
    throw err;
  }
}

async function listTransactions(req, res) {
  try {
    const transactData = req.query;
    const walletValidate = new WalletValidation('list-transactions');
    if (!walletValidate.validate(transactData)) {
      res.status(400);
      res.json({ errors: walletValidate.errors });
    } else {
      const validValue = walletValidate?.value;
      const walletId = validValue?.walletId;
      const walletData  = await WalletModel.findById(walletId);
      if (walletData?.id) {
        const options = {
          skip: validValue.skip,
          limit: validValue.limit,
        };
        const transactionsData = await WalletTransactionsDataModel.listTransaction(walletId, options);
        const presenterData = new WalletPresenter().listTransactions(transactionsData);
        res.status(200);
        res.json({ data: presenterData });
        return;
      } else {
        res.status(400);
        res.json({ error: 'Invalid Wallet Id' });
      }
    }
  } catch(err) {
    throw err;
  }
}

async function listWallet(req, res) {
  try{
    const { id: walletId } = req.params;
    if(walletId) {
      const walletData  = await WalletModel.findById(walletId);
      if (walletData?.id) {
        const presenterData = new WalletPresenter().walletJson(walletData);
          res.status(200);
          res.json({ data: presenterData });
          return;
      }
    }
    res.status(400);
    res.json({ error: 'Invalid Wallet Id' });
  } catch(err) {
    throw err;
  }
}
module.exports = {
  test,
  createWallet,
  creditDebitWallet,
  listTransactions,
  listWallet,
};
