async function test(req, res, next) {
try {
    res.json({ data: 'test check'});
} catch(err) {
    throw err;
}
}

async function createWallet(req, res, next) {
    try {
        const {data : walletData} = req.body;
        const walletValidate = new WalletValidate('create');
        res.json({ data: 'test check'});
    } catch(err) {
        throw err;
    }   
}

module.exports = {
    test,
    createWallet,
}