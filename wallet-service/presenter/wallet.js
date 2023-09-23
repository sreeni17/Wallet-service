class WalletPresenter{
    walletJson(walletData = {}, transactionData = {}) {
        const responseData = {
            id: walletData.id,
            transactionId: transactionData.transaction_id,
            name: walletData.name,
            balance: walletData.balance,
            data: walletData.created_at,
        }
        return responseData;
    }
}

module.exports = WalletPresenter;
