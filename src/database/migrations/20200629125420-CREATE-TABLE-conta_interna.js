module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('conta_interna', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      titular: { type: Sequelize.STRING(60), allowNull: false },
      brl_saldo: Sequelize.FLOAT,
      ativo_brl_saldo: Sequelize.FLOAT,
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('conta_interna');
  },
};
