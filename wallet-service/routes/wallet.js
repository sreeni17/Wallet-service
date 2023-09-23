const express = require('express');
const router = express.Router();

const {createWallet, test } = require('../controller/wallet');

router.get('/test', test);
router.post('/wallet/setup', createWallet);

module.exports = router;