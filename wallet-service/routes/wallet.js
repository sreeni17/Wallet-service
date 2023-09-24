const express = require('express');
const router = express.Router();

const {createWallet, test, creditDebitWallet, listTransactions, listWallet, exportTransactions } = require('../controller/wallet');

router.get('/test', test);
router.post('/wallet/setup', createWallet);
router.post('/transact/:walletId', creditDebitWallet);
router.get('/transactions', listTransactions);
router.get('/wallet/:id', listWallet)
router.get('/transactions_export/:walletId', exportTransactions);
module.exports = router;