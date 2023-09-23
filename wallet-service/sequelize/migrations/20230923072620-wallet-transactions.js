'use strict';
const tableName = 'WalletTransactions';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(tableName, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      wallet_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      transaction_id: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      balance: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      balance: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      type: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_by: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    });
    await queryInterface.addIndex(tableName, ['wallet_id', 'transaction_id' ], {
      indexName: 'wallet_transactions_unique_index',
      indicesType: 'UNIQUE',
    });
  
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
