/** @type {import('sequelize-cli').Migration} */
const tableName = 'Wallet';
module.exports = {
  async up (queryInterface, Sequelize) {
  await queryInterface.createTable(tableName, {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    balance: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    created_at: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updated_at: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  });
  await queryInterface.addIndex(tableName, ['name'], {
    indexName: 'wallet_unique_index',
    unique: true,
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
