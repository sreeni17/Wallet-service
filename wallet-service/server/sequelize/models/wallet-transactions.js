module.exports = (sequelize, DataTypes) => {
    const WalletTransactions = sequelize.define('WalletTransactions', {
      description: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      balance: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      wallet_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      transaction_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    },
    {
      freezeTableName: true,
      tableName: 'WalletTransactions',
    });
    return WalletTransactions;
  };
