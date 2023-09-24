module.exports = (sequelize, DataTypes) => {
    const wallet = sequelize.define('Wallet', {
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      balance: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      tableName: 'Wallet',
    });
    // wallet.associate  = (models) => {
    //   wallet.hasMany(models.WalletTransactions, {
    //     foreignKey: 'wallet_id',
    //     // as: 'transactions'
    //   });
    // }
    return wallet;
  };
